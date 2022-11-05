import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useListGroupsQuery } from "../api";
import { OutLetContextType } from "../components/container/Container";
import Group, { IGroupData } from "../components/Group";
import { RootState } from "../redux/store";


const Groups = () => {
  const { setContentLoading, setError } = useOutletContext<OutLetContextType>();

  const [groups, setGroups] = useState<IGroupData[]>([]);
  const publicKey = useSelector(
    (state: RootState) => state.account.currentAddress
  );
  const { data: allGroupsData, isLoading: allGroupsLoading, error: allGroupsError } = useListGroupsQuery(
    {
      request: {
      }, // todo: add pagination if this grows
      publicKey: publicKey as string,
    },
    {
      pollingInterval: 10000,
      refetchOnMountOrArgChange: true,
      skip: publicKey === null,
    }
  );

  const { data: susbscribedGroupsData, isLoading: subscribedGroupsLoading, error: subscribedGroupsError } = useListGroupsQuery(
    {
      request: {
        filter: {
          subscribed: true,
        }
      }, // todo: add pagination if this grows
      publicKey: publicKey as string,
    },
    {
      pollingInterval: 10000,
      refetchOnMountOrArgChange: true,
      skip: publicKey === null,
    }
  );

  useEffect(() => {
    setContentLoading(true);

    if(allGroupsData && susbscribedGroupsData) {
      let groupList: IGroupData[] = [];
      allGroupsData.groups.forEach((group) => {
        let isSubscriber = susbscribedGroupsData.groups.findIndex((subscribedGroup) => subscribedGroup.id === group.id) !== -1;
        groupList.push(
          {
            groupId: group.id,
            name: group.name,
            description: group.description,
            image: group.image,
            owner: group.owner,
            isOwner: group.owner === publicKey,
            isSubscriber,
          }
        )
      })

      setGroups(groupList);
    } 

    setContentLoading(allGroupsLoading || subscribedGroupsLoading)
  }, [allGroupsLoading, subscribedGroupsLoading]);

  useEffect(() => {
    const showError = (error: typeof allGroupsError | typeof subscribedGroupsError) => {
      setContentLoading(false);
      setError((error as FetchBaseQueryError).status);
    }
    if (allGroupsError) {
      showError(allGroupsError)
    } else if(subscribedGroupsError) {
      showError(subscribedGroupsError)
    }
  }, [allGroupsError, subscribedGroupsError]);

  

  return (
    <div className="flow-root mt-6">
      <ul
        role="list"
        className="-my-5 divide-y divide-gray-200 dark:divide-zinc-900 dark:divider-2"
      >
        {groups.map((group) => (
          <li key={group.groupId} className="py-4">
            <Group
              groupId={group.groupId}
              name={group.name}
              description={group.description}
              image={group.image as string}
              owner={group.owner}
              isOwner={group.isOwner}
              isSubscriber={group.isSubscriber}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Groups;

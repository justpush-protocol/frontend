import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useListGroupsQuery } from "../api";
import { OutLetContextType } from "../components/container/Container";
import EmptyGroupList from "../components/EmptyGroupList";
import ManagedGroup from "../components/MangedGroup";
import { RootState } from "../redux/store";

const ManageGroups = () => {
  const { setContentLoading, setError } = useOutletContext<OutLetContextType>();
  const publicKey = useSelector(
    (state: RootState) => state.account.currentAddress
  );
  const { data, isLoading, error } = useListGroupsQuery(
    {
      request: {
        filter: {
          owned: true,
        },
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
    setContentLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      console.log(error);
      setContentLoading(false);
      setError((error as FetchBaseQueryError).status);
    }
  }, [error]);

  if (!data) return <></>;

  if (data.groups.length === 0) {
    return <EmptyGroupList />;
  }
  return (
    <div className="flow-root mt-6">
      <ul
        role="list"
        className="-my-5 divide-y divide-gray-200 dark:divide-zinc-900 dark:divider-2"
      >
        {data?.groups.map((group) => (
          <li key={group.name} className="pb-8">
            <ManagedGroup
              groupId={group.id}
              name={group.name}
              description={group.description as string}
              image={group.image as string}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageGroups;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useGetNotificationsQuery } from "../api";
import { OutLetContextType } from "../components/container/Container";
import Notification from "../components/Notification";
import { RootState } from "../redux/store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import EmptyNotificationList from "../components/EmptyNotificationList";
interface Notification {
  title: string;
  content: string;
  url: string;
  group: {
    name: string;
    logo: string;
  };
}
const Notifications = () => {
  const { setContentLoading, setError } = useOutletContext<OutLetContextType>();

  const publicKey = useSelector(
    (state: RootState) => state.account.currentAddress
  );

  const { data, isLoading, error } = useGetNotificationsQuery(
    {
      request: {},
      publicKey: publicKey as string,
    },
    {
      skip: !publicKey,
      pollingInterval: 10000,
    }
  );

  useEffect(() => {
    setContentLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (error) {
      setError((error as FetchBaseQueryError).status);
    }
  }, [error]);

  if (isLoading || !data) {
    return <></>;
  }

  if (data && data.notifications.length == 0) {
    return <EmptyNotificationList />;
  }


  return (
    <div className="flow-root mt-1">
      <ul
        role="list"
        className="-my-5 divide-y divide-gray-200 dark:divide-zinc-900 dark:divider-2"
      >
        {data.notifications.map((notification) => (
          <li key={notification.id} className="py-2">
            <Notification
              group={notification.group}
              title={notification.data.title || "Untitled"}
              content={notification.data.content}
              url={notification.data.link || "#"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

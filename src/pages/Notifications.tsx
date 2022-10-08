import Notification from "../components/Notification";
interface Notification {
  title: string;
  content: string;
  url: string;
  group: {
      name: string,
      logo: string,
  };
}
const Notifications = () => {
  const notifications: Notification[] = [{
    title: "Liquidation happening soon",
    content: "You have 2.5 TRX worth of USDT that will be liquidated in 2 days.",
    url: "https://justlend.io",
    group: {
      name: "JustLend",
      logo:"https://dashboard-assets.dappradar.com/document/5478/justlend-dapp-defi-tron-logo-166x166_d072100875b5f418f6269fdea5970ac4.png",
    },
  },
  {
    title: "USDD to TRX swap successful",
    content: "You have swapped 100 USDD for 100 TRX.",
    url: "https://sunswap.io",
    group: {
      name: "Sunswap",
      logo:"https://pbs.twimg.com/profile_images/1478607593207910405/pMErCWk4_400x400.jpg",
    },
  }
];
  return (
    <div className="flow-root mt-1">
      <ul
        role="list"
        className="-my-5 divide-y divide-gray-200 dark:divide-zinc-900 dark:divider-2"
      >
        {notifications.map((notification: Notification) => (
          <li key={notification.title} className="py-2">
            <Notification
              group={notification.group}
              title={notification.title}
              content={notification.content}
              url={notification.url}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

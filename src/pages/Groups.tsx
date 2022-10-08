import Group from "../components/Group";

const Groups = () => {
  const groups: {
    name: string;
    description: string;
    image: string;
  }[] = [
    //
    {
      name: "JustLend",
      description:
        "JustLend is a decentralized lending protocol that allows users to lend and borrow crypto assets without the need for a centralized intermediary.",
      image:
        "https://dashboard-assets.dappradar.com/document/5478/justlend-dapp-defi-tron-logo-166x166_d072100875b5f418f6269fdea5970ac4.png",
    },
    {
      name: "SunSwap",
      description:
        "Sunswap is a decentralized exchange (DEX) built on Tron that allows users to swap tokens with low fees and high liquidity.",
      image:
        "https://pbs.twimg.com/profile_images/1478607593207910405/pMErCWk4_400x400.jpg",
    },
    {
      name: "WinLink",
      description: "WinLink is a decentralized oracle protocol.",
      image:
        "https://pbs.twimg.com/profile_images/1476918784359211008/WjGXLXX1_400x400.jpg",
    },
  ];
  return (
    <div className="flow-root mt-6">
      <ul role="list" className="-my-5 divide-y divide-gray-200 dark:divide-zinc-900 dark:divider-2">
        {groups.map((group) => (
          <li key={group.name} className="py-4">
            <Group name={group.name} description={group.description} image={group.image} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Groups;

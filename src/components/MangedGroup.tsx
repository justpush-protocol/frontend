import SendNotificationForm from "./SendNotificationForm";

interface IProps {
  groupId: string;
  name: string;
  description: string;
  image: string;
}
const ManagedGroup = ({ groupId, name, description, image }: IProps) => {
  return (
    <div className="space-y-4">
    <div className="sm:flex py-2">
      <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
      <img
        className="inline-block h-14 w-14 rounded-full border border-slate-300 dark:border-slate-900 p-1"
        src={'http://' + image}
        alt={name}
      />
      </div>
      <div className="flex md:space-x-5 space-x-3 w-full">
        <div className="w-3/6 xl:w-10/12 lg:w-11/12">
          <h4 className="tracking-wide text-lg text-blue-500 dark:text-zinc-200">{name}</h4>
          <p className="mt-1">{description}</p>
        </div>
        <div className="w-3/6 xl:w-2/12 lg:w-1/12 text-sm">
          <div className="bg-zinc-200 dark:bg-zinc-700 py-2 px-2 rounded-md text-zinc-800 dark:text-zinc-200">
            100 Subscribers
          </div>
        </div>
      </div>
    </div>
    <SendNotificationForm groupId={groupId} />
    </div>
  );
};

export default ManagedGroup;

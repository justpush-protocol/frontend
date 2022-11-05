import ChevronRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";

interface IProps {
  title: string;
  content: string;
  url: string;
  group: {
    name: string;
    image: string | null;
  };
}
const Notification = ({ group, title, content, url }: IProps) => {
  console.log("group", group);
  return (
    <a href={url} className="block bg-slate-50 dark:bg-slate-700 rounded-lg hover:border dark:hover:border-slate-900">
      <div className="flex items-center px-2 py-2 lg:px-4 lg:py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center sm:space-x-2 md:space-x-0">
          <div className="flex-shrink-0">
              <p className="lg:hidden sm:block mb-3 text-sm font-medium text-blue-500 truncate">
                {group.name}
              </p>
            <img
              className="h-12 w-12 rounded-full border border-slate-300 dark:border-slate-900 p-1"
              src={group.image ? 'http://' + group.image : 'http://via.placeholder.com/60x60.png'}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 md:px-2 lg:px-4 flex flex-row space-x-10 md:space-x-0">
            <div className="xl:w-2/12 sm:w-4/12">
              <p className="hidden lg:flex text-sm font-medium text-blue-500 truncate">
                {group.name}
              </p>
              <p className="hidden lg:flex mt-2 items-center text-sm text-slate-500 dark:text-slate-300">
                3h ago
              </p>
            </div>
            <div className="xl:w-10/12 sm:w-8/12">
              <div>
                <p className="text-sm text-slate-900 dark:text-slate-200">
                    {title}
                </p>
                <p className="mt-2 flex items-center text-sm text-slate-500 dark:text-slate-300">
                    {content}
                </p>
                <p className="lg:hidden sm:block mt-2 items-center text-sm text-slate-600 dark:text-slate-400">
                    2h ago
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
};

export default Notification;

import { useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../utils";
import { navigation } from "./menu";

const NavigationItems = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="py-5 space-y-10 flex flex-col h-full">
      <div className="flex-1">
        {navigation
          .filter((item) => item.position == "top")
          .map((item) => (
            <a
              key={item.name}
              onClick={() => navigate(item.route)}
              className={classNames(
                item.route === pathname
                  ? "bg-blue-100 text-slate-900 dark:bg-slate-800 dark:text-slate-300"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
              )}
            >
              <item.icon
                className={classNames(
                  item.route === pathname
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-500",
                  "mr-4 flex-shrink-0 h-6 w-6"
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
      </div>
      <div className="py-5">
        <h3
          className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"
          id="projects-headline"
        >
          Developers
        </h3>
        <div>
          {navigation
            .filter((item) => item.position == "bottom")
            .map((item) => (
              <a
                key={item.name}
                onClick={() => navigate(item.route)}
                className={classNames(
                  item.route === pathname
                    ? "bg-blue-100 text-slate-900 dark:bg-slate-800 dark:text-slate-300"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.route === pathname
                      ? "text-blue-500 dark:text-blue-500"
                      : "text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-500",
                    "mr-4 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationItems;

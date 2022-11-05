import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import NavigationItems from "./NavigationItems";

const StaticNavigation = () => {
  const dark = useSelector((state: RootState) => state.app.dark);
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-col flex-grow pt-5 bg-gray-100 dark:bg-slate-900 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-16 w-auto"
            src={`/logo-${dark ? "dark" : "light"}.png`}
            alt=""
          />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            <NavigationItems />
          </nav>
        </div>
      </div>
    </div>
  );
};
export default StaticNavigation;

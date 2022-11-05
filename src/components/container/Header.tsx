import { Menu } from "@headlessui/react";
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleSidebar, changeTheme } from "../../redux/appSlice";
import { RootState } from "../../redux/store";
import { navigation } from "./navigation/menu";

interface Props {
  connectToWallet: () => void;
}

const Header = ({ connectToWallet }: Props) => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.app.dark);
  const currentAddress = useSelector(
    (state: RootState) => state.account.currentAddress
  );
  const { pathname } = useLocation();
  const connected = useSelector((state: RootState) => state.account.connected);
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-gray-100 dark:bg-slate-900">
      <button
        type="button"
        className="px-4 text-slate-500 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => dispatch(toggleSidebar())}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex p-5">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-300">
            {navigation.find((n) => n.route === pathname)?.name}
          </h1>
        </div>
        <div className="ml-4 flex items-center md:ml-6 space-x-5">
          <button
            onClick={() => dispatch(changeTheme())}
            type="button"
            className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-slate-400 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-100 focus:outline-none"
          >
            <span className="sr-only">Change theme</span>
            {dark ? (
              <SunIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MoonIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              {connected == 200 ? (
                <Menu.Button className="bg-slate-800 dark:bg-slate-800 text-slate-100 flex items-center text-xs rounded-full border border-slate-900 px-3 py-2">
                  <span className="sr-only">Wallet context</span>
                  <div className="hidden md:block">
                    {currentAddress
                      ? currentAddress.slice(0, 6) +
                        "..." +
                        currentAddress.slice(-4)
                      : "..."}
                  </div>
                  <WalletIcon className="md:hidden h-6 w-6" />
                </Menu.Button>
              ) : (
                <Menu.Button
                  onClick={() => connectToWallet()}
                  className="bg-slate-800 dark:bg-slate-800 text-slate-100 flex items-center text-xs rounded-full border border-slate-900 px-3 py-2"
                >
                  <div className="hidden md:block">
                    {connected === -1 ? "Unlock TronLink Wallet" : "Connect Wallet"}
                  </div>
                  <WalletIcon className="md:hidden h-6 w-6" />
                </Menu.Button>
              )}
            </div>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Header;

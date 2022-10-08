import {
  BellIcon,
  RectangleGroupIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../redux/appSlice";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Container = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const dark = useSelector((state: RootState) => state.app.dark);
  const dispatch = useDispatch();
  const navigation: {
    name: string;
    route: string;
    icon: any;
    position: "top" | "bottom";
  }[] = [
    {
      name: "Notifications",
      route: "/notifications",
      icon: BellIcon,
      position: "top",
    },
    {
      name: "Groups",
      route: "/groups",
      icon: RectangleGroupIcon,
      position: "top",
    },
    {
      name: "Create Group",
      route: "/create-group",
      icon: PlusCircleIcon,
      position: "bottom",
    },
  ];

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  const navigate = useNavigate();

  // navigate to groups by default
  if (pathname === "/") {
    return <Navigate to="/groups" />;
  }

  const NavigationItems = () => {
    return (
      <div className="py-5 space-y-10">
        <div>
          {navigation
            .filter((item) => item.position == "top")
            .map((item) => (
              <a
                key={item.name}
                onClick={() => navigate(item.route)}
                className={classNames(
                  item.route === pathname
                    ? "bg-blue-100 text-slate-900 dark:bg-slate-800 dark:text-slate-300"
                    : "text-slate-600 dark:text-slate-300 hover:bg-zinc-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
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
        <div className="space-y-1">
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
                      : "text-slate-600 dark:text-slate-300 hover:bg-zinc-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
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

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-gray-100 dark:bg-slate-900 flex flex-col h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className={classNames(
              "fixed inset-0 flex z-40 md:hidden",
              dark ? "dark" : ""
            )}
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-zinc-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-100 dark:bg-slate-900">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-16 w-auto"
                    src={`/logo-${dark? 'dark' : 'light'}.png`}
                    alt="JustPush"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    <NavigationItems />
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-5 bg-gray-100 dark:bg-slate-900 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-16 w-auto"
                src={`/logo-${dark? 'dark' : 'light'}.png`}
                alt="JustPush"
              />
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <NavigationItems />
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-gray-100 dark:bg-slate-900">
            <button
              type="button"
              className="px-4 text-slate-500 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
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
                  className="bg-zinc-100 dark:bg-slate-800 p-1 rounded-full text-slate-400 dark:text-slate-300 hover:text-slate-500 dark:hover:text-slate-100 focus:outline-none"
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
                    <Menu.Button className="bg-zinc-800 dark:bg-zinc-200 text-slate-100 dark:text-slate-800 flex items-center text-xs rounded-full border dark:border-zinc-200 border-zinc-900 px-3 py-2">
                      <span className="sr-only">Open user menu</span>
                      <div className="hidden md:block">0xa1b2...c3d4e5</div>
                      <WalletIcon className="md:hidden h-6 w-6"/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-zinc-100" : "",
                                "block px-4 py-2 text-sm text-slate-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="rounded-lg md:rounded-[16px] bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 flex-1 mb-3 mx-3 md:mt-5 my-5 md:my-10 md:mx-10">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <Outlet />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Container;

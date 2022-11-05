import { BellIcon, RectangleGroupIcon, Cog8ToothIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export const navigation: {
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
      name: "Manage Groups",
      route: "/manage-groups",
      icon: Cog8ToothIcon,
      position: "bottom",
    },
    {
      name: "Create Group",
      route: "/create-group",
      icon: PlusCircleIcon,
      position: "bottom",
    },
  ];
import { IconType } from "react-icons";

export type DashboardSidebarItem = {
  title: string;
  href: string;
  icon: IconType;
};

export type TDashboardbarItem = {
  name: string;
  email: string;
  image?: string;
  role: string;
};
export type TUser = "vendor" | "customer" | "admin";

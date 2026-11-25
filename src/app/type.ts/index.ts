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
export interface MenuItem {
  _id: string;
  itemName: string;
  category: string;
  description: string;
  price: string;
  location: string;
  image: string;
  vendorId?: string;
  vendorName?: string;
  vendorEmail?: string;
  vendorTime?: Date;
  vendorImage?: string | null;
  status: "Pending" | "Approved" | "Rejected";
}

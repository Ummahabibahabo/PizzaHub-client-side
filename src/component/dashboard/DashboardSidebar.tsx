"use client";

import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  FaChartPie,
  FaUtensils,
  FaPlusCircle,
  FaShoppingBag,
  FaCreditCard,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaReceipt,
  FaPizzaSlice,
  FaStar,
} from "react-icons/fa";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { TDashboardbarItem, TUser } from "@/app/type.ts";

const roleSidebarItems = {
  vendor: [
    {
      title: "Overview",
      href: "/dashboard/vendor",
      icon: FaChartPie,
    },
    {
      title: "My Menu Items",
      href: "/dashboard/vendor/my-menu-items",
      icon: FaUtensils,
    },
    {
      title: "Add Menu Item",
      href: "/dashboard/vendor/add-menu-item",
      icon: FaPlusCircle,
    },
    {
      title: "Customer Orders",
      href: "/dashboard/vendor/customer-orders",
      icon: FaShoppingBag,
    },
    {
      title: "Subscription",
      href: "/dashboard/vendor/subscription",
      icon: FaCreditCard,
    },
    {
      title: "Profile",
      href: "/dashboard/vendor/profile",
      icon: FaUser,
    },
  ],

  customer: [
    {
      title: "Overview",
      href: "/dashboard/customer",
      icon: FaChartPie,
    },
    {
      title: "My Orders",
      href: "/dashboard/customer/my-orders",
      icon: FaClipboardList,
    },
    {
      title: "Profile",
      href: "/dashboard/customer/profile",
      icon: FaUser,
    },
  ],

  admin: [
    {
      title: "Overview",
      href: "/dashboard/admin",
      icon: FaChartPie,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: FaUsers,
    },
    {
      title: "Manage Menu Items",
      href: "/dashboard/admin/manage-menu-items",
      icon: FaUtensils,
    },
    {
      title: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: FaReceipt,
    },
    {
      title: "Profile",
      href: "/dashboard/admin/profile",
      icon: FaUser,
    },
  ],
};

const DashboardSidebarPage = ({ user }: { user: TDashboardbarItem }) => {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const currentUser = session?.user || user;

  const role = currentUser.role;

  const sidebarItems = roleSidebarItems[role as TUser] || [];

  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/");
  };

  return (
    <Sidebar className="border-r border-[#E8E2D8] bg-white">
      {/* Sidebar Header */}
      <SidebarHeader className="px-5 pt-6 pb-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-6">
          <div className="bg-[#A53A37] text-white p-3 rounded-xl">
            <FaPizzaSlice size={22} />
          </div>

          <div>
            <h2 className="text-xl font-extrabold leading-none text-[#302923]">
              pizza
            </h2>

            <h2 className="text-xl font-extrabold leading-none text-[#A53A37]">
              hub
            </h2>

            <p className="text-[8px] tracking-[2px] text-[#82766C] mt-1">
              LOCAL PIZZA. BIG LOVE.
            </p>
          </div>
        </Link>

        {/* User Information */}
        <div className="flex items-center gap-3 border-b border-[#E8E2D8] pb-5">
          <Avatar className="h-11 w-11 border-2 border-[#F1E5DC]">
            <AvatarImage src={currentUser.image || ""} />

            <AvatarFallback className="bg-[#F1E5DC] text-[#A53A37] font-bold">
              {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-[#302923] truncate">
              {currentUser.name}
            </h3>

            <p className="text-xs text-[#82766C] truncate capitalize">
              {role} account
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold tracking-[2px] text-[#A49A91] px-3 mb-2">
            WORKSPACE
          </SidebarGroupLabel>

          <SidebarMenu className="flex flex-col gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={isActive}
                    className={`h-11 w-full rounded-xl px-3 transition-all duration-300 ${
                      isActive
                        ? " !text-[#A53A37] font-bold"
                        : "text-[#554D46] hover:bg-[#F3DDD2] hover:text-black"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 w-full"
                    >
                      <Icon size={17} />

                      <span className="text-sm truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="px-3 pt-0 pb-3 gap-2">
        {/* Neighborhood Card */}
        <div className="bg-[#F8EDE8] rounded-xl p-4 mb-1">
          <FaStar className="text-[#A53A37] mb-3" size={17} />

          <h4 className="text-xs font-bold text-[#302923]">
            Made for the neighborhood.
          </h4>

          <p className="text-[11px] text-[#82766C] mt-1">
            Thanks for being part of PizzaHub.
          </p>
        </div>

        <SidebarMenu>
          {/* Sign Out */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="h-10 rounded-xl text-[#C83D3D] hover:bg-red-50 hover:text-[#C83D3D]"
            >
              <FaUser size={16} />
              <span className="text-sm font-medium">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebarPage;

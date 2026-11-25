import { myMenu } from "@/lib/actions/myMenus";
import Link from "next/link";
import { Plus, Trash2, Pencil, Eye, MapPin } from "lucide-react";
import { MenuItem } from "@/app/type.ts";
import EmptyMyMenuPage from "./emptyMenu";
import MyMenuCardPage from "./MyMenuCard";

const MyMenuItemsPage = async () => {
  const data: MenuItem[] = await myMenu();

  return (
    <div className=" w-full bg-[#faf9f7] p-3 md:p-5 lg:p-6">
      <div className="w-full rounded-2xl border border-[#eae7e3] bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-[#eeeae6] px-5 py-6 sm:flex-row sm:items-center md:px-8">
          <div>
            <h1 className="text-2xl font-bold text-[#292524] md:text-3xl">
              Your Menu
            </h1>
            <p className="mt-2 text-sm text-[#99918b]">
              Manage your menu items, update details and track approval status.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/add-menu-item"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#c83e42] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ae3035]"
          >
            <Plus size={19} />
            Add item
          </Link>
        </div>

        {/* Menu List */}
        <div className="px-5 md:px-8">
          {data.length === 0 ? (
            <EmptyMyMenuPage />
          ) : (
            data.map((item) => <MyMenuCardPage item={item}></MyMenuCardPage>)
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-5 md:px-8">
          <p className="text-sm text-[#99918b]">
            Showing {data.length} menu items
          </p>

          <p className="text-xs font-medium text-[#43865a]">PizzaHub Vendor</p>
        </div>
      </div>
    </div>
  );
};

export default MyMenuItemsPage;

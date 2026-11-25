import { MenuItem } from "@/app/type.ts";
import { Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const MyMenuCardPage = ({ item }: { item: MenuItem }) => {
  return (
    <div>
      <div
        key={item._id}
        className="flex flex-col justify-between gap-5 border-b border-[#eeeae6] py-6 transition hover:bg-[#fdfcfb] sm:flex-row sm:items-center md:gap-8 md:py-7"
      >
        {/* Image and Details */}
        <div className="flex min-w-0 flex-1 items-center gap-5">
          {/* Food Image */}
          <div className="flex h-24 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#eeeae6] bg-[#faf7f2] p-1 md:h-28 md:w-36">
            <img
              src={item.image}
              alt={item.itemName}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Item Details */}
          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#292524] md:text-lg lg:text-xl">
              {item.itemName}
            </h2>

            <p className="mt-1 text-sm font-bold text-[#c83e42]">
              ৳{item.price}
            </p>

            <p className="mt-2 text-xs text-[#99918b] md:text-sm">
              {item.category}
            </p>

            <p className="mt-2 flex items-center gap-1.5 text-xs text-[#99918b] md:text-sm">
              <MapPin size={15} />
              {item.location}
            </p>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {/* Status */}
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              item.status === "Approved"
                ? "bg-[#e9f5ed] text-[#43865a]"
                : item.status === "Rejected"
                  ? "bg-[#fceaea] text-[#c83e42]"
                  : "bg-[#fff5df] text-[#b58a36]"
            }`}
          >
            {item.status}
          </span>

          {/* View */}
          <Link
            href={`/my-menu-items/${item._id}`}
            className="flex items-center gap-2 rounded-lg border border-[#e8e5e1] px-3 py-2.5 text-xs font-semibold text-[#77716b] transition hover:border-[#c83e42] hover:bg-[#fff5f4] hover:text-[#c83e42] md:px-4 md:text-sm"
          >
            <Eye size={16} />
            View
          </Link>

          {/* Edit */}
          <Link
            href={`/my-menu-items/edit/${item._id}`}
            className="flex items-center gap-2 rounded-lg border border-[#e8e5e1] px-3 py-2.5 text-xs font-semibold text-[#77716b] transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 md:px-4 md:text-sm"
          >
            <Pencil size={16} />
            Edit
          </Link>

          {/* Delete */}
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#e8e5e1] px-3 py-2.5 text-xs font-semibold text-[#77716b] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 md:px-4 md:text-sm"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyMenuCardPage;

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavUserPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOutBtn = async () => {
    await authClient.signOut();
  };

  return (
    <div className="flex justify-center items-center gap-3">
      {user ? (
        <Popover>
          <PopoverTrigger>
            <Avatar className="cursor-pointer border-2 border-[#E8E2D8] hover:border-[#A53A37] transition duration-300">
              <AvatarImage src={user?.image as string} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent className="w-64 p-3 rounded-2xl shadow-xl border border-[#E8E2D8] bg-white text-center">
            {/* User Information */}
            <PopoverHeader className="text-center pb-3">
              <PopoverTitle className="text-[#302923] text-base font-bold">
                {user?.name}
              </PopoverTitle>

              <PopoverDescription className="text-[#82766C] text-xs">
                {user?.email}
              </PopoverDescription>
            </PopoverHeader>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard"
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#554D46] hover:bg-[#F1E5DC] hover:text-[#A53A37] transition-all duration-300"
              >
                Dashboard
              </Link>

              <Link
                href="/profile"
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#554D46] hover:bg-[#F1E5DC] hover:text-[#A53A37] transition-all duration-300"
              >
                Profile
              </Link>

              {/* Sign Out */}
              <button
                onClick={handleSignOutBtn}
                className=" text-center w-full  px-4 py-2.5 rounded-xl text-sm font-semibold text-[#C83D3D] bg-red-50 hover:bg-red-100 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href="/signUp"
          className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#A53A37] text-white text-xs sm:text-sm font-semibold hover:bg-[#872D2B] transition-all duration-300 shadow-lg "
        >
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default NavUserPage;

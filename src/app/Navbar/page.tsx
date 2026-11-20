"use client";

import { Pizza, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import NavUserPage from "./NavUserPage";
import { FaPizzaSlice } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const NavbarPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Mobile Menu
  const handleMenuBtn = () => {
    setMenuOpen(!menuOpen);
  };

  // Theme Toggle
  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);
  return (
    <header className="w-full  dark:bg-[#171412] border-b border-[#E8E2D8] dark:border-[#38302B] transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden shrink-0 text-[#554D46] dark:text-white"
          onClick={handleMenuBtn}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <IoClose className="text-2xl" />
          ) : (
            <IoMenuSharp className="text-2xl" />
          )}
        </button>

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 shrink-0"
          onClick={() => setMenuOpen(false)}
        >
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

            <p className="text-[10px] tracking-[2px] text-[#82766C] mt-1">
              LOCAL PIZZA. BIG LOVE.
            </p>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:text-[#A53A37] transition"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:text-[#A53A37] transition"
          >
            Browse Menu
          </Link>

          {user && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:text-[#A53A37] transition"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="text-[#554D46] dark:text-yellow-400 transition"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Sign Up */}
          <NavUserPage></NavUserPage>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="absolute top-full left-4 right-4 z-50 mt-2 bg-white dark:bg-[#25201D] border border-[#E8E2D8] dark:border-[#38302B] shadow-lg p-5 rounded-xl flex flex-col items-start gap-5 md:hidden">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-full text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:bg-[#A53A37] rounded-xl px-3 py-2 transition"
            >
              Home
            </Link>

            <Link
              href="/menu"
              onClick={() => setMenuOpen(false)}
              className="w-full text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:bg-[#A53A37] rounded-xl px-3 py-2 transition"
            >
              Browse Menu
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="w-full text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:bg-[#A53A37] rounded-xl px-3 py-2 transition"
            >
              Dashboard
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavbarPage;

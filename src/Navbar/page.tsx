"use client";

import { Pizza, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";

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
          <Pizza size={32} strokeWidth={2.2} className="text-[#A53A37]" />

          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-bold text-[#A53A37] leading-none">
              Pizza Hub
            </span>

            <span className="text-[8px] sm:text-[11px] tracking-[1px] sm:tracking-[2px] text-[#82766C] dark:text-[#B9ACA0] mt-1">
              LOCAL PIZZA. BIG LOVE.
            </span>
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

          <Link
            href="/dashboard"
            className="text-sm font-medium text-[#554D46] dark:text-[#E8DED5] hover:text-[#A53A37] transition"
          >
            Dashboard
          </Link>
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
          <Link
            href="/signUp"
            className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#A53A37] text-white text-xs sm:text-sm font-semibold hover:bg-[#872D2B] transition-all duration-300 shadow-sm whitespace-nowrap"
          >
            Sign Up
          </Link>
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

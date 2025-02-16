"use client";
import useDarkMode from "@/hooks/useDarkMode";
import useNavbarVisibility from "@/hooks/useNavbarVisibility";
import Link from "next/link";
import MobileNavbar from "./mobile-navbar";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { currentTheme, toggleTheme, mounted } = useDarkMode();
  const { isVisible, isScrolled } = useNavbarVisibility(); // Use the hook

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <nav
      className={`sticky top-0  z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "bg-white dark:bg-gray-900 shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          MeetHammed
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-600 dark:text-gray-300">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>

       
        </ul>

        {/* Search and Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          {/* Search */}
        

          {/* Dark Mode Toggler */}
          {/* <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"
          >
            <div
              className={`w-4 h-4 rounded-full transition-transform ${
                currentTheme === "dark"
                  ? "transform translate-x-4 bg-blue-500"
                  : "bg-gray-400"
              }`}
            ></div>
          </button> */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"
          >
            {currentTheme === "dark" ? (
              <Moon className="w-4 h-4 text-gray-400" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-500" />
            )}
          </button>
        </div>

        {/* Mobile Navbar */}
        <MobileNavbar toggleTheme={toggleTheme} currentTheme={currentTheme} />
      </div>
    </nav>
  );
};

export default Navbar;

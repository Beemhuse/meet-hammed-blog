"use client";
import useDarkMode from "@/hooks/useDarkMode";
import useNavbarVisibility from "@/hooks/useNavbarVisibility";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { currentTheme, toggleTheme, mounted } = useDarkMode();
  const { isVisible, isScrolled } = useNavbarVisibility();
  const pathname = usePathname(); // Get current route

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <nav
      className={`sticky top-0 z-50 transition-transform duration-300 ${
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
          {[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: "About", path: "/about" },
          ].map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`${
                  pathname === link.path
                    ? "text-blue-500 font-semibold dark:text-blue-400"
                    : "hover:text-gray-800 dark:hover:text-gray-100"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
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

"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileNavbar = ({ toggleTheme, currentTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //   const { currentTheme, toggleTheme, mounted } = useDarkMo();

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      {/* Hamburger Menu (Visible on Mobile) */}
      <div className="md:hidden relative z-50 ">
        <button
          onClick={toggleMenu}
          className="text-gray-600 dark:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-[35vh] bg-white dark:bg-gray-900 z-40 flex flex-col items-center justify-center space-y-6 text-gray-800 dark:text-gray-300">
          <Link href="/" onClick={toggleMenu} className="text-2xl font-bold">
            Home
          </Link>
          <Link
            href="/blog"
            onClick={toggleMenu}
            className="text-2xl font-bold"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={toggleMenu}
            className="text-2xl font-bold"
          >
            Contact
          </Link>

          {/* Dark Mode Toggler */}
          <button
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
          </button>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;

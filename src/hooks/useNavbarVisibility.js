'use client'
import { useState, useEffect } from "react";

const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide navbar
      } else {
        setIsVisible(true); // Show navbar
      }

      lastScrollY = currentScrollY;
      setIsScrolled(currentScrollY > 0); // Track if page is scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isVisible, isScrolled };
};

export default useNavbarVisibility;

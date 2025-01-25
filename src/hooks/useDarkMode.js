'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useDarkMode = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  return { currentTheme, toggleTheme, mounted };
};

export default useDarkMode;

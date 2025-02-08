"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import useDarkMode from "@/hooks/useDarkMode";

const tabs = [
  "Overview",
  "Integrations",
  "Activity",
  "Domains",
  "Usage",
  "Monitoring",
];

export default function Frame() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const [currentTheme, toggleTheme] = useDarkMode(); // Use the custom hook here

  const tabRefs = useRef([]);

  // Update styles when hovering over tabs
  const updateHoverStyle = useCallback((index) => {
    if (index !== null && tabRefs.current[index]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[index];
      setHoverStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` });
    }
  }, []);

  useEffect(() => {
    updateHoverStyle(hoveredIndex);
  }, [hoveredIndex, updateHoverStyle]);

  // Update styles when active tab changes
  useEffect(() => {
    if (tabRefs.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = tabRefs.current[activeIndex];
      setActiveStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` });
    }
  }, [activeIndex]);

  // Initialize active tab position
  useEffect(() => {
    requestAnimationFrame(() => {
      if (tabRefs.current[0]) {
        const { offsetLeft, offsetWidth } = tabRefs.current[0];
        setActiveStyle({ left: `${offsetLeft}px`, width: `${offsetWidth}px` });
      }
    });
  }, []);

  return (
    <div
      className={`flex justify-center items-center w-full min-h-screen `}
    >
      <div className="w-full max-w-[1200px] h-[100px] border-none shadow-none relative flex items-center justify-center">
        {/* Dark Mode Toggle */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={toggleTheme}
        >
          {currentTheme ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button> */}

        <div className="relative">
          {/* Hover Effect */}
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
            style={{ ...hoverStyle, opacity: hoveredIndex !== null ? 1 : 0 }}
          />

          {/* Active Tab Indicator */}
          <div
            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1190] dark:bg-[#ffffff3a] rounded-[6px] flex items-center"
            style={{ ...activeStyle }}
          />

          {/* Tabs */}
          <div className="flex space-x-4 relative">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`px-4 py-2 cursor-pointer relative z-10 ${activeIndex === index ? "font-bold" : "font-normal"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export function Separator({ orientation, className }) {
  return (
    <div
      className={`bg-gray-300 ${orientation === "vertical" ? "w-px h-full" : "h-px w-full"} ${className}`}
    />
  );
}

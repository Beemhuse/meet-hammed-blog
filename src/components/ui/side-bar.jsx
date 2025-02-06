"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const Sidebar = ({ children, className }) => {
  return (
    <aside
      className={cn("flex flex-col w-72  bg-[#0C0649]  border-r", className)}
    >
      {children}
    </aside>
  );
};

export const SidebarHeader = ({ children, className }) => {
  return <div className={cn("p-4", className)}>{children}</div>;
};

export const SidebarContent = ({ children, className }) => {
  return (
    <div className={cn("flex-1 p-4 overflow-y-auto", className)}>
      {children}
    </div>
  );
};

export const SidebarFooter = ({ children, className }) => {
  return <div className={cn("p-4", className)}>{children}</div>;
};

export const SidebarMenu = ({ children, className }) => {
  return <ul className={cn("space-y-4 ", className)}>{children}</ul>;
};

export const SidebarMenuItem = ({ children }) => {
  return <li className="flex items-center">{children}</li>;
};

export const SidebarMenuButton = ({
  children,
  className,
  isActive,
  asChild = false,
}) => {
  const Component = asChild ? React.Fragment : "button";

  return asChild ? (
    <Component>
      {React.cloneElement(children, {
        className: cn(
          "flex items-center space-x-2 p-2 rounded-md transition-colors",
          isActive
            ? "bg-[#E08D40] text-white"
            : "hover:bg-[#E08D40] hover:text-white",
          className,
          children.props.className // Preserve child's existing className
        ),
      })}
    </Component>
  ) : (
    <Component
      className={cn(
        "flex items-center space-x-2 p-2 rounded-md transition-colors",
        isActive
          ? "bg-yellow-500/10 text-yellow-500"
          : "hover:bg-yellow-500/10 hover:text-yellow-500",
        className
      )}
    >
      {children}
    </Component>
  );
};

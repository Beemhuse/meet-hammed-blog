import * as React from "react";

export function Sidebar({ children, className, ...props }) {
  return (
    <aside className={` bg-gray-900 text-white h-screen ${className}`} >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children }) {
  return <div className="p-4 border-b border-gray-700">{children}</div>;
}

export function SidebarContent({ children }) {
  return <div className="p-2 overflow-y-auto">{children}</div>;
}

export function SidebarGroup({ children }) {
  return <div className="mt-4">{children}</div>;
}

export function SidebarGroupLabel({ children }) {
  return <div className="px-4 py-2 text-sm font-semibold uppercase text-gray-400">
    {children}
  </div>;
}

export function SidebarGroupContent({ children }) {
  return <div className="pl-2">{children}</div>;
}

export function SidebarMenu({ children }) {
  return <nav>{children}</nav>;
}

export function SidebarMenuItem({ children, href, isActive }) {
  return (
    <a
      href={href}
      className={`block px-4 py-2 rounded-lg ${
        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {children}
    </a>
  );
}
export function SidebarGroupButton({ onClick, isOpen }) {
    return (
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-800"
      >
        <span>Toggle Group</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>
    );
  }

  export function SidebarMenuButton({ asChild, isActive, children }) {
    return asChild ? (
      children
    ) : (
      <button
        className={`block w-full px-4 py-2 text-left rounded-lg transition ${
          isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
        }`}
      >
        {children}
      </button>
    );
  }
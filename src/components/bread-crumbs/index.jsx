import React from "react";

export function Breadcrumb({ children }) {
  return <nav className="flex items-center space-x-2 text-sm text-gray-600">{children}</nav>;
}

export function BreadcrumbList({ children }) {
  return <ol className="flex items-center space-x-1">{children}</ol>;
}

export function BreadcrumbItem({ children, className }) {
  return <li className={`flex items-center ${className}`}>{children}</li>;
}

export function BreadcrumbLink({ href, children }) {
  return (
    <a href={href} className="text-blue-500 hover:underline">
      {children}
    </a>
  );
}

export function BreadcrumbPage({ children }) {
  return <span className="font-medium text-gray-900">{children}</span>;
}

export function BreadcrumbSeparator({ className }) {
  return <span className={`mx-2 text-gray-400 ${className}`}>/</span>;
}

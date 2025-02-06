"use client";
import React from "react";

export const SidebarInset = ({ children, className }) => {
  return <div className={`flex  transition-all ${className}`}>{children}</div>;
};

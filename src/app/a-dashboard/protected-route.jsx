"use client"; // Ensures it's a client component

import { redirect } from "next/navigation"; // Correct import for redirection
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("mb-token");

    if (!token) {
      redirect("/"); 
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Prevents flickering during redirect
  }

  return <>{children}</>;
}

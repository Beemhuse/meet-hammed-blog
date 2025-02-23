"use client";

import { useRouter } from "next/navigation"; // Use useRouter instead of redirect
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true); // State to prevent flicker

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("mb-token");

    if (!token) {
      router.replace("/"); // Redirect user if not authenticated
    } else {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false); // Stop checking after authentication check
  }, [router]);

  if (checkingAuth) {
    return null; // Prevents flickering before authentication check completes
  }

  if (!isAuthenticated) {
    return null; // Ensure no rendering if unauthenticated
  }

  return <>{children}</>;
}

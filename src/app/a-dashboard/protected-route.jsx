import { RedirectType } from "next/navigation";
import React from "react";
import { Cookies } from "react-cookie";

export default function ProtectedRoute({ children }) {
  const cookies = new Cookies();
  const token = cookies.get("mb-token");

  if (!token) {
    return <RedirectType to="/" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

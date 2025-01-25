import { ThemeProvider } from "next-themes";
import React from "react";

export default function Container({ children }) {
  return (
    <div className="container mx-auto ">
      <ThemeProvider attribute="class" defaultTheme="system">
        
        {children}
      </ThemeProvider>
    </div>
  );
}

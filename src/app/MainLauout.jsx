"use client"; // Required for client-side rendering

import { SWRProvider } from "@/utils/swr-config";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }) {
  return (
    <SWRProvider>
      <Toaster />
      {children}
    </SWRProvider>
  );
}

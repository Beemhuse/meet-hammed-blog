"use client";
import { useEffect } from "react";
import { MainNav } from "@/layout/admin/SideBar";
import { Header } from "@/layout/admin/TopNav";
import { SidebarProvider } from "@/context/sidebar-context";
import { SidebarInset } from "@/layout/admin/sidebar-inset";
import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const cookies = new Cookies();
  const { push } = useRouter();
  const token = cookies.get("mb-token");
  useEffect(() => {
    if (!token) {
      push("/");
    }
  }, [token]);
  return (
    <SidebarProvider>
      <div className="flex bg-[#F3F2F7] w-full max-w-[120em] m-auto min-h-screen">
        <MainNav />
        {/* Main Content Area */}
        <SidebarInset className="flex-1   flex flex-col">
          {/* Header */}
          <Header />
          <main className="flex-1 px-20 space-y-4 p-4 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

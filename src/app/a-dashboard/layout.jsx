// import { Header } from "@/layout/admin/TopNav";

import { MainNav } from "@/layout/admin/SideBar";
import { SidebarProvider } from "../context/sidebar-context";
import { SidebarInset } from "@/layout/admin/sidebar-inset";
import { Header } from "@/layout/admin/TopNav";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex bg-[#F3F2F7] w-full max-w-[120em] m-auto min-h-screen">
        <MainNav />
        {/* Main Content Area */}
        <SidebarInset className="flex-1   flex flex-col">
          {/* Header */}
          <Header />
          {/* Main Content */}
          <main className="flex-1 px-20 space-y-4 p-4 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

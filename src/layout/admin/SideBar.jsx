"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {  FiLogOut } from "react-icons/fi";
import { HiSquare3Stack3D } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/side-bar";
import Image from "next/image";
import { Cookies } from "react-cookie";
import { CiHome } from "react-icons/ci";

const menuItems = [
 
  {
    title: "Dashboard",
    icon:CiHome ,
    href: "/a-dashboard/",
  },
  {
    title: "View posts",
    icon: HiSquare3Stack3D,
    href: "/a-dashboard/view-posts",
  },

 
];

export function MainNav() {
  const pathname = usePathname();
const cookies = new Cookies()
  const logout =()=>{
    cookies.remove("mb-token")
    cookies.remove("mb-id")
    window.location.reload()
  }

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            width={500}
            height={500}
            src="/techverve.svg"
            alt="Logo"
            className="h-10 w-auto m-auto object-cover"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className={"mt-4"}>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={cn(
                  "w-full ",
                  pathname === item.href
                    ? "bg-[#E08D40]  text-white"
                    : "hover:bg-[#E08D40]   hover:text-white"
                )}
              >
                <Link
                  href={item.href}
                  className="flex gap-4 ml-4 text-white  items-center"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
        
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-orange-600/10 hover:text-orange-600 text-white"
            >
              <button onClick={logout}>
                <FiLogOut className="mr-2 h-5 w-5" />
                Sign-out
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

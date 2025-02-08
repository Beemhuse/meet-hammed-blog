"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUpload, FiSettings, FiPlusCircle, FiLogOut } from "react-icons/fi";
import { GrSteps } from "react-icons/gr";
import { HiSquare3Stack3D } from "react-icons/hi2";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiCreditCard2 } from "react-icons/ci";

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

const menuItems = [
  {
    title: "Dashboard",
    icon: GrSteps,
    href: "/a-dashboard",
  },
  {
    title: "Upload Blog",
    icon: FiUpload,
    href: "/a-dashboard/upload-blog",
  },
  {
    title: "My Blogs",
    icon: HiSquare3Stack3D,
    href: "/a-dashboard/my-blogs",
  },
  // {
  //   title: "Earning",
  //   icon: CiCreditCard2,
  //   href: "/admin/earning",
  // },
  // {
  //   title: "Message",
  //   icon: IoChatbubbleEllipsesOutline,
  //   href: "/admin/messages",
  //   badge: "1",
  // },
  {
    title: "Settings",
    icon: FiSettings,
    href: "/admin/settings",
  },
];

export function MainNav() {
  const pathname = usePathname();

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
              <Link href="/admin/new-course">
                <FiPlusCircle className="mr-2 h-5 w-5" />
                Create New Course
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-orange-600/10 hover:text-orange-600 text-white"
            >
              <button>
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

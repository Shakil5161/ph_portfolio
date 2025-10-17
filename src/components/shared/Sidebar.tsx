"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Home, Inbox, LogOut, PlusCircle, Search, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items
const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "All Blog", url: "/dashboard/all-blog", icon: Inbox },
  { title: "Create Blog", url: "/dashboard/create-blog", icon: PlusCircle },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const session = useSession();

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full justify-between">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>My Portfolio</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* ✅ Logout Section (at bottom) */}
        {session?.status === "authenticated" && (
          <div className="p-4 border-t border-gray-300">
            <Button
              variant="destructive"
              className="w-full justify-start gap-2 cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

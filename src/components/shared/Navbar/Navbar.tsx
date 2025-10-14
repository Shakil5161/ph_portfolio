"use client";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!isMounted) {
    return (
      <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
        <div className="flex h-full items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex-shrink-0">
            Shakil🧑‍💻
          </Link>
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-20 rounded-full" />
            <div className="md:hidden">
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30 backdrop-blur-sm bg-background/80">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
       
        <Link href="/" className="flex-shrink-0 font-bold text-lg">
          Shakil🧑‍💻
        </Link>

        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-4 md:gap-6">
          {status === "loading" ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-9 rounded-full md:hidden" />
            </div>
          ) : session ? (
            // Authenticated - Show logout and dashboard
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="rounded-full px-5 py-2 text-sm md:text-base"
                asChild
              >
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
              <Button 
                className="rounded-full px-5 py-2 text-sm md:text-base"
                onClick={handleSignOut}
                variant="outline"
              >
                Logout
              </Button>
              <div className="md:hidden">
                <NavigationSheet />
              </div>
            </div>
          ) : (
            // Not authenticated - Show login
            <div className="flex items-center gap-4">
              <Button className="rounded-full px-5 py-2 text-sm md:text-base">
                <Link href="/login" className="flex items-center gap-2">
                  Login
                </Link>
              </Button>
              <div className="md:hidden">
                <NavigationSheet />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
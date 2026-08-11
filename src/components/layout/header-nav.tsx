"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { LayoutList, Plus, Users } from "lucide-react";
import { signOut } from "next-auth/react";

interface HeaderNavProps {
  session: Session | null;
}

export const HeaderNav = ({ session }: HeaderNavProps) => {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session?.user) {
    return (
      <div className="flex justify-end">
        <Button variant="secondary">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
      <div className="hidden sm:block" />
      <div className="flex justify-center">
        <Tabs value={tabValue}>
          <TabsList className="flex flex-col md:flex-row">
            <TabsTrigger value="dashboard" className="w-full md:w-auto" asChild>
              <Link href="/dashboard">
                <Plus className="size-4" />
                Create build
              </Link>
            </TabsTrigger>
            <TabsTrigger value="builds" className="w-full md:w-auto" asChild>
              <Link href="/builds">
                <LayoutList className="size-4" />
                My builds
              </Link>
            </TabsTrigger>
            <TabsTrigger value="explore" className="w-full md:w-auto" asChild>
              <Link href="/builds/explore">
                <Users className="size-4" />
                Public builds
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-center sm:justify-end">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => signOut({ redirectTo: "/" })}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

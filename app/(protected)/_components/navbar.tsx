"use client";

import { UserButton } from "@/components/auth/UserButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="w-[600px]  p-3 bg-secondary flex items-center justify-between rounded-xl shadow-sm">
      <div className="flex gap-x-2">
        <Button
          asChild
          variant={pathname == "/settings" ? "default" : "outline"}
        >
          <Link href={"/settings"}>Settings</Link>
        </Button>
        <Button asChild variant={pathname == "/server" ? "default" : "outline"}>
          <Link href={"/server"}>Server</Link>
        </Button>
        <Button asChild variant={pathname == "/client" ? "default" : "outline"}>
          <Link href={"/client"}>Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "outline"}>
          <Link href={"/admin"}>Admin</Link>
        </Button>
      </div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};

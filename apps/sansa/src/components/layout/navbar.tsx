"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from "firebase/auth";
import { User } from "lucide-react";

import { env } from "@/env";
import { auth } from "@/firebase/client";

export function Navbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    await fetch(`${env.NEXT_PUBLIC_NED_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push(env.NEXT_PUBLIC_ARYA_URL);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/dashboard" className="flex items-center font-bold text-xl">
          Stark
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/test"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Take Test
          </Link>
          <Link
            href="/comparison"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Comparisons
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <Image
                  src="https://github.com/diego3g.png"
                  className="h-6 w-6 rounded-full"
                  width={24}
                  height={24}
                  alt=""
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

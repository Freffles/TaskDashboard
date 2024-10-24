"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/user-nav";
import { Loader2, LogIn } from "lucide-react";

export function Navigation() {
  const { user, loading } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>

          <div className="flex items-center gap-4">
            <ModeToggle />
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : user ? (
              <UserNav />
            ) : (
              <Button asChild>
                <Link href="/auth/signin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Task Dashboard
          </Link>

          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
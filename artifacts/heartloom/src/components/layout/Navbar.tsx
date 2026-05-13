"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = usePathname();
  const isLanding = location === "/";

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isLanding
          ? "bg-background/80 backdrop-blur-md border-transparent"
          : "bg-background border-border/40"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <img src="/heartloom-logo.png" alt="Heartloom" className="h-8 sm:h-10 w-auto shrink-0" />
          <div className="min-w-0">
            <div className="font-serif text-xl sm:text-2xl font-semibold text-primary tracking-tight leading-none">
              Heartloom.
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className={cn("transition-colors hover:text-accent", location === "/" ? "text-primary" : "text-muted-foreground")}
          >
            Home
          </Link>
          <Link
            href="/letters"
            className={cn("transition-colors hover:text-accent", location === "/letters" ? "text-primary" : "text-muted-foreground")}
          >
            Letters
          </Link>
          <Link
            href="/concierge"
            className={cn("transition-colors hover:text-accent", location === "/concierge" ? "text-primary" : "text-muted-foreground")}
          >
            Concierge
          </Link>
        </div>
      </div>
    </nav>
  );
}
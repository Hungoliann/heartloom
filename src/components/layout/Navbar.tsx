"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const location = usePathname();
  const isLanding = location === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/letters", label: "Letters" },
    { href: "/concierge", label: "Concierge" },
    { href: "/research", label: "Research" },
  ];

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.svg?v=6" alt="" className="h-8 w-8 shrink-0 object-contain sm:h-10 sm:w-10" aria-hidden="true" />
          <div className="min-w-0">
            <div className="font-serif text-xl sm:text-2xl font-semibold text-primary tracking-tight leading-none">
              Heartloom
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-accent",
                  location === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-2">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="inline-flex items-center justify-center rounded-full border border-border/50 bg-background p-2 text-muted-foreground transition hover:border-accent hover:text-accent md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div className="md:hidden border-t border-border/20 bg-background/95 px-4 py-4 backdrop-blur-md">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                  location === item.href ? "bg-accent/10 text-primary" : "text-muted-foreground hover:bg-muted/10"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button asChild size="sm" className="mt-3 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/waitlist" onClick={() => setMenuOpen(false)}>
              Join Waitlist
            </Link>
          </Button>
        </div>
      ) : null}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";

export default function Waitlist() {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const { user, isSignedIn, isLoaded } = useUser();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !isAdded) {
      // Check if already on waitlist
      if ((user.unsafeMetadata as any)?.onWaitlist) {
        setIsAdded(true);
        return;
      }

      // Add user to waitlist
      setIsLoading(true);
      user
        .update({
          unsafeMetadata: {
            onWaitlist: true,
            joinedAt: new Date().toISOString(),
          },
        })
        .then(() => {
          setIsAdded(true);
        })
        .catch(() => {
          // Still mark as added even if metadata update fails
          setIsAdded(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoaded, isSignedIn, user, isAdded]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--parchment)_0%,var(--card-white)_100%)] text-[color:var(--charcoal)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[color:var(--muted-text)]">Heartloom waitlist</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight text-primary">
            Join the private launch list.
          </h1>
          <p className="text-lg sm:text-xl text-[color:var(--muted-text)] leading-relaxed">
            Sign up to reserve your spot and receive launch updates directly.
          </p>
        </div>

        <Card className="mt-12 max-w-2xl border shadow-xl" style={{ borderColor: "var(--border-warm)" }}>
          <CardContent className="p-8 md:p-10 space-y-6">
            {clerkPublishableKey ? (
              <>
                {isLoaded && isSignedIn && isAdded ? (
                  // Show confirmation for signed-in users
                  <div className="space-y-6 py-6">
                    <div className="flex items-start gap-4">
                      <Check className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                      <div className="space-y-2">
                        <h2 className="text-2xl font-serif text-primary">You're on the waitlist!</h2>
                        <p className="text-[color:var(--muted-text)]">
                          Thanks for joining, <span className="font-semibold">{user?.firstName || "friend"}</span>. We'll notify you when early access begins.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Show signup form for unsigned users
                  <>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-serif text-primary">Early access</h2>
                      <p className="text-[color:var(--muted-text)]">
                        Sign up to reserve your spot.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <SignUp
                        appearance={{
                          elements: {
                            rootBox: "w-full",
                            card: "border-0 shadow-none",
                          },
                        }}
                        redirectUrl="/waitlist"
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-primary">Clerk key not configured yet</h2>
                  <p className="text-[color:var(--muted-text)]">
                    Add <span className="font-mono">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</span> to enable the Clerk waitlist flow.
                  </p>
                </div>

                <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href="mailto:heartloomllc@gmail.com?subject=Heartloom%20waitlist">
                    Email the team <Mail className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

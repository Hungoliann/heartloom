"use client";

import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import PageFooter from "@/components/layout/PageFooter";

export default function Waitlist() {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const { user, isSignedIn, isLoaded } = useUser();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !isAdded) {
      if ((user.unsafeMetadata as Record<string, unknown>)?.onWaitlist) {
        setIsAdded(true);
        return;
      }
      user
        .update({
          unsafeMetadata: {
            onWaitlist: true,
            joinedAt: new Date().toISOString(),
          },
        })
        .then(() => setIsAdded(true))
        .catch(() => setIsAdded(true));
    }
  }, [isLoaded, isSignedIn, user, isAdded]);

  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <section className="px-4 sm:px-6 py-20 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Hero copy */}
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">Heartloom Waitlist</p>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight text-primary tracking-tight">
                  Join the private launch list.
                </h1>
                <p className="text-lg text-[color:var(--muted-text)] leading-relaxed max-w-prose">
                  Reserve your place among the first families to experience Heartloom. Early access includes personalized onboarding with a Legacy Architect.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Private early access before public launch",
                  "Dedicated Legacy Architect onboarding",
                  "Founding member pricing — locked in forever",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                    <span className="text-[color:var(--charcoal)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 space-y-3">
                <p className="font-serif text-xl italic text-secondary leading-relaxed">
                  &ldquo;Your story doesn&apos;t end. With Heartloom, it continues in the people who carry it forward.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[color:var(--border-warm)]" />
                  <span className="text-xs uppercase tracking-widest text-[color:var(--muted-text)]">Heartloom</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="rounded-3xl border border-[color:var(--border-warm)] bg-white p-8 sm:p-10 shadow-2xl">
              {clerkPublishableKey ? (
                <>
                  {isLoaded && isSignedIn && isAdded ? (
                    <div className="space-y-6 py-4">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-secondary" />
                      </div>
                      <div className="text-center space-y-2">
                        <h2 className="font-serif text-3xl text-primary">You&apos;re on the list!</h2>
                        <p className="text-[color:var(--muted-text)] leading-relaxed">
                          Thank you, <span className="font-semibold text-[color:var(--charcoal)]">{user?.firstName || "friend"}</span>.
                          We&apos;ll reach out when early access begins.
                        </p>
                      </div>
                      <Button asChild variant="outline" className="w-full rounded-full border-[color:var(--border-warm)] cursor-pointer">
                        <Link href="/">
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to home
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="font-serif text-2xl sm:text-3xl text-primary">Early Access</h2>
                        <p className="text-[color:var(--muted-text)]">Sign up to reserve your spot.</p>
                      </div>
                      <div className="flex justify-center">
                        <SignUp
                          appearance={{
                            elements: {
                              rootBox: "w-full",
                              card: "border-0 shadow-none p-0",
                            },
                          }}
                          redirectUrl="/waitlist"
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl text-primary">Join the Waitlist</h2>
                    <p className="text-[color:var(--muted-text)] leading-relaxed">
                      Email us directly to reserve your place.
                    </p>
                  </div>
                  <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5">
                    <a href="mailto:heartloomllc@gmail.com?subject=Heartloom%20waitlist">
                      <Mail className="w-4 h-4 mr-2" />
                      Email the team
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full border-[color:var(--border-warm)] cursor-pointer">
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to home
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

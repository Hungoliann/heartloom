"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  PenLine,
  Shield,
  Mail,
  Users,
  CheckCircle2,
  ChevronRight,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { GrowingTree } from "@/components/GrowingTree";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageFooter from "@/components/layout/PageFooter";
import { Navbar } from "@/components/layout/Navbar";

export default function Home() {
  const [memoryDraft, setMemoryDraft] = useState("");

  const handleRecord = () => {
    alert("Voice recording feature would open here.");
  };

  const handleDraft = () => {
    if (memoryDraft.trim()) {
      alert("Draft saved. Letter composer would open here.");
      return;
    }
    alert("Write a short thought first, then we can draft your letter.");
  };

  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main>
        <section className="pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 relative overflow-hidden bg-[color:var(--parchment)] isolate">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10 pointer-events-none"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10 bg-white/40 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 shadow-3xl border border-white/60" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 2px 0 rgba(255, 255, 255, 0.5)' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-primary tracking-tight leading-tight">
                Preserve Your Words
                <br />
                and Wisdom
              </h1>
              <p className="mt-5 sm:mt-6 text-lg sm:text-xl text-[color:var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
                A secure vault for your legacy. Leave behind the guidance, stories,
                and letters that matter most to the people you love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-2xl mx-auto bg-white/30 backdrop-blur-xl rounded-2xl p-2 md:p-3 shadow-lg border border-white/50 flex flex-col gap-3"
            >
              <Textarea
                value={memoryDraft}
                onChange={(e) => setMemoryDraft(e.target.value)}
                placeholder="What is one thing you want your family to know forever?"
                className="border-0 bg-white/40 text-base sm:text-lg focus-visible:ring-0 shadow-none px-4 py-4 min-h-28 sm:min-h-32 resize-none placeholder-gray-500 backdrop-blur-md rounded-lg"
              />
              <div className="flex flex-col sm:flex-row gap-2 shrink-0 p-2 md:p-0 md:self-end">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="h-12 w-full sm:w-auto rounded-xl border border-white/40 bg-white/20 backdrop-blur-md text-[color:var(--charcoal)] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-xl active:translate-y-0 active:shadow-md"
                >
                  <Link href="/waitlist" className="inline-flex items-center justify-center">
                    <Mic className="w-4 h-4 mr-2" />
                    Record Voice
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full sm:w-auto rounded-xl bg-accent text-primary-foreground border border-black/10 shadow-[0_6px_0_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-[0_8px_0_rgba(0,0,0,0.22)] active:translate-y-0 active:shadow-[0_2px_0_rgba(0,0,0,0.14)]"
                >
                  <Link href="/waitlist" className="inline-flex items-center justify-center">
                    <PenLine className="w-4 h-4 mr-2" />
                    Draft Letter
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-medium text-[color:var(--muted-text)] pt-4 w-full"
            >
              <div className="flex -space-x-2 shrink-0">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[color:var(--muted)] border-2 border-[color:var(--parchment)] flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-center">20+ Families preserving their priceless memories</span>
            </motion.div>
          </div>
        </section>

        <section className="pt-8 pb-8 border-y bg-[color:var(--card-white)] overflow-visible" style={{ borderColor: "var(--border-warm)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-2 md:gap-4 opacity-85 text-center">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] uppercase text-[color:var(--muted-text)] w-full">Founded by researchers from</span>
            <img src="/stanford-logo.png" alt="Stanford University" className="h-44 sm:h-48 md:h-56 w-44 sm:w-48 md:w-56 object-contain -mt-10 sm:-mt-13" />
            <img src="/nasa-logo.png" alt="NASA" className="h-24 sm:h-20 md:h-24 w-32 sm:w-20 md:w-24 object-contain -mt-8 sm:-mt-13" />
            <img src="/berkeley-logo.png" alt="UC Berkeley" className="h-36 sm:h-48 md:h-56 w-44 sm:w-48 md:w-56 object-contain -mt-8 sm:-mt-13" />
          </div>
        </section>

        <section className="py-20 px-6 bg-[color:var(--card-white)]">
          <div className="max-w-5xl mx-auto">
            <Card className="border border-[color:var(--border-warm)] shadow-xl">
              <CardContent className="p-10 md:p-14 text-center">
                <p className="text-lg md:text-xl text-[color:var(--muted-text)] mb-6">
                  Some things are too important to leave unsaid.
                </p>
                <h2 className="text-3xl md:text-4xl font-serif text-primary mb-6">
                  Heartloom is a dedicated legacy and concierge platform, thoughtfully designed to be accessible to every generation.
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-[color:var(--charcoal)] max-w-3xl mx-auto mb-8">
                  It offers a sanctuary for the moments that matter most: a place to compose letters for a wedding day decades in the future or to preserve the warmth of your voice while recounting a cherished summer memory…
                </p>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/about">Read More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 bg-[linear-gradient(180deg,var(--card-white)_0%,var(--parchment)_100%)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-primary">Preserving the human thread.</h2>
              <p className="mt-4 text-lg text-[color:var(--muted-text)]">Dignity, security, and guidance in one place.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-[color:var(--charcoal)] text-[color:var(--parchment)] border-transparent shadow-xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-[color:var(--parchment)]/10 rounded-xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-[color:var(--parchment)]">The Vault</h3>
                      <p className="text-[color:var(--parchment)]/70 leading-relaxed">
                        Secure, biometric-grade storage for legal documents. Keep your
                        Wills, DNRs, and Medical Directives safe yet instantly accessible
                        to designated successors.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-[color:var(--card-white)] shadow-md" style={{ borderColor: "var(--border-warm)" }}>
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-primary">The Thread</h3>
                      <p className="text-[color:var(--muted-text)] leading-relaxed">
                        Scheduled delivery of letters and recordings. Birthday wishes,
                        graduation notes, wedding day wisdom - delivered exactly when
                        they are needed most.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-[color:var(--card-white)] shadow-md" style={{ borderColor: "var(--border-warm)" }}>
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-primary">The Concierge</h3>
                      <p className="text-[color:var(--muted-text)] leading-relaxed">
                        We provide a 24/7 digital concierge designed to navigate the complexities of estate planning and healthcare logistics with surgical precision. 
                        Our platform delivers high-level expertise at the moment of need, ensuring you are never left searching for answers in the dark.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 border-y bg-[color:var(--parchment)]" style={{ borderColor: "var(--border-warm)" }}>
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <Badge variant="outline" className="text-accent border-accent/30 bg-accent/5 px-3 py-1">Concierge Access</Badge>
              <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                Your legacy, beautifully organized.
              </h2>
              <p className="text-lg text-[color:var(--muted-text)] leading-relaxed">
                Step inside a premium dashboard designed to give you total control and
                peace of mind. From document storage to Medicare optimization, everything
                is managed securely in one place.
              </p>
              <ul className="space-y-4">
                {[
                  "Live identity verification monitoring",
                  "Biometric document unlocking",
                  "Medicare benefit tracking",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/concierge">Preview Dashboard</Link>
              </Button>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-background rounded-2xl border border-border shadow-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-primary" />

                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="font-serif text-xl text-primary">Security Portal</h3>
                    <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">Protected</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[color:var(--card-white)] border rounded-xl p-4 space-y-2" style={{ borderColor: "var(--border-warm)" }}>
                      <p className="text-sm font-medium text-[color:var(--muted-text)]">Medicare Benefit Optimization</p>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-serif text-[color:var(--charcoal)]">$4,240<span className="text-sm font-sans text-[color:var(--muted-text)]">/yr saved</span></span>
                        <span className="text-xs font-medium text-accent">Score: 94/100</span>
                      </div>
                    </div>

                    <div className="bg-[color:var(--card-white)] border rounded-xl p-4 space-y-2" style={{ borderColor: "var(--border-warm)" }}>
                      <p className="text-sm font-medium text-[color:var(--muted-text)]">Switch Verification</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-sm font-medium text-[color:var(--charcoal)]">Active Monitoring</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-[color:var(--muted-text)] uppercase tracking-wider">Vaulted Documents</h4>
                    {["Last Will & Testament", "Medical Directive"].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-[color:var(--card-white)]" style={{ borderColor: "var(--border-warm)" }}>
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-[color:var(--muted-text)]" />
                          <span className="font-medium text-sm">{doc}</span>
                        </div>
                        <Badge variant="outline" className="text-xs font-mono tracking-widest bg-primary/5">SEALED</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 px-6 bg-[color:var(--card-white)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-primary">Simple, transparent pricing</h2>
              <p className="mt-4 text-lg text-[color:var(--muted-text)]">Choose the level of guidance you need.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <Card className="bg-[color:var(--card-white)]" style={{ borderColor: "var(--border-warm)" }}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-semibold mb-2">Legacy Starter</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-serif text-primary">$49</span>
                    <span className="text-[color:var(--muted-text)]"> one-time</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> 5 Future Letters</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> 2GB Media Storage</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Basic Vault Access</li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/waitlist">Join Waitlist</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--charcoal)] text-[color:var(--parchment)] border-transparent shadow-2xl relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Featured
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-semibold mb-2 text-[color:var(--parchment)]">Concierge</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-serif text-accent">$15</span>
                    <span className="text-[color:var(--parchment)]/70"> /mo</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Monthly Guided Sessions</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Estate Specialist Support</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Family Onboarding</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Priority Verification</li>
                  </ul>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-0">
                    <Link href="/waitlist">Join Waitlist</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[color:var(--card-white)]" style={{ borderColor: "var(--border-warm)" }}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-semibold mb-2">Infinity Vault</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-serif text-primary">$299</span>
                    <span className="text-[color:var(--muted-text)]"> one-time</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Unlimited Letters</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> 100GB Media Storage</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Heirloom Physical Cards</li>
                  </ul>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/waitlist">Join Waitlist</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <GrowingTree />

        <section className="py-24 md:py-32 px-6 text-center overflow-hidden" style={{ backgroundColor: "var(--charcoal)", color: "var(--parchment)" }}>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-3xl md:text-4xl font-serif italic leading-relaxed">
              "The best time to plant a tree was 20 years ago. The second best time is today."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-px bg-[color:var(--brand-amber)]" />
              <div className="font-serif text-lg tracking-widest text-[color:var(--parchment)]/70">HEARTLOOM.</div>
            </div>
            <p className="text-[color:var(--parchment)]/60 text-lg leading-relaxed max-w-md mx-auto">
              Every day you wait is a day your family will not have. Start preserving what matters most.
            </p>
            <Button asChild className="px-8 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-quote-cta">
              <Link href="/waitlist">Begin Your Legacy Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

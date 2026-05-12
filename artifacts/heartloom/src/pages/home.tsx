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
import { GrowingTree } from "@/components/GrowingTree";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 border-b bg-background/80 backdrop-blur-md border-transparent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl font-semibold text-primary tracking-tight">
            Heartloom.
          </a>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#" className="transition-colors hover:text-accent">Home</a>
              <a href="#" className="transition-colors hover:text-accent">Letters</a>
              <a href="#" className="transition-colors hover:text-accent">Concierge</a>
            </div>

            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Waitlist
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight leading-tight">
                Preserve Your Words
                <br />
                and Wisdom
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A secure vault for your legacy. Leave behind the guidance, stories,
                and letters that matter most to the people you love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-2xl mx-auto bg-card rounded-2xl p-2 md:p-3 shadow-xl border border-border/50 flex flex-col md:flex-row gap-3"
            >
              <Input
                value={memoryDraft}
                onChange={(e) => setMemoryDraft(e.target.value)}
                placeholder="What is one thing you want your family to know forever?"
                className="border-0 bg-transparent text-lg focus-visible:ring-0 shadow-none px-4 h-14"
              />
              <div className="flex gap-2 shrink-0 p-2 md:p-0">
                <Button variant="secondary" size="lg" className="h-12 w-full md:w-auto" onClick={handleRecord}>
                  <Mic className="w-4 h-4 mr-2" />
                  Record Voice
                </Button>
                <Button size="lg" className="h-12 w-full md:w-auto bg-accent hover:bg-accent/90 text-primary-foreground" onClick={handleDraft}>
                  <PenLine className="w-4 h-4 mr-2" />
                  Draft Letter
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>4,200+ Families preserving their priceless memories</span>
            </motion.div>
          </div>
        </section>

        <section className="py-10 border-y border-border/50 bg-card/50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-70">
            <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Founded by researchers from</span>
            <div className="flex items-center gap-8 md:gap-16">
              <span className="font-serif text-xl md:text-2xl font-semibold tracking-tight text-primary">Stanford</span>
              <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-primary">NASA</span>
              <span className="font-serif text-xl md:text-2xl italic text-primary">UC Berkeley</span>
            </div>
          </div>
        </section>

        {/* Keep the old tree animation and place it right after the trust bar. */}
        <GrowingTree />

        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-primary">Preserving the human thread.</h2>
              <p className="mt-4 text-lg text-muted-foreground">Dignity, security, and guidance in one place.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-primary text-primary-foreground border-transparent shadow-xl">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                      <Lock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-primary-foreground">The Vault</h3>
                      <p className="text-primary-foreground/70 leading-relaxed">
                        Secure, biometric-grade storage for legal documents. Keep your
                        Wills, DNRs, and Medical Directives safe yet instantly accessible
                        to designated successors.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-card border-border/50 shadow-md">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-primary">The Thread</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Scheduled delivery of letters and recordings. Birthday wishes,
                        graduation notes, wedding day wisdom - delivered exactly when
                        they are needed most.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="h-full bg-card border-border/50 shadow-md">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif mb-3 text-primary">The Concierge</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Human assistance through estate, hospice, and Medicare logistics.
                        Expert guidance from real specialists, not automated chatbots.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-card px-6 border-y border-border/50">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <Badge variant="outline" className="text-accent border-accent/30 bg-accent/5 px-3 py-1">Concierge Access</Badge>
              <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
                Your legacy, beautifully organized.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
                Preview Dashboard <ChevronRight className="w-4 h-4 ml-2" />
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
                    <div className="bg-card border rounded-xl p-4 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Medicare Benefit Optimization</p>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-serif text-primary">$4,240<span className="text-sm font-sans text-muted-foreground">/yr saved</span></span>
                        <span className="text-xs font-medium text-accent">Score: 94/100</span>
                      </div>
                    </div>

                    <div className="bg-card border rounded-xl p-4 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Switch Verification</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="text-sm font-medium">Active Monitoring</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Vaulted Documents</h4>
                    {["Last Will & Testament", "Medical Directive"].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-muted-foreground" />
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

        <section className="py-24 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif text-primary">Simple, transparent pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground">Choose the level of guidance you need.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-center">
              <Card className="bg-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-semibold mb-2">Legacy Starter</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-serif text-primary">$49</span>
                    <span className="text-muted-foreground"> one-time</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> 5 Future Letters</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> 2GB Media Storage</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Basic Vault Access</li>
                  </ul>
                  <Button variant="outline" className="w-full">Get Started</Button>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground border-transparent shadow-2xl relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Featured
                </div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-semibold mb-2 text-primary-foreground">Concierge</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-serif text-accent">$15</span>
                    <span className="text-primary-foreground/70"> /mo</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Monthly Guided Sessions</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Estate Specialist Support</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Family Onboarding</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-accent" /> Priority Verification</li>
                  </ul>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border-0">Begin Trial</Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif font-semibold mb-2">Infinity Vault</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-serif text-primary">$299</span>
                    <span className="text-muted-foreground"> one-time</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Unlimited Letters</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> 100GB Media Storage</li>
                    <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-secondary" /> Heirloom Physical Cards</li>
                  </ul>
                  <Button variant="outline" className="w-full">Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-primary text-primary-foreground px-6 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-3xl md:text-4xl font-serif italic leading-relaxed">
              "The best time to plant a tree was 20 years ago. The second best time is today."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-px bg-accent" />
              <div className="font-serif text-lg tracking-widest text-primary-foreground/70">HEARTLOOM.</div>
            </div>
            <p className="text-primary-foreground/60 text-lg leading-relaxed max-w-md mx-auto">
              Every day you wait is a day your family will not have. Start preserving what matters most.
            </p>
            <button
              className="px-8 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all"
              style={{ background: "hsl(34 83% 45%)", color: "hsl(37 33% 96%)" }}
              data-testid="button-quote-cta"
            >
              Begin Your Legacy Today
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t py-16 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <a href="#" className="font-serif text-2xl font-semibold text-primary tracking-tight">
              Heartloom.
            </a>
            <p className="text-sm text-muted-foreground max-w-xs">
              Preserving the human thread. Secure, dignified legacy planning for
              the ones you love most.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">The Concierge</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Memory Vault</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Estate Access</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Research Methodology</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>(c) {new Date().getFullYear()} Heartloom. All rights reserved.</p>
          <p>Built with care for the future.</p>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Send,
  Shield,
  Quote,
  Users,
  CheckCircle,
  Loader2,
  Star,
  Clock,
  FileText,
  Mic,
  Calendar,
  UserCheck,
} from "lucide-react";
import { GrowingTree } from "@/components/GrowingTree";
import logoImage from "@assets/image_1778097592136.png";

const AMBER = "#D27F14";
const SAGE = "#9CAF88";

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const waitlistRef = useRef<HTMLElement>(null);

  const [email, setEmail] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(0);
  const count = 3847;

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.08 }
      );
      section.style.opacity = "0";
      section.style.transform = "translateY(44px)";
      section.style.transition = "opacity 0.85s ease, transform 0.85s ease";
      obs.observe(section);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!waitlistRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const p = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setDisplayCount(Math.round(ease * count));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(waitlistRef.current);
    return () => observer.disconnect();
  }, [count]);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setWaitlistSubmitted(true); }, 1200);
  };

  const handleFooter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 md:px-12"
        style={{ background: "rgba(250,248,242,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(156,175,136,0.15)" }}
      >
        <Link href="/" className="flex items-center gap-3">
          <img src={logoImage} alt="Heartloom" className="h-10 w-auto" />
          <div>
            <span className="font-serif text-xl font-semibold block leading-tight" style={{ color: "#2d1a08" }}>Heartloom</span>
            <span className="text-xs font-sans" style={{ color: SAGE }}>Legacy Guides</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm hidden sm:inline-flex" style={{ color: "#2d1a08" }}>Log In</Button>
          <Button className="rounded-full px-5 text-sm text-white font-semibold" style={{ background: AMBER }}>
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full flex items-center justify-center text-white"
        style={{ height: "100dvh", paddingTop: 72 }}
      >
        {/* Background family photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1920&q=85&auto=format&fit=crop')`,
          }}
        />
        {/* Warm overlay — lighter to let the photo breathe */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(15,8,2,0.45) 0%, rgba(25,12,4,0.38) 45%, rgba(10,16,8,0.68) 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs font-sans font-semibold tracking-[0.22em] uppercase mb-5"
            style={{ color: SAGE }}
          >
            A legacy companion for families
          </motion.p>

          <h1
            className="font-serif text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", textShadow: "0 4px 32px rgba(0,0,0,0.55)" }}
          >
            The story of your life<br />
            is too important to{" "}
            <em style={{ color: AMBER }}>leave to chance.</em>
          </h1>

          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto font-sans leading-relaxed">
            Write letters for milestones years away. Preserve memories. Leave your family everything they need — and everything they'll treasure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full px-8 text-white font-semibold"
              style={{ background: AMBER, boxShadow: `0 4px 24px ${AMBER}55` }}
            >
              Reserve My Spot <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-white/25 text-white hover:bg-white/10"
            >
              See How It Works
            </Button>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            {[
              { n: "3,847", label: "families waiting" },
              { n: "4.9★", label: "satisfaction" },
              { n: "Free", label: "to start" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-serif font-bold" style={{ color: AMBER }}>{s.n}</div>
                <div className="text-xs text-white/50 font-sans">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
      </section>

      {/* ── GROWING TREE ─────────────────────────────────────────────────── */}
      <GrowingTree />

      {/* ── PHILOSOPHY ──────────────────────────────────────────────────── */}
      <section
        className="py-28 px-6 md:px-16"
        style={{ background: `linear-gradient(160deg, ${SAGE}12 0%, ${AMBER}08 100%)` }}
        ref={(el) => { sectionsRef.current[0] = el; }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: SAGE }}>Our philosophy</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              Don't prepare for death.<br />
              <span style={{ color: AMBER }}>Preserve a life.</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed font-sans">
              Silicon Valley avoids death. That's exactly why no one has built this yet. Heartloom is the end-of-life companion built on warmth, permanence, and love — not checklists and legal forms.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { color: AMBER, label: "Lead with joy, not admin", desc: "The first thing you do is record a favorite memory — not fill out a DNR." },
              { color: SAGE, label: "Family onboarding first", desc: "Adult children set it up as an act of love. Not something done to someone — done for them." },
              { color: AMBER, label: "Progress framed as a gift", desc: "\"Your family knows 3 more things about you today.\" Not a grim task list." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-background border border-border/40">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${item.color}18` }}>
                  <Heart className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-serif font-semibold mb-1">{item.label}</p>
                  <p className="text-sm text-muted-foreground font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────────── */}
      <section
        className="py-28 px-6 md:px-16"
        ref={(el) => { sectionsRef.current[1] = el; }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: SAGE }}>Everything included</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Six ways Heartloom<br />serves your family</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Send,
                color: AMBER,
                title: "Future Letters",
                desc: "Write letters to be delivered on specific future dates — weddings, graduations, first days of school, or \"open when you need me.\"",
                badge: "Fan favorite",
              },
              {
                icon: Mic,
                color: SAGE,
                title: "Memory Vault",
                desc: "Capture stories through gentle guided prompts via text or audio. Your grandchildren will know your voice, your humor, your wisdom.",
                badge: null,
              },
              {
                icon: FileText,
                color: AMBER,
                title: "Document Vault",
                desc: "Wills, trusts, DNRs, account lists, insurance — organized, encrypted, and ready for your family exactly when they need them.",
                badge: null,
              },
              {
                icon: UserCheck,
                color: SAGE,
                title: "Legacy Concierge",
                desc: "A dedicated Legacy Guide holds your hand through the entire process — video calls, guided sessions, and a personal legacy book at the end.",
                badge: "Premium",
              },
              {
                icon: Clock,
                color: AMBER,
                title: "Life Timeline",
                desc: "Build a beautiful visual history of your life — places lived, milestones reached, chapters opened and closed — in chronological story form.",
                badge: null,
              },
              {
                icon: Users,
                color: SAGE,
                title: "Family Sharing",
                desc: "Invite family members to contribute memories, see your letters (when released), and carry on the legacy themselves.",
                badge: null,
              },
            ].map((feature, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 280 }}>
                <Card className="p-7 h-full flex flex-col relative overflow-hidden border-border/40">
                  {feature.badge && (
                    <span
                      className="absolute top-4 right-4 text-xs font-sans font-semibold px-2.5 py-1 rounded-full text-white"
                      style={{ background: feature.color }}
                    >
                      {feature.badge}
                    </span>
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${feature.color}15` }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed flex-grow">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCIERGE SPOTLIGHT ──────────────────────────────────────────── */}
      <section
        className="py-28 px-6 md:px-16"
        style={{ background: `linear-gradient(135deg, ${SAGE}22 0%, ${SAGE}10 100%)` }}
        ref={(el) => { sectionsRef.current[2] = el; }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span
              className="inline-block text-xs font-sans font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6"
              style={{ background: `${SAGE}22`, color: "#4a6e3a", border: `1px solid ${SAGE}40` }}
            >
              Premium Feature
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-5 leading-tight">
              Your personal<br />
              <span style={{ color: SAGE }}>Legacy Concierge.</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6 font-sans">
              Not everyone wants to do this alone — and they shouldn't have to. Your Legacy Guide is a trained companion who meets with you via video call, draws out your stories through conversation, and builds your legacy book on your behalf.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Three 60-minute video sessions to capture your stories",
                "Professionally written legacy narrative from your sessions",
                "Beautifully designed physical legacy book delivered to your home",
                "Complete document organization and family notification plan",
                "Ongoing support as your family grows and life evolves",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-sans">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: SAGE }} />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="rounded-full px-8 text-white font-semibold" style={{ background: SAGE }}>
              Learn About Concierge <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-8 bg-background shadow-lg border border-border/30">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-serif font-bold" style={{ background: SAGE }}>
                  M
                </div>
                <div>
                  <p className="font-serif font-semibold">Maya R.</p>
                  <p className="text-xs text-muted-foreground font-sans">Legacy Concierge Guide</p>
                </div>
              </div>
              <Quote className="h-8 w-8 mb-3 opacity-15" style={{ color: SAGE }} />
              <p className="font-serif text-lg italic leading-relaxed text-foreground/85 mb-4">
                "Most of my clients start thinking this is about death. By our third session, they realize it's one of the most life-affirming things they've ever done."
              </p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: AMBER }} />)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "94%", label: "say it exceeded expectations" },
                { stat: "3 hrs", label: "average session time" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl p-5 text-center bg-background border border-border/30">
                  <div className="text-2xl font-serif font-bold mb-1" style={{ color: SAGE }}>{s.stat}</div>
                  <div className="text-xs text-muted-foreground font-sans">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section
        className="py-28 px-6 md:px-16"
        ref={(el) => { sectionsRef.current[3] = el; }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: AMBER }}>Get started</p>
          <h2 className="text-4xl font-serif mb-16">Three steps to your legacy</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px" style={{ background: `linear-gradient(to right, ${AMBER}, ${SAGE})`, opacity: 0.3 }} />
            {[
              { icon: BookOpen, color: AMBER, num: "01", title: "Record a Memory", desc: "Answer gentle prompts via text or audio. Start with your favorite story. No tech skills needed." },
              { icon: Send, color: SAGE, num: "02", title: "Write Future Letters", desc: "Set messages to unlock on future milestones — weddings, birthdays, graduations, or just because." },
              { icon: Shield, color: AMBER, num: "03", title: "Handle the Logistics", desc: "Organize wills, DNRs, and the documents your family needs — all secure, private, and easy to find." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center border-2" style={{ background: `${step.color}12`, borderColor: step.color }}>
                    <step.icon className="h-6 w-6" style={{ color: step.color }} />
                  </div>
                  <span className="absolute -bottom-2 -right-2 text-xs font-bold font-sans px-1.5 py-0.5 rounded-full text-white" style={{ background: step.color, fontSize: "0.6rem" }}>{step.num}</span>
                </div>
                <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAITLIST ─────────────────────────────────────────────────────── */}
      <section
        ref={waitlistRef}
        className="py-32 px-6 md:px-16 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a0d04 0%, #2c1608 50%, #1a2210 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${AMBER} 0%, transparent 55%), radial-gradient(circle at 80% 50%, ${SAGE} 0%, transparent 55%)` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-sans font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 border" style={{ color: SAGE, borderColor: `${SAGE}40`, background: `${SAGE}12` }}>
              Early Access
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-5 leading-tight">
              Thousands of families<br />
              <em style={{ color: AMBER }}>already waiting.</em>
            </h2>
            <p className="text-xl text-white/65 font-sans max-w-xl mx-auto">
              We're building with real families, in the open. Reserve your spot and be among the first to start building your legacy.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-5 justify-center mb-14">
            {[
              { stat: displayCount.toLocaleString(), label: "Families on waitlist" },
              { stat: "4.9★", label: "Avg. satisfaction score" },
              { stat: "Day 1", label: "Access for early members" },
            ].map((item, i) => (
              <div key={i} className="flex-1 text-center py-8 px-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="text-5xl font-serif font-bold mb-2" style={{ color: AMBER }}>{item.stat}</div>
                <div className="text-sm font-sans text-white/55 tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {!waitlistSubmitted ? (
                <motion.form key="form" exit={{ opacity: 0, y: -8 }} onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email" required value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 rounded-full text-foreground outline-none font-sans text-base"
                    style={{ background: "rgba(255,255,255,0.95)", border: "none" }}
                  />
                  <Button type="submit" size="lg" disabled={loading} className="px-8 py-4 rounded-full text-white font-semibold whitespace-nowrap" style={{ background: AMBER }}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Reserve My Spot <ArrowRight className="ml-2 h-4 w-4" /></>}
                  </Button>
                </motion.form>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 px-6 rounded-2xl border" style={{ background: `${SAGE}12`, borderColor: `${SAGE}30` }}>
                  <CheckCircle className="h-10 w-10 mx-auto mb-4" style={{ color: SAGE }} />
                  <p className="font-serif text-xl text-white mb-2">You're on the list.</p>
                  <p className="text-white/55 font-sans text-sm">We'll reach out personally when we're ready for you.</p>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-center text-white/30 text-xs font-sans mt-4">No spam. No pressure. Just a warm note when we're ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-14">
            {[
              { quote: "I've been waiting for something like this for years.", name: "Sarah T.", location: "Austin, TX" },
              { quote: "Finally someone building for the sandwich generation.", name: "Michael R.", location: "Portland, OR" },
              { quote: "Signed up for my mom. She cried when I showed her.", name: "Eleanor J.", location: "Nashville, TN" },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Quote className="h-5 w-5 mb-3 opacity-30" style={{ color: AMBER }} />
                <p className="font-serif text-white/80 italic text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-white/55 text-xs font-sans font-semibold">{t.name} · {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-16" ref={(el) => { sectionsRef.current[4] = el; }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: AMBER }}>Pricing</p>
            <h2 className="text-4xl font-serif mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-muted-foreground">Start free. Upgrade when you're ready.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { name: "Free", price: "$0", period: "", desc: "Get started", features: ["3 future letters", "Basic memory prompts", "Document storage (1GB)"], color: SAGE },
              { name: "Family", price: "$15", period: "/mo", desc: "Most popular", features: ["20 future letters", "Unlimited memory prompts", "Document vault (10GB)", "Life Timeline"], color: AMBER, recommended: true },
              { name: "Lineage", price: "$50", period: "/mo", desc: "For the whole family", features: ["Unlimited letters", "Multiple family members", "Priority support", "Annual legacy report"], color: SAGE },
              { name: "Concierge", price: "$299", period: "one-time", desc: "White-glove service", features: ["3 guided video sessions", "Professional legacy writing", "Physical legacy book", "Complete document setup"], color: AMBER },
            ].map((plan, i) => (
              <Card key={i} className="p-7 flex flex-col relative" style={plan.recommended ? { borderColor: AMBER, borderWidth: 2, boxShadow: `0 8px 32px ${AMBER}20` } : {}}>
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-semibold tracking-wide uppercase text-white" style={{ background: AMBER }}>
                    Most Popular
                  </div>
                )}
                <div className="w-2 h-2 rounded-full mb-4" style={{ background: plan.color }} />
                <h3 className="font-serif text-xl mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold font-sans">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{plan.desc}</p>
                <ul className="space-y-2.5 mb-7 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start text-sm font-sans text-foreground/80">
                      <CheckCircle className="h-3.5 w-3.5 mr-2 flex-shrink-0 mt-0.5" style={{ color: plan.color }} /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full rounded-full text-white" style={{ background: plan.recommended ? AMBER : plan.color }} variant={plan.recommended ? "default" : "outline"}>
                  {plan.recommended ? "Join Waitlist" : "Get Started"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        className="py-28 px-6 md:px-16"
        style={{ background: `linear-gradient(160deg, ${AMBER}08 0%, ${SAGE}10 100%)` }}
        ref={(el) => { sectionsRef.current[5] = el; }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: SAGE }}>Stories of love</p>
            <h2 className="text-4xl font-serif">What families are saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "When my father passed, finding his letters on Heartloom felt like he was still holding my hand.", author: "Sarah T.", role: "Daughter" },
              { quote: "It changed the way we talk about the end. It's no longer scary — it's just another chapter of our family's story.", author: "Michael R.", role: "Father of three" },
              { quote: "I recorded memories I hadn't thought about in decades. It was one of the most beautiful afternoons of my life.", author: "Eleanor J.", role: "Grandmother" },
            ].map((t, i) => (
              <Card key={i} className="p-8 border-border/30 shadow-sm relative overflow-hidden">
                <Quote className="absolute top-4 right-4 h-14 w-14 opacity-[0.06]" style={{ color: i % 2 === 0 ? AMBER : SAGE }} />
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => <Star key={s} className="w-3.5 h-3.5 fill-current" style={{ color: AMBER }} />)}
                </div>
                <p className="font-serif text-lg text-foreground/85 italic mb-5 leading-relaxed">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold font-sans">{t.author}</p>
                  <p className="text-xs text-muted-foreground font-sans">{t.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-16" ref={(el) => { sectionsRef.current[6] = el; }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-sans font-semibold" style={{ background: `${SAGE}18`, color: "#4a6e3a" }}>
              <Users className="h-4 w-4" /> For the Sandwich Generation
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
            Built for adults who are<br />managing it all
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed font-sans mb-8">
            You're raising your kids and caring for your parents — at the same time. Heartloom gives you peace of mind, and gives your parents the profound gift of knowing their story will outlast them.
          </p>
          <Button variant="link" className="font-medium text-lg gap-2" style={{ color: SAGE }}>
            Read our letter to caregivers <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-32 px-6 md:px-16 text-center text-white"
        style={{ background: `linear-gradient(135deg, #1a0d04 0%, ${SAGE}80 200%)` }}
        ref={(el) => { sectionsRef.current[7] = el; }}
      >
        <div className="max-w-3xl mx-auto">
          <img src={logoImage} alt="Heartloom" className="h-16 w-auto mx-auto mb-6 opacity-90" />
          <h2 className="text-5xl font-serif mb-6 leading-tight text-white">Your family's story<br />deserves to be told.</h2>
          <p className="text-xl opacity-80 mb-10 font-sans">Start building your legacy today. It takes less than five minutes.</p>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form key="footer-form" exit={{ opacity: 0 }} onSubmit={handleFooter} className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-full text-foreground outline-none font-sans"
                  style={{ background: "rgba(255,255,255,0.95)", border: "none" }}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold whitespace-nowrap text-white" style={{ background: AMBER }}>
                  Begin Now
                </Button>
              </motion.form>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-3">
                <CheckCircle className="h-7 w-7 text-white" />
                <span className="font-serif text-xl text-white">You're on the list. We'll be in touch.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 md:px-16 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Heartloom" className="h-10 w-auto" />
            <div>
              <span className="font-serif text-xl block leading-tight" style={{ color: "#2d1a08" }}>Heartloom</span>
              <span className="text-xs font-sans" style={{ color: SAGE }}>Legacy Guides</span>
            </div>
          </div>
          <div className="flex gap-8 text-sm font-sans text-muted-foreground">
            {["About", "Privacy", "Terms", "Contact"].map((l) => (
              <Link key={l} href="#" className="hover:text-foreground transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground/45 font-sans">
          © {new Date().getFullYear()} Heartloom Legacy Guides · tryheartloom.com
        </div>
      </footer>
    </div>
  );
}

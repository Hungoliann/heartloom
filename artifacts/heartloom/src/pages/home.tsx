import { useEffect, useRef, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Heart,
  Loader2,
  Mic,
  Send,
  Shield,
  Star,
  UserCheck,
} from "lucide-react";
import { GrowingTree } from "@/components/GrowingTree";
import logoImage from "@assets/image_1778097592136.png";

const AMBER = "#D27F14";
const SAGE = "#9CAF88";
const RECIPIENTS = ["my children", "my partner", "my family", "my executor"];

const PILLARS = [
  {
    icon: Shield,
    title: "The Vault",
    desc: "Secure storage for wills, DNRs, account lists, and the documents your family needs first.",
    points: ["Encrypted access", "Role-based sharing", "Family handoff packets"],
  },
  {
    icon: Send,
    title: "The Thread",
    desc: "Future letters delivered when they matter most: birthdays, milestones, and hard days.",
    points: ["Open-when delivery", "Milestone scheduling", "Guided memory prompts"],
  },
  {
    icon: UserCheck,
    title: "The Concierge",
    desc: "A human guide helps with hospice benefits, estate logistics, and executor access.",
    points: ["Medicare benefit optimization", "Digital will integration", "Estate executor access"],
  },
];

const DASHBOARD_ITEMS = [
  "Medicare benefit optimization",
  "Digital will integration",
  "Estate executor access",
  "Care team contact list",
  "Account inventory and key documents",
  "Family notification plan",
];

const PLANS = [
  {
    name: "Gift Model",
    price: "$49",
    period: "one-time",
    desc: "A meaningful first step for one loved one or one milestone.",
    features: ["One guided future letter", "One memory recording", "Basic vault starter"],
    color: SAGE,
  },
  {
    name: "Family Tier",
    price: "$15",
    period: "/mo",
    desc: "Active concierge support for families managing care and legacy together.",
    features: ["Unlimited letters", "Family sharing", "Concierge check-ins", "Shared document vault"],
    color: AMBER,
    recommended: true,
  },
  {
    name: "Legacy Vault",
    price: "$299",
    period: "one-time",
    desc: "Permanent secure archive for practical planning and long-term peace of mind.",
    features: ["Vault architecture access", "Executor-ready handoff", "Document organization", "Permanent storage"],
    color: SAGE,
  },
];

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [recipient, setRecipient] = useState(RECIPIENTS[0]);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"letter" | "memory">("letter");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
      section.style.transform = "translateY(32px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      obs.observe(section);
      observers.push(obs);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const handleMicroAction = (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1100);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 md:px-12"
        style={{
          background: "rgba(250,248,242,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(156,175,136,0.16)",
        }}
      >
        <a href="/" className="flex items-center gap-3">
          <img src={logoImage} alt="Heartloom" className="h-10 w-auto" />
          <div>
            <span className="block font-serif text-xl font-semibold leading-tight" style={{ color: "#2d1a08" }}>
              Heartloom
            </span>
            <span className="text-xs font-sans" style={{ color: SAGE }}>
              Legacy Guides
            </span>
          </div>
        </a>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden text-sm sm:inline-flex" style={{ color: "#2d1a08" }}>
            See pricing
          </Button>
          <Button className="rounded-full px-5 text-sm font-semibold text-white" style={{ background: AMBER }}>
            Draft a letter
          </Button>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:px-12 md:pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1511895426328-dc8714191011?w=1920&q=85&auto=format&fit=crop')",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(125deg, rgba(18,10,4,0.72) 0%, rgba(22,14,6,0.54) 48%, rgba(156,175,136,0.16) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Preserve words and wisdom
            </p>
            <h1 className="font-serif text-white leading-[0.95]" style={{ fontSize: "clamp(2.8rem, 6vw, 5.6rem)" }}>
              A legacy platform<br />
              built for the moments<br />
              families cannot afford to miss.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
              Start with one sentence, one memory, or one future letter. Heartloom helps you turn it into a secure vault,
              a guided delivery thread, and a human concierge when the logistics become real.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mic, title: "60-second memory", copy: "Capture a voice note and keep the tone intact." },
                { icon: FileText, title: "Practical vault", copy: "Store wills, DNRs, and account details together." },
                { icon: UserCheck, title: "Concierge support", copy: "Get help with hospice and estate logistics." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/8 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${AMBER}20` }}>
                    <item.icon className="h-5 w-5" style={{ color: AMBER }} />
                  </div>
                  <p className="font-serif text-lg font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/64">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
              {[
                "Founded by researchers from Stanford, NASA, and Berkeley",
                "Accessibility tools included",
                "Warm, family-first onboarding",
              ].map((item) => (
                <span key={item} className="rounded-full border border-white/12 bg-white/8 px-4 py-2 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.18 }}
          >
            <Card className="border-white/14 bg-[rgba(250,248,242,0.92)] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>
                    Day one interview
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-[#2d1a08] md:text-3xl">
                    Who should hear this first?
                  </h2>
                </div>
                <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${AMBER}18`, color: AMBER }}>
                  {mode === "letter" ? "Drafting a letter" : "Recording a memory"}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {RECIPIENTS.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRecipient(value)}
                    className="rounded-full border px-4 py-2 text-sm font-medium transition"
                    style={{
                      borderColor: recipient === value ? AMBER : "rgba(156,175,136,0.28)",
                      background: recipient === value ? `${AMBER}14` : "transparent",
                      color: recipient === value ? "#2d1a08" : "#5d6558",
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {!saved ? (
                  <motion.form key="draft-form" onSubmit={handleMicroAction} exit={{ opacity: 0, y: -8 }} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#2d1a08]">
                        What is one thing you want {recipient} to know forever?
                      </label>
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        rows={6}
                        placeholder={
                          mode === "letter"
                            ? "Start with a memory, a promise, or a message for a future day."
                            : "Tell us a story, a lesson, or a voice note you want preserved."
                        }
                        className="w-full rounded-3xl border border-border/70 bg-white/92 px-5 py-4 text-base leading-relaxed outline-none transition focus:border-[rgba(210,127,20,0.65)]"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={saving}
                        className="rounded-full px-7 text-white font-semibold"
                        style={{ background: AMBER, boxShadow: `0 10px 30px ${AMBER}32` }}
                      >
                        {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Draft my first future letter"}
                        {!saving && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="rounded-full px-7 font-semibold"
                        onClick={() => setMode((current) => (current === "letter" ? "memory" : "letter"))}
                      >
                        {mode === "letter" ? "Record a 60-second memory" : "Switch to letter mode"}
                      </Button>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      No account required to begin. We use the first answer to guide the interview, then bring in a human
                      concierge when the vault or logistics are needed.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="draft-success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-3xl border p-6"
                    style={{ background: `${SAGE}14`, borderColor: `${SAGE}30` }}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${SAGE}24` }}>
                        <CheckCircle className="h-6 w-6" style={{ color: SAGE }} />
                      </div>
                      <div>
                        <p className="font-serif text-xl text-[#2d1a08]">Your first draft is ready.</p>
                        <p className="text-sm text-muted-foreground">A guide can shape this into a future letter, memory, or handoff packet.</p>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: SAGE }}>
                        Preview
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                        For {recipient}, {mode === "memory" ? "record" : "write"}:
                      </p>
                      <p className="mt-1 font-serif text-lg italic text-[#2d1a08]">“{message.trim()}”</p>
                    </div>
                    <Button className="mt-5 rounded-full text-white" style={{ background: AMBER }} onClick={() => setSaved(false)}>
                      Draft another message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>
      </section>

      <GrowingTree />

      <section
        className="py-24 px-6 md:px-12"
        style={{ background: `linear-gradient(160deg, ${SAGE}10 0%, ${AMBER}08 100%)` }}
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>
              How it works
            </p>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
              Three pillars that turn sentiment into something families can use today.
            </h2>
            <div className="mt-10 grid gap-5">
              {PILLARS.map((pillar) => (
                <motion.div key={pillar.title} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 260 }}>
                  <Card className="border-border/40 p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${AMBER}16` }}>
                        <pillar.icon className="h-5 w-5" style={{ color: AMBER }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-2xl">{pillar.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {pillar.points.map((point) => (
                            <span
                              key={point}
                              className="rounded-full border px-3 py-1 text-xs font-semibold"
                              style={{ borderColor: `${SAGE}40`, color: "#49603a", background: `${SAGE}12` }}
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-border/40 bg-[#f8f4eb] p-0 shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
            <div className="border-b border-border/40 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>
                Vault architecture
              </p>
              <h3 className="mt-2 font-serif text-3xl text-[#2d1a08]">A digital safety deposit box with human context.</h3>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 rounded-3xl border border-[#d8ceb9] bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: SAGE }}>
                      Legacy Vault • $299 one-time
                    </p>
                    <p className="mt-1 font-serif text-xl text-[#2d1a08]">Vellum Nodal Matrix</p>
                  </div>
                  <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${AMBER}18`, color: AMBER }}>
                    Secure archive
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Bronze Delivery Hallmark", value: "Verified letter release" },
                    { label: "Executor lane", value: "Role-based access" },
                    { label: "Document core", value: "Wills, DNRs, account maps" },
                    { label: "Audit layer", value: "Every handoff tracked" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[#ddd3c1] bg-[#faf7f0] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: SAGE }}>
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#2d1a08]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-[#d8ceb9] bg-[#f5efe4] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: AMBER }}>
                  Concierge dashboard preview
                </p>
                <div className="space-y-3">
                  {DASHBOARD_ITEMS.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: index % 2 === 0 ? `${AMBER}16` : `${SAGE}16` }}>
                        <CheckCircle className="h-4 w-4" style={{ color: index % 2 === 0 ? AMBER : SAGE }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#2d1a08]">{item}</p>
                        <p className="text-xs text-muted-foreground">Clear next steps, not buried paperwork.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section
        className="py-24 px-6 md:px-12"
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>
              Transparent pricing
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Simple plans with no hidden death tax.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Start with a gift, move into active concierge support, or anchor the family archive with a permanent vault.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <Card
                key={plan.name}
                className="relative flex h-full flex-col p-7"
                style={plan.recommended ? { borderColor: AMBER, borderWidth: 2, boxShadow: `0 18px 45px ${AMBER}1f` } : undefined}
              >
                {plan.recommended && (
                  <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                    style={{ background: AMBER }}
                  >
                    Recommended
                  </div>
                )}
                <div className="mb-4 h-2 w-10 rounded-full" style={{ background: plan.color }} />
                <h3 className="font-serif text-2xl">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-sans text-4xl font-bold text-[#2d1a08]">{plan.price}</span>
                  <span className="pb-1 text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.desc}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: plan.color }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-7 w-full rounded-full text-white" style={{ background: plan.recommended ? AMBER : plan.color }}>
                  {plan.recommended ? "Choose Family Tier" : plan.name === "Legacy Vault" ? "Start the vault" : "Send as a gift"}
                </Button>
              </Card>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Organizations, hospice partners, and care teams can add onboarding and multi-seat support after launch.
          </p>
        </div>
      </section>

      <section
        className="py-24 px-6 md:px-12"
        style={{ background: `linear-gradient(160deg, ${AMBER}08 0%, ${SAGE}10 100%)` }}
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>
              Trust hallmarks
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Scientific rigor and compassion belong in the same room.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Heartloom is designed for families who need emotional clarity, legal clarity, and a product they can trust
              under pressure.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { name: "Stanford", note: "Founding research pedigree" },
                { name: "NASA", note: "Systems thinking and reliability" },
                { name: "Berkeley", note: "Human-centered research" },
              ].map((item) => (
                <div key={item.name} className="rounded-2xl border border-border/40 bg-background p-5 text-center shadow-sm">
                  <p className="font-serif text-2xl text-[#2d1a08]">{item.name}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border/40 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: AMBER }}>
                  Security vault
                </p>
                <h3 className="mt-2 font-serif text-3xl">What families see when they open the vault.</h3>
              </div>
              <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${SAGE}18`, color: "#49603a" }}>
                Accessibility-first
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border/40 bg-[#f7f3ea] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: `${AMBER}16` }}>
                    <Shield className="h-5 w-5" style={{ color: AMBER }} />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-[#2d1a08]">Encrypted by default</p>
                    <p className="text-xs text-muted-foreground">The vault is built for sensitive, high-stakes access.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Document audit trail",
                    "Family permissions",
                    "Executor access lane",
                    "Support handoff",
                  ].map((item) => (
                    <span key={item} className="rounded-full border border-border/50 px-3 py-1 text-xs font-semibold text-[#2d1a08]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-[#f7f3ea] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: `${SAGE}18` }}>
                    <Heart className="h-5 w-5" style={{ color: SAGE }} />
                  </div>
                  <div>
                    <p className="font-serif text-lg text-[#2d1a08]">Warm by design</p>
                    <p className="text-xs text-muted-foreground">The interface feels calm when the subject is not.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-foreground/80">
                  “They can leave behind themselves.” That promise is easier to believe when the product feels precise.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Calendar, label: "Future delivery", copy: "Milestones and open-when letters" },
                { icon: Clock, label: "Time-sensitive care", copy: "Hospice and logistics when needed" },
                { icon: BookOpen, label: "Story preservation", copy: "The family history stays usable" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/40 bg-background p-4">
                  <item.icon className="h-5 w-5" style={{ color: AMBER }} />
                  <p className="mt-3 font-serif text-lg text-[#2d1a08]">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.copy}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border bg-background px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Heartloom" className="h-10 w-auto" />
            <div>
              <span className="block font-serif text-xl leading-tight" style={{ color: "#2d1a08" }}>
                Heartloom
              </span>
              <span className="text-xs font-sans" style={{ color: SAGE }}>
                Legacy Guides
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="rounded-full px-6 font-semibold text-white" style={{ background: AMBER }}>
              Draft your first future letter
            </Button>
            <Button variant="outline" className="rounded-full px-6 font-semibold">
              View pricing
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Heartloom Legacy Guides · tryheartloom.com
        </div>
      </footer>
    </div>
  );
}
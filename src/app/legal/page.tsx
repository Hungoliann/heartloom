import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Scale, History, ShieldCheck } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import PageFooter from "@/components/layout/PageFooter";

function Section({ icon: Icon, title, children }: { icon: ComponentType<{ className?: string }>; title: string; children: ReactNode; }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-4">
        <Icon className="h-8 w-8 text-primary" />
        <h2 className="font-serif text-3xl sm:text-4xl text-primary">{title}</h2>
      </div>
      <div className="space-y-5 text-[color:var(--muted-text)] leading-relaxed text-base sm:text-lg">{children}</div>
    </section>
  );
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <section className="px-4 sm:px-6 py-20 sm:py-24 md:py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-secondary font-semibold">Foundation of Trust</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight">
              Privacy as a Sacred Heritage
            </h1>
            <p className="font-serif text-2xl sm:text-3xl italic text-[color:var(--muted-text)] max-w-4xl mx-auto leading-tight">
              &ldquo;A legacy is only as enduring as the sanctuary that protects it.&rdquo;
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[rgba(255,255,255,0.45)] p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(82,100,66,0.05)] backdrop-blur-md space-y-16">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

            <Section icon={Scale} title="Data Sovereignty">
              <p>
                Heartloom operates under a strict mandate of non-exploitation. Your narratives, memories, and personal metadata remain exclusively yours.
              </p>
              <p className="text-justify">
                We do not sell, lease, or trade your personal information. You retain the right to export, delete, or modify any part of your heirloom at any moment.
              </p>
            </Section>

            {/*
            <Section icon={Lock} title="Archival Encryption">
              <p>
                The intimacy of a voice recording or the warmth of a video message requires a level of protection that exceeds commercial standards.
              </p>
              <div className="grid md:grid-cols-2 gap-5 sm:gap-6 pt-2">
                <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-5 sm:p-6">
                  <h3 className="font-serif text-2xl text-primary mb-2">Sonic Guard</h3>
                  <p className="text-base text-[color:var(--muted-text)]">Advanced biometric hashing for voice legacy authentication.</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-5 sm:p-6">
                  <h3 className="font-serif text-2xl text-primary mb-2">Visual Vault</h3>
                  <p className="text-base text-[color:var(--muted-text)]">Multi-layer visual encryption that protects every frame of your video heritage.</p>
                </div>
              </div>
            </Section>
            */}

            <Section icon={History} title="Legacy Succession">
              <p>
                Privacy extends beyond your lifetime. Our Succession Protocol allows you to designate Heirs and Beneficiaries who will receive specific keys to your Heartloom upon a verifiable life event.
              </p>
              <ul className="space-y-4 pt-2">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">—</span>
                  <span><strong className="text-[color:var(--charcoal)]">Conditional Release:</strong> Memories are only shared when pre-defined conditions are met.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">—</span>
                  <span><strong className="text-[color:var(--charcoal)]">Concierge Mediation:</strong> Human-led review ensures transitions are handled with dignity and respect.</span>
                </li>
              </ul>
            </Section>

            <div className="pt-10 border-t border-[color:var(--border-warm)]/30 text-center space-y-5">
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-3xl text-primary">Your legacy is safe with us.</h2>
                <p className="text-[color:var(--muted-text)] max-w-2xl mx-auto">
                  If you have questions regarding the nuances of your digital stewardship, our Concierge is always standing by to provide clarity.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Contact Concierge
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDofSS2q6pyuzGb288QlYbQ_tp7X5t12GFV-jZdmSQ1CzIWo7viFLqo6UsKric4hA7_5K92ckgvO77lg1dYugzQeZLKFHJ3DAs0uyx7BKnm8xHPRvXtlzwo1cfCJ7LpLKJ8o0fBfqVrSGmxh_VUZkC0GlWSEUsCmyO7w9UG47h8phnntIu-OU4bPV3n4Ks_hbicyr2akuPjT3ay4QT-WJ9ayDnvDKG5G_9f7236lu9UXDPpeMwg_aus1mZvJ_07J4JSUHgCEIqGhEY"
              alt="Leather-bound journal and pen"
              className="h-[280px] sm:h-[360px] md:h-[480px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--parchment)] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <p className="font-serif text-2xl sm:text-3xl italic text-white drop-shadow-md">
                Preserving the texture of a life well-lived.
              </p>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

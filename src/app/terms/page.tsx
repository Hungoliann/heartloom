"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Scale, Shield, Lock, BookOpen, ScrollText, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import PageFooter from "@/components/layout/PageFooter";

const TERMS_ARTICLES = [
  { id: "digital-custodianship", label: "I. Digital Custodianship" },
  { id: "delivery-guarantees", label: "II. Delivery Guarantees" },
  { id: "family-conduct", label: "III. Family Conduct" },
  { id: "preservation", label: "IV. Preservation" },
  { id: "archival-privacy", label: "V. Archival Privacy" },
];

function Section({ id, title, icon: Icon, children }: { id?: string; title: string; icon: ComponentType<{ className?: string }>; children: ReactNode; }) {
  return (
    <section id={id} className="rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 sm:p-8 md:p-10 shadow-sm scroll-mt-36">
      <div className="flex items-center gap-3 mb-5">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="font-serif text-2xl sm:text-3xl text-primary">{title}</h2>
      </div>
      <div className="space-y-4 text-[color:var(--muted-text)] leading-relaxed">{children}</div>
    </section>
  );
}

function ArticleCard({ title, children }: { title: string; children: ReactNode; }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-5 sm:p-6 shadow-sm">
      <h3 className="font-serif text-2xl text-primary mb-3">{title}</h3>
      <div className="text-sm sm:text-base text-[color:var(--muted-text)] leading-relaxed">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  const [activeArticles, setActiveArticles] = useState<Set<string>>(
    () => new Set([TERMS_ARTICLES[0].id])
  );

  useEffect(() => {
    const sections = TERMS_ARTICLES
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const visibility = new Map<string, boolean>();
    TERMS_ARTICLES.forEach((item) => visibility.set(item.id, false));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting);
        });

        const nextActive = new Set<string>();
        for (const [id, isVisible] of visibility.entries()) {
          if (isVisible) {
            nextActive.add(id);
          }
        }

        // IV and V are rendered side-by-side in one row; highlight both together.
        if (nextActive.has("preservation") || nextActive.has("archival-privacy")) {
          nextActive.add("preservation");
          nextActive.add("archival-privacy");
        }

        if (nextActive.size > 0) {
          setActiveArticles(nextActive);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <header className="px-4 sm:px-6 pt-16 sm:pt-20 pb-14 sm:pb-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(210,230,188,0.18)_0%,transparent_35%,rgba(255,255,255,0)_100%)]" />
          <div className="max-w-4xl mx-auto relative z-10 space-y-5">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-secondary font-semibold">Legal Repository</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight italic">
              The Legacy Compact
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] max-w-3xl mx-auto leading-relaxed italic">
              An enduring agreement between Heartloom and your family lineage.
            </p>
          </div>
        </header>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-5 sm:p-6 h-fit sticky top-32">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold mb-4">Table of Articles</p>
              <ol className="space-y-3 text-sm text-[color:var(--muted-text)]">
                {TERMS_ARTICLES.map((article) => (
                  <li key={article.id}>
                    <a
                      href={`#${article.id}`}
                      className={activeArticles.has(article.id) ? "text-primary font-semibold" : "hover:text-primary transition-colors"}
                    >
                      {article.label}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="lg:col-span-9 space-y-8">
              <div className="overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDofSS2q6pyuzGb288QlYbQ_tp7X5t12GFV-jZdmSQ1CzIWo7viFLqo6UsKric4hA7_5K92ckgvO77lg1dYugzQeZLKFHJ3DAs0uyx7BKnm8xHPRvXtlzwo1cfCJ7LpLKJ8o0fBfqVrSGmxh_VUZkC0GlWSEUsCmyO7w9UG47h8phnntIu-OU4bPV3n4Ks_hbicyr2akuPjT3ay4QT-WJ9ayDnvDKG5G_9f7236lu9UXDPpeMwg_aus1mZvJ_07J4JSUHgCEIqGhEY"
                  alt="Leather journal and fountain pen"
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] sm:h-[360px] md:h-[460px] w-full object-cover"
                />
              </div>

              <Section id="digital-custodianship" title="I. The Nature of Custodianship" icon={Scale}>
                <p>
                  Heartloom acts as a non-volatile custodian of your family&apos;s digital essence. By utilizing our services, you grant us the limited right to host, store, and format your media for perpetual access.
                </p>
                <ul className="space-y-3 pt-2">
                  <li className="flex gap-3"><span className="text-primary mt-1">—</span><span>We pledge to never sell, monetize, or subject your legacy content to algorithmic advertising.</span></li>
                  <li className="flex gap-3"><span className="text-primary mt-1">—</span><span>Your digital artifacts remain your property, held in trust by our architecture.</span></li>
                </ul>
              </Section>

              <Section id="delivery-guarantees" title="II. Guaranteed Message Delivery" icon={Lock}>
                <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                  <ArticleCard title="Temporal Protocol">
                    Messages scheduled for future release are protected by a multi-signature verification process so your voice reaches the intended generation at the exact requested moment.
                  </ArticleCard>
                  <ArticleCard title="Verification of Passing">
                    For &ldquo;Last Will&rdquo; communications, Heartloom applies a compassionate verification system, requiring documentation or trusted advocate confirmation before the vault is unsealed.
                  </ArticleCard>
                </div>
              </Section>

              <Section id="family-conduct" title="III. Code of Family Conduct" icon={Shield}>
                <p className="italic">
                  The Heartloom ecosystem is a sanctuary. We require all users to adhere to the Dignity Clause.
                </p>
                <div className="grid md:grid-cols-2 gap-5 sm:gap-6 pt-2">
                  <ArticleCard title="Authenticity Mandate">
                    Users must represent themselves and their family history with honesty. Misrepresentation for malicious intent or impersonation of others is grounds for immediate vault suspension.
                  </ArticleCard>
                  <ArticleCard title="Sanctuary Protection">
                    The use of Heartloom for the distribution of harmful, hateful, or illegal content is strictly prohibited. We reserve the right to prune artifacts that violate the universal standards of human dignity.
                  </ArticleCard>
                </div>
              </Section>

              <div className="rounded-[2rem] bg-secondary text-white shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4 max-w-2xl">
                  <div className="mt-1 rounded-full bg-white/15 p-2">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl mb-2">Confused by the legalities?</h3>
                    <p className="text-white/80 leading-relaxed">
                      Our legal concierge is available to explain the Compact in plain language.
                    </p>
                  </div>
                </div>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[color:var(--card-white)] px-6 py-3 text-sm font-medium text-[color:var(--charcoal)] transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer">
                  Speak with Concierge
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Section id="preservation" title="IV. Preservation" icon={ScrollText}>
                  <p>
                    We utilize decentralized storage protocols and file-format migration to ensure your photos and videos remain playable on devices not yet invented.
                  </p>
                </Section>
                <Section id="archival-privacy" title="V. Archival Privacy" icon={Users}>
                  <p>
                    Zero-knowledge encryption means even our engineers cannot view your personal artifacts without your explicit invitation or designated heritage key.
                  </p>
                </Section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

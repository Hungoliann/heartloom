import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, History, Shield, Users, Lock, ScanLine, Sparkles } from "lucide-react";
import PageFooter from "@/components/layout/PageFooter";

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode; }) {
  return (
    <section className="rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 sm:p-8 md:p-10 shadow-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold mb-4">{eyebrow}</p>
      <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-6">{title}</h2>
      <div className="space-y-4 text-[color:var(--muted-text)] leading-relaxed">{children}</div>
    </section>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <header className="px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,230,188,0.18)_0%,transparent_55%)]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-secondary font-semibold mb-4">Methodology &amp; Research</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight italic">
              The Science of Remembrance
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[color:var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
              Bridging cognitive psychology, cryptographic security, and archival science to ensure your essence endures through the centuries.
            </p>
          </div>
        </header>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-3 rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-5 sm:p-6 sticky top-32 h-fit">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold mb-4">Table of Articles</p>
              <ol className="space-y-3 text-sm text-[color:var(--muted-text)]">
                <li className="text-primary">I. The Psychology of Legacy</li>
                <li>II. The Security of the Vault</li>
                <li>III. Longevity of Assets</li>
              </ol>
            </aside>

            <div className="lg:col-span-9 space-y-8">
              <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-center">
                <Section eyebrow="Pillar I" title="The Psychology of Legacy">
                  <p>
                    In partnership with leading researchers, we analyze the cognitive impact of legacy preservation. Our systems mirror associative memory pathways to help families retrieve shared histories naturally.
                  </p>
                  <ul className="space-y-2 pt-2">
                    <li className="flex gap-3"><span className="text-primary">—</span><span>Narrative identity reconstruction</span></li>
                    <li className="flex gap-3"><span className="text-primary">—</span><span>Emotional resonance mapping</span></li>
                    <li className="flex gap-3"><span className="text-primary">—</span><span>Cognitive offloading stability</span></li>
                  </ul>
                </Section>

                <div className="rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAefjJtMPdhJUDnX4miiONG6QNYTU4BjYhpmO4QJvmQ_cMWeXrMppBa_Pu7PbxhZRkQjHV6eVgjd1qtZw3ZNxPw44nOpgOVQgI2l_QjNcmefn-MDHLE_nf6W4O_Hjl9SKxvrCq_HnwjLXIC6ParsAVL4dJ_WNwiK5AIJC7qO6-xTB-L8ZIbMBGC3bmDSokWokbjr-rELw12YiNYQp7qqHoQAEiotKnGAueI4XAj7o3Eb_9TS7QVxYhiundOpYDHx1ZdnsMlLzI07h8"
                    alt="Fountain pen tip"
                    className="w-full h-full object-cover min-h-[320px]"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-warm)] bg-white/70 p-6 sm:p-8 md:p-10 shadow-sm">
                <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic text-secondary leading-relaxed border-l-2 border-secondary/20 pl-6">
                  “The act of recording one&apos;s history is not merely documentation; it is a neurological reinforcement of the self that transcends biological time.”
                </blockquote>
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-outline">— Stanford Medicine Behavioral Study</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] overflow-hidden shadow-sm grid md:grid-cols-2">
                  <div className="p-6 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold mb-3">Pillar II</p>
                    <h2 className="font-serif text-3xl text-primary mb-4">The Security of the Vault</h2>
                    <p className="text-[color:var(--muted-text)] leading-relaxed">
                      Implementing NASA-level AES-256 encryption with quantum-resistant keys. Memories remain shards of a private reality, reconstructed only through authorized biometric multi-sig keys.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-secondary px-4 py-2 text-white text-sm">
                      <Shield className="h-4 w-4" /> Concierge Chip
                    </div>
                  </div>
                  <div className="bg-[color:var(--surface-container-highest)] min-h-[260px]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDabs8Btv10okWxsK-OIIMZlPIjpfvptue73CcmoMoR9YNjcgtbeUt6dEQJxeOyWJ8hmB89rf1XFSVOX-oNKs6Q9qRjhwFbs-7TZr-C3rY0jZQlRj-cdOTwua_j1Fc-kOZaPHKo0Grw4Dn7laisTEsVi_uzzofFDvTdHDfNeUK-W91miW01-zW09ttCBTrp8OvYmC6NndbbEvL535BS5XYo0TYNicNdUoIzhHVjWFBl1B-GxxbHPS_JFQkWdMr_rEO3mh28x-GfRQY"
                      alt="Encrypted data cube"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <Section eyebrow="Pillar III" title="Longevity of Assets">
                  <p>
                    Our proprietary Living Format protocol ensures that digital media stays accessible regardless of evolving software standards.
                  </p>
                  <p>
                    We treat every pixel like a physical artifact, maintaining color integrity and structural metadata for centuries.
                  </p>
                </Section>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-warm)] bg-[linear-gradient(180deg,#fbf2e8_0%,#fff8f3_100%)] p-6 sm:p-8 md:p-10 text-center shadow-sm">
                <h2 className="font-serif text-3xl sm:text-4xl text-primary italic">Begin Your Everlasting Journey</h2>
                <p className="mt-4 text-[color:var(--muted-text)] max-w-2xl mx-auto leading-relaxed">
                  Explore the research behind the platform or speak to a historian who can explain how the system works in plain language.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-medium transition-opacity hover:opacity-90">
                    Explore the Research
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-secondary px-6 py-3 text-secondary font-medium transition-colors hover:bg-secondary/5">
                    Talk to a Historian
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}
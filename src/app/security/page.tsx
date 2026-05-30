import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Shield, Lock, History, ScanLine } from "lucide-react";
import type { ReactNode } from "react";
import PageFooter from "@/components/layout/PageFooter";

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary-container/70 px-4 py-1 text-xs uppercase tracking-[0.28em] text-secondary font-semibold">
      {children}
    </span>
  );
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <section className="px-4 sm:px-6 py-20 sm:py-24 md:py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <Pill>Security Architecture</Pill>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight">
              The Digital Vault Architecture
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
              A sanctuary designed for centuries, not just seasons. We preserve your legacy through an impregnable blend of high-art engineering and archival-grade protocols.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAut4s91Hb-7fSdx8be8rJ-ucl0PMLalwLld75Uf1F3JKEC-iZ6ab5cqHSaDwptH_5o7-x0MW8zJRzvHnJEH7y2YHecYY8I874-pnaKIQujjnuFBn108WOw586iqZPF-Pt2IQ2GThwTzYKsbKlar3--fCu_Vop9VidLnWuhPR4BnEZYW76jUKwN9qg1IXHegd3G2LcVJ_aopV7TJr9Sx_PM8nsTkM6DKWvyiXZHVVZYThZiyXOK9zkQx5TdyID9UWRBgEKpBDachV0"
                alt="Digital vault"
                loading="lazy"
                decoding="async"
                className="h-[260px] sm:h-[360px] md:h-[440px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--parchment)]/70 to-transparent flex items-end justify-center pb-8">
                <div className="rounded-full border border-[color:var(--border-warm)] bg-white/45 backdrop-blur-md px-5 py-3 flex items-center gap-3">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AES-256 Legacy Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20 bg-[color:var(--card-white)] border-y border-[color:var(--border-warm)]/50">
          <div className="max-w-7xl mx-auto py-16 sm:py-20">
            <div className="mb-12 text-center md:text-left">
              <h2 className="font-serif text-3xl sm:text-4xl text-primary mb-4">Foundation of Permanence</h2>
              <p className="text-[color:var(--muted-text)] max-w-2xl">Each layer of our architecture is built to withstand the passage of time and the evolution of technology.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-6 sm:gap-8">
              <div className="md:col-span-7 rounded-3xl border border-[color:var(--border-warm)] bg-white/60 backdrop-blur-sm p-6 sm:p-10 shadow-[0_30px_60px_-15px_rgba(82,100,66,0.1)]">
                <div className="flex items-start gap-4 mb-6">
                  <Shield className="h-9 w-9 text-primary mt-1" />
                  <div>
                    <h3 className="font-serif text-3xl text-primary">Archival-Grade Encryption</h3>
                    <p className="mt-4 text-[color:var(--muted-text)] leading-relaxed">
                      Your memories are sealed with proprietary multi-layered encryption protocols. Heartloom assets remain dormant until the designated legacy recipient verifies their identity.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 border-t border-[color:var(--border-warm)] pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-[color:var(--charcoal)]">Zero-Knowledge Protocol</p>
                    <p className="text-sm text-[color:var(--muted-text)]">We never see your heirlooms; only you hold the keys.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--surface-container-highest)] p-6 sm:p-10 text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white shadow-inner flex items-center justify-center mb-6">
                  <History className="h-9 w-9 text-primary" />
                </div>
                <h3 className="font-serif text-3xl text-primary mb-4">Multi-Generational Redundancy</h3>
                <p className="text-[color:var(--muted-text)] leading-relaxed mb-6">
                  Data is distributed across geographically distinct nodes, ensuring continuity across centuries.
                </p>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFDkqj39SBliImPqmEEYoBY5V8HDhGFALEF70Yvqn-BO5ThVZFTb1ffWHmnSVjtzGA5m1OcJNxgVBAXB07JcVQ-yD9yVJ4bzRdm3HZ1c6YcqLAxVcM-Vo1Um3YtgBAUH_nXXeTH0Wkw_A9PICKypiNVDkLrpHgrXhtqRdku1Tj6gZ1OUfkbjg2s9a7zQ6gdW0MZr_da4gDYNZSW2iWiF59jNfnDRZ9DQ_NqIGtvOsi6j8A71J6If-DUToaodlXiCfwKkgI70oOZD8"
                  alt="Redundancy visualization"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-44 object-cover rounded-2xl border border-[color:var(--border-warm)]"
                />
              </div>

              <div className="md:col-span-4 rounded-3xl border border-[color:var(--border-warm)] bg-secondary-container/30 p-6 sm:p-8">
                <ScanLine className="h-8 w-8 text-secondary mb-4" />
                <h4 className="font-serif text-2xl text-on-secondary-container mb-3">Cold Storage Protocols</h4>
                <p className="text-on-secondary-container/80">Disconnected from the open web, our deep freeze archives protect against modern digital decay.</p>
              </div>

              <div className="md:col-span-8 rounded-3xl border border-[color:var(--border-warm)] bg-primary-container text-on-primary-container p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h4 className="font-serif text-2xl mb-2">The Concierge Shield</h4>
                  <p className="opacity-90 leading-relaxed">
                    Every access request is manually verified by our Heartloom Concierge team during the transition phase, providing a human barrier against unauthorized breaches.
                  </p>
                </div>
                <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-2xl font-bold">99.9%</p>
                    <p className="text-xs uppercase tracking-widest">Durability</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs uppercase tracking-widest">Global Nodes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-secondary/5 blur-3xl -z-10" />
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxuiwgorHBdvimL7fvx2VLVePTuMwld0M_2qFUIZC5k7XraEYPoFgqfx1MsPiuleTfDIHgpVcLCc7xklmzYI8_yq0BWL34ARd6fAq6agfMGvJSz0QaKVGtpWDmeFgMcuwmVteTHPXYYvqORF6pM2yMK8GXdEPCzngXUIDfPalgODWY7Rh3frzmcRo8tL7JRU6VN8FpULBnj-2DMTlEJ4dF00HsCPLdey0UW-qvkUEAnDK_eaa0kqZIEjvWfCVuIgFP4SkcCP1Td2g"
                alt="Technical craftsmanship"
                loading="lazy"
                decoding="async"
                className="w-full rounded-3xl border border-[color:var(--border-warm)] shadow-2xl"
              />
              <div className="absolute bottom-6 right-6 rounded-2xl border border-[color:var(--border-warm)] bg-white/70 backdrop-blur-md px-4 py-3">
                <p className="font-serif text-2xl text-primary italic">Crafted for Eternity</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="font-serif text-3xl sm:text-4xl text-primary">How We Protect the Intangible</h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Biometric Inheritance",
                    text: "Access keys are tied to physical identity markers and multi-party verification from trusted family custodians.",
                  },
                  {
                    title: "Quantum-Resistant Ledger",
                    text: "We utilize cryptographic primitives designed to remain secure even in the event of major leaps in computing power.",
                  },
                  {
                    title: "Analog Bridge",
                    text: "For ultra-high-tier accounts, we maintain a physical backup of primary documents on archival microfilm as a final fail-safe.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center font-serif text-3xl text-primary/30">—</div>
                    <div>
                      <h3 className="font-serif text-2xl text-primary mb-2">{item.title}</h3>
                      <p className="text-[color:var(--muted-text)] leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto rounded-[2rem] bg-[color:var(--parchment)] border border-[color:var(--border-warm)] p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,242,232,0.85)_0%,rgba(255,248,243,1)_100%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="font-serif text-4xl sm:text-5xl text-primary">Secure Your Family&apos;s Future Today</h2>
              <p className="text-lg text-[color:var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
                Speak with an Architecture Specialist to design a custom preservation plan tailored to your family&apos;s unique narrative.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
                >
                  Request Security Audit
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--border-warm)] px-6 py-3 font-medium text-[color:var(--charcoal)] transition-all duration-200 hover:bg-white/60 hover:-translate-y-0.5 cursor-pointer"
                >
                  Download Architecture Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

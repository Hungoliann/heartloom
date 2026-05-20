import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import PageFooter from "@/components/layout/PageFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      {/* Hero */}
      <main className="pt-28">
        <section className="px-4 sm:px-6 py-20 sm:py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-warm)] bg-white/60 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.24em] text-[color:var(--muted-text)]">
              <Heart className="h-4 w-4 text-secondary" />
              The Heart Behind the Loom
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight">
              Some things are too important to leave unsaid.
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
              Heartloom was established to address a profound yet subtle crisis in the modern family: the erosion of intangible heritage.
              While affection remains abundant, there exists a critical scarcity of the time and the infrastructure required to preserve it.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <p className="text-lg text-[color:var(--muted-text)] leading-relaxed">
              We recognized that invaluable legacies often vanish because individuals lack the dedicated medium or the necessary
              impetus to document them. Consequently, vital narratives remain unwritten and voices are lost to time, leaving
              subsequent generations to search for a wisdom that was never formally anchored.
            </p>
            <p className="text-lg text-[color:var(--muted-text)] leading-relaxed">
              Heartloom provides the essential framework to capture these histories, ensuring that familial insights are preserved
              as a permanent resource rather than fading into a preventable obscurity.
            </p>
          </div>
        </section>

        {/* Mission Quote */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute inset-0 -rotate-1 rounded-[2rem] bg-secondary/5 border border-[color:var(--border-warm)] -z-10" />
            <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              <div className="hidden lg:block lg:col-span-1">
                <div className="h-64 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-auto" />
              </div>
              <div className="lg:col-span-11">
                <blockquote className="relative">
                  <span className="absolute -top-12 -left-4 sm:-left-8 text-primary/10 text-[96px] sm:text-[120px] leading-none pointer-events-none">&ldquo;</span>
                  <p className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl italic leading-tight text-secondary max-w-4xl">
                    We don&apos;t just preserve memories. We give people the gift of being present for moments they won&apos;t be there to witness.
                  </p>
                  <footer className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <cite className="not-italic uppercase tracking-widest text-sm text-[color:var(--muted-text)] font-medium">
                      Heartloom
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* What Heartloom Is */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="min-h-[320px] lg:min-h-[420px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj8W7iCxUo8S5ULzMbn7De1mAjE-5FVzzmHBLWAw_mB7i_4ZlBIKljcETig3SuAG37Spng6YfYLw1fnw8eHCUErzYHYe7ybor-vbZcB6nNwl975RI0WN0KGaGsf95-_tB_Fr8v2kVYwTFwTRkj3bxrY9sY0HbicmWd_FskKIWWy-8k6mWjr7YiRVQaCLTva2Q5su-dXn_ceXKFncRjuVPt7SweH07zjJ4GwGZfO0C85949BCcEjcyToVcYK53KbhXECVuO7FDYr-k"
                  alt="Heartloom design texture"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-10 md:p-14 flex flex-col justify-center space-y-6 bg-[linear-gradient(180deg,#fff8f3_0%,#f6ece3_100%)]">
                <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">A sanctuary for what matters</p>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary leading-tight">
                  A dedicated legacy and concierge platform, built for every generation.
                </h2>
                <p className="text-[color:var(--muted-text)] leading-relaxed">
                  Compose letters for a wedding day decades in the future. Preserve the warmth of your voice while recounting a
                  cherished summer memory. Organize essential documents and final wishes — so your loved ones are granted the
                  space to grieve with clarity and peace, rather than the weight of logistical confusion.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  Speak with Concierge
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: "Living History",
                text: "Every life, rich with its own unique stories and lessons, deserves to be fully honored. The wisdom and personal quirks that define us are more than memories — they are a vital inheritance.",
              },
              {
                icon: Shield,
                title: "Lasting Clarity",
                text: "By organizing essential documents and final wishes, Heartloom ensures loved ones are granted the space to grieve with clarity and peace, free from logistical confusion.",
              },
              {
                icon: Users,
                title: "Human Connection",
                text: "Technology, when guided by genuine compassion, can serve as the quiet thread that weaves the beautiful fragments of a life into a lasting and meaningful legacy.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group space-y-4 rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 sm:p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                  <div className="h-11 w-11 rounded-full border border-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-primary">{item.title}</h3>
                  <p className="text-[color:var(--muted-text)] leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CEO Quote */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute inset-0 rotate-1 rounded-[2rem] bg-primary/5 border border-[color:var(--border-warm)] -z-10" />
            <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              <div className="hidden lg:block lg:col-span-1">
                <div className="h-64 w-px bg-gradient-to-b from-transparent via-secondary/30 to-transparent mx-auto" />
              </div>
              <div className="lg:col-span-11">
                <blockquote className="relative">
                  <span className="absolute -top-12 -left-4 sm:-left-8 text-secondary/10 text-[96px] sm:text-[120px] leading-none pointer-events-none">&ldquo;</span>
                  <p className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl italic leading-tight text-primary max-w-4xl">
                    When my grandmother passed, I realized that while I had her photos, I had lost the sound of her laughter and
                    the specific wisdom only she could give. I started Heartloom so that no more family stories like her secret
                    recipes would ever be lost to time.
                  </p>
                  <footer className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-px bg-secondary" />
                    <cite className="not-italic uppercase tracking-widest text-sm text-[color:var(--muted-text)] font-medium">
                      Heartloom CEO
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Belief */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary leading-tight">
              We built the product we wished had existed.
            </h2>
            <p className="text-lg text-[color:var(--muted-text)] leading-relaxed">
              We are a small team of engineers and people who have each felt, firsthand, the ache of an untold story.
              We built Heartloom with the hope that no family would ever again have to say:
            </p>
            <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-8 sm:p-10 shadow-sm">
              <p className="font-serif text-2xl sm:text-3xl italic text-secondary leading-relaxed">
                &ldquo;I wish I had asked. I wish I had known.&rdquo;
              </p>
            </div>
            <p className="text-lg font-medium text-primary font-serif leading-relaxed">
              Your story doesn&apos;t end. With Heartloom, it continues in the people who carry it forward.
            </p>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

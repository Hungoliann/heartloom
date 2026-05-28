import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import PageFooter from "@/components/layout/PageFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">

        {/* Hero */}
        <section className="px-4 sm:px-6 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-warm)] bg-white/60 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.24em] text-[color:var(--muted-text)]">
              <Heart className="h-4 w-4 text-secondary" />
              The Heart Behind the Loom
            </div>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-primary tracking-tight">
              Some things are too important to leave unsaid.
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] max-w-prose mx-auto leading-loose">
              Heartloom was established to address a profound yet subtle crisis in the modern family: 
              the erosion of intangible heritage. While affection remains abundant, there exists a critical scarcity of the time and 
              the infrastructure required to preserve it. We recognized that invaluable legacies often vanish because individuals lack the 
              dedicated medium or the necessary impetus to document them. 
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--border-warm)] to-transparent" />
        </div>

        {/* The Problem */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold text-center">The Crisis</p>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] leading-loose max-w-prose mx-auto">
              Consequently, vital narratives remain unwritten and voices are lost to time, leaving
              subsequent generations to search for a wisdom that was never formally anchored.
            </p>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] leading-loose max-w-prose mx-auto">
              Heartloom provides the essential framework to capture these histories, ensuring that
              familial insights are preserved as a permanent resource rather than fading into a
              preventable obscurity.
            </p>
          </div>
        </section>

        {/* Mission Quote */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute inset-0 -rotate-1 rounded-[2rem] bg-secondary/5 border border-[color:var(--border-warm)] -z-10" />
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
              <div className="hidden lg:block lg:col-span-1">
                <div className="h-64 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-auto" />
              </div>
              <div className="lg:col-span-11">
                <blockquote className="relative">
                  <span className="absolute -top-12 -left-4 sm:-left-8 text-primary/10 text-[96px] sm:text-[120px] leading-none pointer-events-none select-none">&ldquo;</span>
                  <p className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-[1.2] text-secondary max-w-4xl">
                    We don&apos;t just preserve memories. We give people the gift of being present
                    for moments they won&apos;t be there to witness.
                  </p>
                  <footer className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <cite className="not-italic uppercase tracking-widest text-sm text-[color:var(--muted-text)] font-medium">
                      Heartloom
                    </cite>
                  </footer>
                  <span className="absolute -bottom-12 -right-4 sm:-right-8 text-primary/10 text-[96px] sm:text-[120px] leading-none pointer-events-none select-none">&rdquo;</span>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--border-warm)] to-transparent" />
        </div>

        {/* Platform Description + Image */}
        <section className="px-4 sm:px-6 py-24 sm:py-28">
          <div className="max-w-6xl mx-auto overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="min-h-[320px] lg:min-h-[480px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj8W7iCxUo8S5ULzMbn7De1mAjE-5FVzzmHBLWAw_mB7i_4ZlBIKljcETig3SuAG37Spng6YfYLw1fnw8eHCUErzYHYe7ybor-vbZcB6nNwl975RI0WN0KGaGsf95-_tB_Fr8v2kVYwTFwTRkj3bxrY9sY0HbicmWd_FskKIWWy-8k6mWjr7YiRVQaCLTva2Q5su-dXn_ceXKFncRjuVPt7SweH07zjJ4GwGZfO0C85949BCcEjcyToVcYK53KbhXECVuO7FDYr-k"
                  alt="Heartloom design texture"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 sm:p-10 md:p-16 flex flex-col justify-center space-y-6 bg-[linear-gradient(180deg,#fff8f3_0%,#f6ece3_100%)]">
                <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">A sanctuary for what matters</p>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
                  A dedicated legacy and concierge platform, built for every generation.
                </h2>
                <div className="space-y-4">
                  <p className="text-[color:var(--muted-text)] leading-relaxed">
                    Heartloom is a dedicated legacy and concierge platform, thoughtfully designed to be
                    accessible to every generation. It offers a sanctuary for the moments that matter
                    most: a place to compose letters for a wedding day decades in the future or to
                    preserve the warmth of your voice while recounting a cherished summer memory. By
                    organizing essential documents and final wishes, Heartloom ensures that your loved
                    ones are granted the space to grieve with clarity and peace, rather than the weight
                    of logistical confusion.
                  </p>
                  <p className="text-[color:var(--muted-text)] leading-relaxed">
                    We believe that every life, rich with its own unique stories and lessons, deserves
                    to be fully honored. The wisdom and personal quirks that define us are more than just
                    memories; they are a vital inheritance for those we love.
                  </p>
                  <p className="text-[color:var(--muted-text)] leading-relaxed">
                    Heartloom was built on the idea that technology, when guided by genuine compassion,
                    can serve as the quiet thread that weaves the beautiful fragments of a life into a
                    lasting and meaningful legacy.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:gap-3 cursor-pointer"
                >
                  Speak with Concierge
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">What We Stand For</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary">Built on three simple beliefs.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Heart,
                  title: "Living History",
                  text: "Every life, rich with its own unique stories and lessons, deserves to be fully honored. The wisdom and personal quirks that define us are more than memories, they are a vital inheritance.",
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
                  <div
                    key={item.title}
                    className="group space-y-4 rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default"
                  >
                    <div className="h-11 w-11 rounded-full border border-secondary/20 flex items-center justify-center text-secondary transition-colors duration-200 group-hover:bg-secondary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-2xl text-primary">{item.title}</h3>
                    <p className="text-[color:var(--muted-text)] leading-relaxed">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--border-warm)] to-transparent" />
        </div>

        {/* CEO Quote */}
        <section className="px-4 sm:px-6 py-24 sm:py-28">
          <div className="max-w-6xl mx-auto relative">
            <div className="absolute inset-0 -rotate-1 rounded-[2rem] bg-secondary/5 border border-[color:var(--border-warm)] -z-10" />
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
              <div className="hidden lg:block lg:col-span-1">
                <div className="h-64 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-auto" />
              </div>
              <div className="lg:col-span-11">
                <blockquote className="relative">
                  <span className="absolute -top-12 -left-4 sm:-left-8 text-primary/10 text-[96px] sm:text-[120px] leading-none pointer-events-none select-none">&ldquo;</span>
                  <p className="relative z-10 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic leading-[1.2] text-secondary max-w-4xl">
                    When my grandmother passed, I realized that while I had her photos,
                    I had lost the sound of her laughter and the specific wisdom only she could give.
                    I started Heartloom so that no more family stories like her secret
                    recipes would ever be lost to time.
                  </p>
                  <footer className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <cite className="not-italic uppercase tracking-widest text-sm text-[color:var(--muted-text)] font-medium">
                      Heartloom CEO
                    </cite>
                  </footer>
                  <span className="absolute -bottom-12 -right-4 sm:-right-8 text-primary/10 text-[96px] sm:text-[120px] leading-none pointer-events-none select-none">&rdquo;</span>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Closing */}
        <section className="px-4 sm:px-6 pb-32">
          <div className="max-w-2xl mx-auto text-center space-y-10">
            <div className="space-y-5">
              <h2 className="font-serif text-3xl sm:text-4xl text-primary leading-tight">
                The people behind the loom.
              </h2>
              <p className="text-lg text-[color:var(--muted-text)] leading-relaxed max-w-prose mx-auto">
                We are a small team of engineers, and people who have each felt, firsthand, the ache
                of an untold story. We built the product we wished had existed. And we built it with
                the hope that no family would ever again have to say:
              </p>
            </div>

            <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] px-8 py-10 shadow-sm">
              <p className="font-serif text-2xl sm:text-3xl italic text-secondary leading-relaxed">
                &ldquo;I wish I had asked. I wish I had known.&rdquo;
              </p>
            </div>

            <p className="font-serif text-xl sm:text-2xl text-primary leading-relaxed font-medium">
              Your story doesn&apos;t end.<br className="hidden sm:block" />
              With Heartloom, it continues in the people who carry it forward.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:gap-3 cursor-pointer"
            >
              Begin Your Legacy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>

      <PageFooter />
    </div>
  );
}

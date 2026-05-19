import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, History, Sparkles, Users } from "lucide-react";
import PageFooter from "@/components/layout/PageFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <section className="px-4 sm:px-6 py-20 sm:py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-warm)] bg-white/60 px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.24em] text-[color:var(--muted-text)]">
              <History className="h-4 w-4 text-secondary" />
              The Heart Behind the Loom
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight">
              About Heartloom
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] max-w-3xl mx-auto leading-relaxed">
              Heartloom was built to preserve more than files. It protects the voice, warmth, and emotional texture of a life well-lived.
            </p>
          </div>
        </section>

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
                    When families lose a loved one, they often keep the photos and letters but lose the laughter, the tone, and the wisdom behind them.
                  </p>
                  <footer className="mt-10 flex items-center gap-4">
                    <div className="w-12 h-px bg-primary" />
                    <cite className="not-italic uppercase tracking-widest text-sm text-[color:var(--muted-text)] font-medium">
                      Heartloom CEO
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: History,
                title: "Living History",
                text: "Documents tell what happened. We capture how it felt, keeping memories emotionally intact.",
              },
              {
                icon: Sparkles,
                title: "Unfailing Security",
                text: "Built on archival-grade protocols so your legacy stays protected for generations.",
              },
              {
                icon: Users,
                title: "Human Connection",
                text: "Technology is the vessel; human connection is the cargo. Every feature bridges eras.",
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
                <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">Editorial craft</p>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary leading-tight">A calm interface for difficult moments.</h2>
                <p className="text-[color:var(--muted-text)] leading-relaxed">
                  The design uses generous whitespace, warm surfaces, and gentle contrast so the experience feels wise, not hurried.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  Speak with Concierge
                  <ArrowRight className="h-4 w-4" />
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

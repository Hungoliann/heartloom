import { PenLine, Calendar, Clock, Send } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageFooter from "@/components/layout/PageFooter";

const letters = [
  {
    id: 1,
    recipient: "Sarah Jenkins-Wei",
    occasion: "On your wedding day",
    date: "Scheduled for Delivery",
    status: "Scheduled",
    preview: "My dearest Sarah, as you take this step today...",
  },
  {
    id: 2,
    recipient: "David Jenkins",
    occasion: "College Graduation",
    date: "May 15, 2026",
    status: "Scheduled",
    preview: "I always knew you would reach this milestone...",
  },
  {
    id: 3,
    recipient: "All Family",
    occasion: "General Wisdom",
    date: "Pending",
    status: "Draft",
    preview: "There are a few things I want you all to remember...",
  },
];

export default function Letters() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        {/* Header */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">Memory Vault</p>
              <h1 className="font-serif text-4xl sm:text-5xl text-primary leading-tight">Your Letters</h1>
              <p className="text-[color:var(--muted-text)] leading-relaxed">
                Words preserved in time, delivered when they matter most.
              </p>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-full px-6 py-3 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
              <PenLine className="w-4 h-4" />
              Draft New Letter
            </Button>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--border-warm)] to-transparent" />
        </div>

        {/* Letter Cards */}
        <section className="px-4 sm:px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-5">
            {letters.map((letter) => (
              <div
                key={letter.id}
                className="group rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 sm:p-8 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-serif text-xl sm:text-2xl text-primary">{letter.recipient}</h3>
                      <Badge
                        variant="outline"
                        className={
                          letter.status === "Scheduled"
                            ? "bg-secondary/10 text-secondary border-secondary/20 text-xs"
                            : "bg-[color:var(--parchment)] text-[color:var(--muted-text)] border-[color:var(--border-warm)] text-xs"
                        }
                      >
                        {letter.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-secondary flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      {letter.occasion}
                    </p>
                    <p className="text-[color:var(--muted-text)] text-sm italic border-l-2 border-[color:var(--border-warm)] pl-4 py-1 leading-relaxed">
                      &ldquo;{letter.preview}&rdquo;
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:pl-6 md:border-l md:border-[color:var(--border-warm)] md:min-w-[180px]">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-text)] font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Delivery
                      </p>
                      <p className="text-sm font-medium text-[color:var(--charcoal)]">{letter.date}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-[color:var(--border-warm)] hover:border-secondary hover:text-secondary transition-all duration-200 cursor-pointer whitespace-nowrap"
                    >
                      {letter.status === "Draft" ? "Continue Editing" : "View Details"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State CTA */}
            <div className="mt-8 p-10 sm:p-14 border border-dashed border-[color:var(--border-warm)] rounded-2xl text-center bg-[color:var(--card-white)]/50 space-y-5">
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-[color:var(--muted-text)]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl text-primary">Time is your canvas</h3>
                <p className="text-sm text-[color:var(--muted-text)] max-w-sm mx-auto leading-relaxed">
                  Draft a letter today that will be delivered decades from now. The vault preserves
                  your words perfectly until the moment they are needed.
                </p>
              </div>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                <PenLine className="w-4 h-4 mr-2" />
                Write Your First Letter
              </Button>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

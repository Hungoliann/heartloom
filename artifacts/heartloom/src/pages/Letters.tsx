import { PenLine, Calendar, Clock, Send } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Letters() {
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

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <main className="pt-28 px-6 max-w-4xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-serif text-primary">The Memory Vault</h1>
            <p className="text-muted-foreground mt-2 font-medium">Your preserved words and scheduled letters.</p>
          </div>
          <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
            <PenLine className="w-4 h-4" />
            Draft New Letter
          </Button>
        </header>

        <div className="space-y-6">
          {letters.map((letter) => (
            <Card key={letter.id} className="border-border shadow-sm bg-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif text-xl font-semibold text-primary">{letter.recipient}</h3>
                      <Badge
                        variant="outline"
                        className={
                          letter.status === "Scheduled"
                            ? "bg-secondary/10 text-secondary border-secondary/20"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {letter.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-accent flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      {letter.occasion}
                    </p>
                    <p className="text-muted-foreground mt-3 italic text-sm border-l-2 border-border pl-4 py-1">
                      "{letter.preview}"
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:items-end justify-between gap-4 md:pl-6 md:border-l md:border-border min-w-[200px]">
                    <div className="space-y-1 w-full">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Delivery
                      </p>
                      <p className="text-sm font-medium">{letter.date}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full md:w-auto">
                      {letter.status === "Draft" ? "Continue Editing" : "View Details"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="mt-12 p-8 border border-dashed border-border rounded-xl text-center bg-card/50">
            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-lg font-medium text-primary mb-2">Time is your canvas</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Draft a letter today that will be delivered decades from now. The vault preserves your words perfectly until the moment they are needed.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
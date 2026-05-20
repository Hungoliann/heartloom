import { Shield, FileText, Activity, Users, Settings, Cloud, Database, ArrowRight, ScanLine } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import PageFooter from "@/components/layout/PageFooter";

export default function Concierge() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Header */}
        <section className="px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">Estate Management</p>
              <h1 className="font-serif text-4xl sm:text-5xl text-primary">Concierge Dashboard</h1>
              <p className="text-[color:var(--muted-text)] font-medium">Security Portal and Estate Management</p>
            </div>
            <Button
              variant="outline"
              className="gap-2 bg-[color:var(--card-white)] border-[color:var(--border-warm)] hover:border-secondary hover:text-secondary transition-all duration-200 rounded-full cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Preferences
            </Button>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[color:var(--border-warm)] to-transparent" />
        </div>

        {/* Dashboard Grid */}
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Protection */}
              <Card className="border-[color:var(--border-warm)] shadow-sm bg-[color:var(--card-white)] overflow-hidden">
                <div className="h-1 w-full bg-secondary" />
                <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-2xl flex items-center justify-between">
                    Active Protection
                    <Badge className="bg-secondary/15 text-secondary hover:bg-secondary/20 font-medium">Optimal</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-6 bg-[color:var(--parchment)] rounded-xl p-6 border border-[color:var(--border-warm)]/50">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[color:var(--muted-text)] flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Medicare Benefit Optimization
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-serif text-primary">$4,240</span>
                        <span className="text-sm font-medium text-[color:var(--muted-text)]">projected savings/yr</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-sm font-medium text-[color:var(--muted-text)]">Coverage Score</p>
                        <span className="text-xl font-serif text-primary">94/100</span>
                      </div>
                      <Progress value={94} className="h-2 bg-[color:var(--border-warm)]/30" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                      Review Plan Adjustments
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Vaulted Documents */}
              <Card className="border-[color:var(--border-warm)] shadow-sm bg-[color:var(--card-white)]">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="font-serif text-2xl text-primary">Vaulted Documents</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full border-[color:var(--border-warm)] hover:border-secondary hover:text-secondary transition-all duration-200 cursor-pointer"
                  >
                    <ScanLine className="w-4 h-4" />
                    Scan New Asset
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Last Will and Testament", date: "Updated Oct 12, 2023" },
                    { name: "Medical Directive (DNR)", date: "Updated Aug 04, 2023" },
                    { name: "Financial Power of Attorney", date: "Updated Oct 12, 2023" },
                  ].map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-[color:var(--parchment)] border border-[color:var(--border-warm)] rounded-xl group hover:border-secondary/50 transition-all duration-200 cursor-default"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-secondary/10 group-hover:text-secondary transition-colors duration-200">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{doc.name}</p>
                          <p className="text-xs text-[color:var(--muted-text)]">{doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="font-mono text-[10px] tracking-widest text-[color:var(--muted-text)] bg-[color:var(--card-white)] border-[color:var(--border-warm)]">
                          SEALED
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-[color:var(--muted-text)] hover:text-primary transition-colors cursor-pointer">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Digital Will */}
              <Card className="border-transparent shadow-sm bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-3 text-primary-foreground">The Digital Will</h3>
                  <p className="text-primary-foreground/70 mb-6 max-w-lg leading-relaxed">
                    Beyond legalities, your Digital Will manages your non-tangible legacy. Direct access to social accounts, photo archives, and digital assets.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                      Edit Digital Clauses
                    </Button>
                    <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent rounded-full transition-all duration-200 cursor-pointer">
                      View Legal PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Switch Verification */}
              <Card className="border-[color:var(--border-warm)] shadow-sm bg-[color:var(--card-white)]">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center gap-2 text-primary">
                    <Shield className="w-5 h-5 text-accent" /> Switch Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between p-4 bg-[color:var(--parchment)] rounded-lg border border-[color:var(--border-warm)]">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-[color:var(--charcoal)]">Status Check</p>
                      <p className="text-xs text-[color:var(--muted-text)]">Last checked 4 Days Ago</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-serif text-primary">26</p>
                      <p className="text-[10px] uppercase tracking-wider text-[color:var(--muted-text)]">Days Remaining</p>
                    </div>
                  </div>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                    Confirm Identity Status
                  </Button>
                </CardContent>
              </Card>

              {/* Estate Access */}
              <Card className="border-[color:var(--border-warm)] shadow-sm bg-[color:var(--card-white)]">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center gap-2 text-primary">
                    <Users className="w-5 h-5 text-primary" /> Estate Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-text)] font-semibold">Primary Successor</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[color:var(--parchment)] border border-[color:var(--border-warm)] flex items-center justify-center font-serif font-bold text-primary text-sm">
                        SW
                      </div>
                      <div>
                        <p className="font-medium text-[color:var(--charcoal)]">Sarah Jenkins-Wei</p>
                        <p className="text-xs text-[color:var(--muted-text)]">Daughter · Verified</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-[color:var(--border-warm)]/60" />

                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted-text)] font-semibold">Active Permissions</p>
                    <div className="space-y-2">
                      <div className="rounded-lg border border-[color:var(--border-warm)] bg-[color:var(--parchment)] px-3 py-2 text-sm text-[color:var(--charcoal)]">
                        Full Asset Catalog
                      </div>
                      <div className="rounded-lg border border-[color:var(--border-warm)] bg-[color:var(--parchment)] px-3 py-2 text-sm text-[color:var(--charcoal)]">
                        Vault Decryption
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full rounded-full border-[color:var(--border-warm)] hover:border-secondary hover:text-secondary transition-all duration-200 cursor-pointer"
                  >
                    Appoint Secondary
                  </Button>
                </CardContent>
              </Card>

              {/* Synchronization */}
              <Card className="border-[color:var(--border-warm)] shadow-sm bg-[color:var(--card-white)]">
                <CardHeader>
                  <CardTitle className="font-serif text-xl flex items-center justify-between text-primary">
                    Synchronization
                    <span className="flex items-center gap-1.5 text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> LIVE
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--charcoal)]">
                      <Cloud className="w-4 h-4 text-[color:var(--muted-text)]" /> Cloud Archives
                    </div>
                    <span className="text-xs text-[color:var(--muted-text)]">3 Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium text-[color:var(--charcoal)]">
                      <Database className="w-4 h-4 text-[color:var(--muted-text)]" /> Memory Vault
                    </div>
                    <span className="text-xs text-[color:var(--muted-text)] font-mono">436 Heirlooms</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

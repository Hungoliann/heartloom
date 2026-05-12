import { Shield, FileText, Activity, Users, Settings, Cloud, Database, ArrowRight, ScanLine } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export default function Concierge() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <main className="pt-28 px-6 max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif text-primary">Concierge Dashboard</h1>
            <p className="text-muted-foreground mt-2 font-medium">Security Portal and Estate Management</p>
          </div>
          <Button variant="outline" className="gap-2 bg-card">
            <Settings className="w-4 h-4" />
            Preferences
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border shadow-sm bg-card overflow-hidden">
              <div className="h-1 w-full bg-secondary" />
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-2xl flex items-center justify-between">
                  Active Protection
                  <Badge className="bg-secondary/15 text-secondary hover:bg-secondary/20">Optimal</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-6 bg-background rounded-xl p-6 border border-border/50">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Medicare Benefit Optimization
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif text-primary">$4,240</span>
                      <span className="text-sm font-medium text-muted-foreground">projected savings/yr</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <p className="text-sm font-medium text-muted-foreground">Coverage Score</p>
                      <span className="text-xl font-serif text-primary">94/100</span>
                    </div>
                    <Progress value={94} className="h-2 bg-muted" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Review Plan Adjustments</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="font-serif text-2xl">Vaulted Documents</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <ScanLine className="w-4 h-4" />
                  Scan New Asset
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Last Will and Testament", date: "Updated Oct 12, 2023" },
                  { name: "Medical Directive (DNR)", date: "Updated Aug 04, 2023" },
                  { name: "Financial Power of Attorney", date: "Updated Oct 12, 2023" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-background border rounded-xl group hover:border-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="font-mono text-[10px] tracking-widest text-muted-foreground bg-card">SEALED</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-primary text-primary-foreground">
              <CardContent className="p-8">
                <h3 className="font-serif text-2xl mb-3 text-primary-foreground">The Digital Will</h3>
                <p className="text-primary-foreground/70 mb-6 max-w-lg leading-relaxed">
                  Beyond legalities, your Digital Will manages your non-tangible legacy. Direct access to social accounts, photo archives, and digital assets.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground border-0">Edit Digital Clauses</Button>
                  <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                    View Legal PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" /> Switch Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Status Check</p>
                    <p className="text-xs text-muted-foreground">Last checked 4 Days Ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-serif text-primary">26</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Days Remaining</p>
                  </div>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">Confirm Identity Status</Button>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Estate Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Primary Successor</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-serif font-bold text-primary">SW</div>
                    <div>
                      <p className="font-medium">Sarah Jenkins-Wei</p>
                      <p className="text-xs text-muted-foreground">Daughter - Verified</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Active Permissions</p>
                  <div className="space-y-2">
                    <Badge variant="outline" className="w-full justify-start font-normal text-sm py-1.5 bg-background">Full Asset Catalog</Badge>
                    <Badge variant="outline" className="w-full justify-start font-normal text-sm py-1.5 bg-background">Vault Decryption</Badge>
                  </div>
                </div>

                <Button variant="outline" className="w-full">Appoint Secondary</Button>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center justify-between">
                  Synchronization
                  <span className="flex items-center gap-1 text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> LIVE
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Cloud className="w-4 h-4 text-muted-foreground" /> Cloud Archives
                  </div>
                  <span className="text-xs text-muted-foreground">3 Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Database className="w-4 h-4 text-muted-foreground" /> Memory Vault
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">436 Heirlooms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
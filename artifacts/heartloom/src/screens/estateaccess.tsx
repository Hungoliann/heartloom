import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Building2, Leaf, ShieldCheck, PlayCircle, Landmark } from "lucide-react";
import PageFooter from "@/components/layout/PageFooter";

function Tile({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 shadow-sm">
      <div className="mb-4 h-11 w-11 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-2xl text-primary mb-2">{title}</h3>
      <p className="text-[color:var(--muted-text)] leading-relaxed">{text}</p>
    </div>
  );
}

export default function EstateAccessPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <section className="relative min-h-[78vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqPxyZeCeOHCDdvx6jkuCD3b74uAVmeLJWpGIPHqOXjmcMaAzmNNJlVkxN9wbcz_WmuGkxmTrPC3RF9aQj5dq3TkhtLfhwPn0fIFlycHTB6vclOKLdLyc6jcdVEaAs1bPjxj5SFUTYwrNT_znQlDEQvmVN9huPAE58M88wL5GKHUx7Xgg7awAYEGQfdYJtY468eDDEmaRyZfYyH56jQJAgPM99MFvtFakBAOOwE_Db5XuSgXDCKfmIRN-pQnldXytCmtejdVaW6ps"
              alt="Stone monument in willow grove"
              className="w-full h-full object-cover grayscale-[20%] sepia-[10%] brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--parchment)]/85 via-[color:var(--parchment)]/25 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-white text-xs sm:text-sm uppercase tracking-[0.2em] mb-6">
                Digital &amp; Physical Continuity
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl leading-tight text-primary mb-6">
                The Final <span className="italic">Sanctuary</span>
              </h1>
              <p className="text-lg sm:text-xl text-[color:var(--muted-text)] leading-relaxed max-w-xl">
                A bridge between the stories we leave behind and the earth that holds them. We curate physical resting places that honor the weight of a digital legacy.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition-opacity">
                  Explore Estates
                </button>
                <button className="inline-flex items-center justify-center gap-2 text-secondary font-medium hover:underline">
                  <PlayCircle className="h-5 w-5" />
                  Watch the Philosophy
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-[color:var(--surface-container-low)]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-serif text-4xl sm:text-5xl text-primary mb-4">Finding Your Place</h2>
                <p className="italic text-[color:var(--muted-text)] text-lg">A location is more than a coordinate; it is the physical echo of a soul&apos;s journey through time.</p>
              </div>
              <button className="rounded-full border border-secondary px-5 py-2 text-secondary font-medium hover:bg-secondary hover:text-white transition-colors">
                Filter by Landscape
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-3xl overflow-hidden border border-[color:var(--border-warm)] shadow-xl relative group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-Q4NvTgSFto5c0D3fG2uL8dLIk88ic40GzTPoj-SPDwkJFnvbyQhWp7DSXfxiI9MjA-Tr_bm4RuN_zXvNa3kGFSbdOfgWYLF6G9lkxVc2-cCAxEHwiPlKOjQulM0bpZfujYfP-flY7J9R4cqkAGzoQZOi1eJaAF52Ld5uUVkjMF_bx1FWWA5Ip_1zPcC9cci-Gd5RimzJi0Jalol5eB4-Eq6LATE8JCu2qVfu9pxKd10XVq8cEggRxi3Meb_Vy4S3ohIWY6lbJYo"
                  alt="Conservation estate on misty lakeside"
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 sm:p-10 text-white">
                  <h3 className="font-serif text-3xl mb-2">Highland Conservation Reserves</h3>
                  <p className="text-white/80 max-w-xl">Protected landscapes where heritage meets habitat. A living legacy that grows with each passing season.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[#ffb870] font-medium">Discover Preservation <ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>

              <div className="rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 shadow-sm">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAIiAc3syTTaJhj8Kk1r2slgmka658wcVAQfkd5vbZqI8bA8vmITn3au-wLb3GTxLA2veXyc6bTeS3UHEvcnx6ZhftDWBfsM017JdruDFEMHVH9GpYV30HKyvrTwH22dGon4xJBdmQwyYRj84RbzMglBA2OBOugWm7sEMY1rM2e5Hz59pf3haTPO2pS_eOPCzwkOv5Bollc-y0Vv-6f7jphO3-4r-2Yz-ZrR9Nf9zK4JBBufbji__fMQlI9aCrELj7ydoksvTCII0"
                  alt="Woodland memorial park"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <h3 className="font-serif text-2xl text-primary mt-5 mb-2">Ancestral Gardens</h3>
                <p className="text-[color:var(--muted-text)]">Meticulously maintained historic cemeteries that offer continuity and architectural beauty.</p>
              </div>

              <Tile icon={Leaf} title="Biodiversity Burial" text="For those whose legacy is intertwined with the restoration of the natural world." />
              <Tile icon={Landmark} title="Architectural Heritage" text="Iconic structures and mausoleums designed by world-renowned visionaries." />
              <Tile icon={ShieldCheck} title="Private Trust Access" text="Exclusive access to private family estates managed with the utmost discretion." />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-[color:var(--parchment)]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATtX0PCVTMJ2hfHDtaBqqDK6cjq6MZ20fWW80H_PtuTCB1ONdBO64YVcxjwGm4XSoPgfUTUpFoBaiQmKbDy989kayPZoixUfZAggRfgiZqTjCaAl7NsnxI-JIsVp1628P-mitoOtRv1MYqgVSBj2V7uY4AZF8jNvSnVHnT1mNlDNF8x-HFmQcqQV1CMw8mwHI6QQ7Tf07-rbpgOU6WxkI8EVUhq-ERe2lJh8fCmYIKNk0mWGRda0HRx3rbe8nrbkiGMqDxDUeADzw"
                alt="Estate and forest at twilight"
                className="w-full aspect-[4/5] object-cover rounded-3xl border border-[color:var(--border-warm)] shadow-xl"
              />
            </div>
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-primary mb-6">The Estate Partnership</h2>
              <div className="space-y-6 text-[color:var(--muted-text)]">
                <div className="flex gap-4">
                  <Building2 className="h-8 w-8 text-primary mt-1" />
                  <p>Modernize heritage estates with discreet digital integration, allowing families to interact with legacies through secure archives.</p>
                </div>
                <div className="flex gap-4">
                  <Leaf className="h-8 w-8 text-primary mt-1" />
                  <p>Unlock conservation funding through premium memorial stewardship and global legacy visibility.</p>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="h-8 w-8 text-primary mt-1" />
                  <p>Join a network of world-class estate managers preserving both human story and natural beauty.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 bg-[color:var(--surface-container)]">
          <div className="max-w-3xl mx-auto rounded-3xl border border-[color:var(--border-warm)] bg-white/70 backdrop-blur-sm p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-4xl text-primary mb-3">Curated Inquiries</h2>
              <p className="text-[color:var(--muted-text)]">For estate managers seeking a partnership of intention and grace.</p>
            </div>
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm text-[color:var(--muted-text)] mb-2">Full Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-[color:var(--border-warm)] px-0 py-2 focus:ring-0 focus:border-primary" placeholder="Julian Vane" />
                </div>
                <div>
                  <label className="block text-sm text-[color:var(--muted-text)] mb-2">Estate Name</label>
                  <input className="w-full bg-transparent border-0 border-b border-[color:var(--border-warm)] px-0 py-2 focus:ring-0 focus:border-primary" placeholder="The Willow Gables" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[color:var(--muted-text)] mb-2">Location</label>
                <input className="w-full bg-transparent border-0 border-b border-[color:var(--border-warm)] px-0 py-2 focus:ring-0 focus:border-primary" placeholder="The Cotswolds, United Kingdom" />
              </div>
              <div>
                <label className="block text-sm text-[color:var(--muted-text)] mb-2">Vision for Preservation</label>
                <textarea rows={4} className="w-full bg-transparent border-0 border-b border-[color:var(--border-warm)] px-0 py-2 resize-none focus:ring-0 focus:border-primary" placeholder="Briefly describe the legacy you wish to protect..." />
              </div>
              <div className="text-center">
                <button type="button" className="rounded-full bg-primary px-8 py-3 text-white font-medium hover:opacity-90 transition-opacity">Initiate Conversation</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Globe, Mail, Phone, Users, ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import PageFooter from "@/components/layout/PageFooter";

function ContactCard({ icon: Icon, title, value }: { icon: ComponentType<{ className?: string }>; title: string; value: string; }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 sm:p-8 shadow-sm transition-colors hover:border-secondary/60">
      <Icon className="mb-6 h-8 w-8 text-secondary" />
      <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">{title}</p>
      <p className="mt-3 font-serif text-2xl sm:text-3xl text-primary">{value}</p>
      <div className="mt-6 h-px w-12 bg-[color:var(--border-warm)] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-28">
        <section className="px-4 sm:px-6 py-20 sm:py-24 md:py-32 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-secondary font-semibold">The Guardians of Time</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight text-primary tracking-tight">
              Connect with the Curators
            </h1>
            <p className="text-lg sm:text-xl text-[color:var(--muted-text)] italic leading-relaxed">
              Our concierge desk is prepared to assist you in the delicate architecture of your family&apos;s eternal record.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <ContactCard icon={Phone} title="Private Line" value="650-760-8902" />
              <ContactCard icon={Mail} title="Correspondence" value="hey@tryheartloom.com" />
              <ContactCard icon={Globe} title="Global Presence" value="@tryheartloom" />
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-[color:var(--border-warm)] bg-[linear-gradient(180deg,#eae1d7_0%,#f6ece3_100%)] p-6 sm:p-10 md:p-14 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-32 w-32 opacity-10 pointer-events-none">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc3XkznvVSoVDuDB6VpibHJq0cOfdfyH_imEpnsPEF8aO98t1Rs2mqdmfoFYYsmt3zqsgDt6LAJ1K5SX77WvZj1JmEM5UCA4agSRmM6Ozoh_58OsR6HRM1UaIRvU0w_eS9l3Xw3sMeAtp6JuDdRgoLTohFnZYzuA8bggmIoqkwOtMrd9W6a-87mNA0EL46pvIRv9fa4Hg6D_qN0jIXKstNOceHK5xtrSqkRG454tgS5WBFF6HUgs2VSdrrsVU8bx1YmEMxzv5axng"
                  alt="Wax seal detail"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="relative z-10">
                <h2 className="font-serif text-3xl sm:text-4xl text-primary">Request an Invitation</h2>
                <p className="mt-3 max-w-2xl text-[color:var(--muted-text)] leading-relaxed">
                  Submit your details to begin a conversation with our legacy architects.
                </p>

                <form className="mt-10 space-y-8">
                  {[
                    { id: "name", label: "Full Name", type: "text" },
                    { id: "family_name", label: "Family Name / Legacy Title", type: "text" },
                    { id: "email", label: "Email Address", type: "email" },
                  ].map((field) => (
                    <div key={field.id} className="relative group">
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder=" "
                        className="peer w-full bg-transparent border-0 border-b border-[color:var(--border-warm)] px-0 py-3 font-medium text-[color:var(--charcoal)] placeholder-transparent focus:border-primary focus:ring-0"
                      />
                      <label
                        htmlFor={field.id}
                        className="absolute left-0 -top-4 text-xs uppercase tracking-[0.28em] text-outline transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-[0.28em]"
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}

                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-outline font-semibold">Preferred Method of Contact</p>
                    <div className="flex flex-wrap gap-6 text-sm text-[color:var(--charcoal)]">
                      {[
                        "Email",
                        "Phone",
                        "Concierge Visit",
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="contact_method" className="h-4 w-4 accent-[color:var(--brand-amber)]" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-outline font-semibold">Timing of Need</p>
                    <div className="flex flex-wrap gap-6 text-sm text-[color:var(--charcoal)]">
                      {[
                        "Immediate",
                        "Planning for Future",
                        "Gift for Another",
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="timing" className="h-4 w-4 accent-[color:var(--brand-amber)]" />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      id="intent"
                      rows={5}
                      placeholder=" "
                      className="peer w-full resize-none bg-transparent border-0 border-b border-[color:var(--border-warm)] px-0 py-3 font-medium text-[color:var(--charcoal)] placeholder-transparent focus:border-primary focus:ring-0"
                    />
                    <label
                      htmlFor="intent"
                      className="absolute left-0 -top-4 text-xs uppercase tracking-[0.28em] text-outline transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-[0.28em]"
                    >
                      Your Legacy Intent
                    </label>
                  </div>

                  <button className="w-full rounded-xl bg-primary-container px-6 py-4 font-semibold uppercase tracking-[0.2em] text-on-primary shadow-lg transition-transform hover:-translate-y-0.5">
                    Formal Submission
                  </button>
                </form>

                <div className="mt-12 pt-10 border-t border-[color:var(--border-warm)]/60">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="rounded-full bg-secondary-container p-3 text-secondary">
                      <Users className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">Concierge Matching</p>
                      <p className="italic text-[color:var(--muted-text)] leading-relaxed">
                        Each family is paired with a dedicated Legacy Architect whose expertise aligns with your specific heritage, geographical roots, and archival needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto overflow-hidden rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] shadow-xl relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYaRJ5WfaF15iQcHZ-vjrtbSpajWaU8lSkyUHhARddVlhhd5_dNeETHYwmT0UEa75HQz_EttgLuVJtkYIZuLHKz5FDABCFqHAc-2jzuD7wON3N2Ch10L_hhg9vD4RAKbRirmDE7Ver-18iuBAJBJggumIhPPF92qbsyyqyLsgYzwJaqKqnvbsEunMrPBe04IJt9cmZ21Uie2nvLagzlAWDcZiPp7YYcQTWBGDlkF0_pwT6jwOvLKRgJm0k9_8Rta0ICoHZ3-HoUWw"
              alt="High-end library interior"
              className="h-[280px] sm:h-[360px] md:h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--parchment)] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center px-6 w-full max-w-3xl">
              <p className="font-serif text-xl sm:text-2xl italic text-[color:var(--charcoal)] drop-shadow-sm">
                "The past is not behind us; it is the ground we walk upon."
              </p>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

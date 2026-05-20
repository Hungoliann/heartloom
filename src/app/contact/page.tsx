"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode, type ComponentType } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Globe, Mail, Phone, Users } from "lucide-react";
import PageFooter from "@/components/layout/PageFooter";

function ContactCard({ icon: Icon, title, value }: { icon: ComponentType<{ className?: string }>; title: string; value: ReactNode; }) {
  return (
    <div className="group rounded-2xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] p-6 sm:p-8 shadow-sm transition-all duration-200 hover:border-secondary/60 hover:shadow-md hover:-translate-y-0.5 cursor-default">
      <Icon className="mb-6 h-8 w-8 text-secondary" />
      <p className="text-xs uppercase tracking-[0.28em] text-secondary font-semibold">{title}</p>
      <p className="mt-3 font-serif text-2xl sm:text-3xl text-primary">{value}</p>
      <div className="mt-6 h-px w-12 bg-[color:var(--border-warm)] transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

export default function ContactPage() {
  const companyEmail = "heartloomllc@gmail.com";
  const supportEmail = "hey@tryheartloom.com";
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [contactMethod, setContactMethod] = useState("Email");
  const [timing, setTiming] = useState("Immediate");
  const [intent, setIntent] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !emailInput.trim() || !intent.trim()) {
      setSubmitState("error");
      setSubmitMessage("Please include your name, email, and a short message before submitting.");
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          familyName,
          email: emailInput,
          contactMethod,
          timing,
          intent,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Unable to send your request right now.");
      }

      setSubmitState("success");
      setSubmitMessage(result?.message || "Your request was sent. We will be in touch soon.");
      setName("");
      setFamilyName("");
      setEmailInput("");
      setContactMethod("Email");
      setTiming("Immediate");
      setIntent("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Unable to send your request right now.");
    }
  };

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
              <ContactCard
                icon={Mail}
                title="Correspondence"
                value={
                  <span className="flex flex-col gap-2">
                    <a href={`mailto:${supportEmail}`} className="text-primary underline decoration-primary/30 hover:decoration-primary">
                      {supportEmail}
                    </a>
                  </span>
                }
              />
              <ContactCard icon={Globe} title="Global Presence" value="@tryheartloom" />
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-[color:var(--border-warm)] bg-white p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-serif text-3xl sm:text-4xl text-primary">Request an Invitation</h2>
                <p className="mt-3 max-w-2xl text-[color:var(--muted-text)] leading-relaxed">
                  Submit your details to begin a conversation with our legacy architects.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                  {[
                    { id: "name", label: "Full Name", type: "text", value: name, onChange: (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value) },
                    { id: "family_name", label: "Family Name / Legacy Title", type: "text", value: familyName, onChange: (event: ChangeEvent<HTMLInputElement>) => setFamilyName(event.target.value) },
                    { id: "email", label: "Email Address", type: "email", value: emailInput, onChange: (event: ChangeEvent<HTMLInputElement>) => setEmailInput(event.target.value) },
                  ].map((field) => (
                    <div key={field.id} className="space-y-3">
                      <label htmlFor={field.id} className="block text-xs uppercase tracking-[0.28em] text-outline font-semibold pl-4">
                        {field.label}
                      </label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.label}
                        className="w-full rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] px-4 py-4 text-base text-[color:var(--charcoal)] shadow-sm transition duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-[rgba(133,97,50,0.12)] focus:outline-none"
                      />
                    </div>
                  ))}

                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-outline font-semibold pl-4">Preferred Method of Contact</p>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm text-[color:var(--charcoal)]">
                      {[
                        "Email",
                        "Phone",
                      ].map((item) => (
                        <label
                          key={item}
                          className="group flex items-center gap-3 rounded-[28px] border border-[rgba(173,141,99,0.22)] bg-[color:var(--card-white)] px-4 py-3 shadow-sm transition duration-200 hover:border-secondary hover:bg-[color:var(--surface-container-low)] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="contact_method"
                            value={item}
                            checked={contactMethod === item}
                            onChange={() => setContactMethod(item)}
                            className="h-4 w-4 accent-[color:var(--brand-amber)]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-outline font-semibold pl-4">Timing of Need</p>
                    <div className="grid sm:grid-cols-3 gap-4 text-sm text-[color:var(--charcoal)]">
                      {[
                        "Immediate",
                        "Planning for Future",
                        "Gift for Another",
                      ].map((item) => (
                        <label
                          key={item}
                          className="group flex items-center gap-3 rounded-[28px] border border-[rgba(173,141,99,0.22)] bg-[color:var(--card-white)] px-4 py-3 shadow-sm transition duration-200 hover:border-secondary hover:bg-[color:var(--surface-container-low)] cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="timing"
                            value={item}
                            checked={timing === item}
                            onChange={() => setTiming(item)}
                            className="h-4 w-4 accent-[color:var(--brand-amber)]"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="intent" className="block text-xs uppercase tracking-[0.28em] text-outline font-semibold pl-4">
                      Your Legacy Intent
                    </label>
                    <textarea
                      id="intent"
                      rows={5}
                      placeholder="Describe your intent"
                      value={intent}
                      onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setIntent(event.target.value)}
                      className="w-full resize-none rounded-3xl border border-[color:var(--border-warm)] bg-[color:var(--card-white)] px-4 py-4 text-base text-[color:var(--charcoal)] shadow-sm transition duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-[rgba(133,97,50,0.12)] focus:outline-none"
                    />
                  </div>

                  {submitMessage ? (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
                        submitState === "success"
                          ? "border-secondary/30 bg-secondary-container text-secondary"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {submitMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitState === "sending"}
                    className="w-full rounded-xl bg-primary px-6 py-4 font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {submitState === "sending" ? "Sending..." : "Send Request"}
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
              src="/contactphoto.jpg"
              alt="High-end library interior"
              className="h-[280px] sm:h-[360px] md:h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--parchment)] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center px-6 w-full max-w-3xl">
              <p className="font-serif text-xl sm:text-2xl italic text-[color:var(--charcoal)] drop-shadow-sm">
                &ldquo;Your history is not an archive. It is a gift to everyone who comes after you.&rdquo;
              </p>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  );
}

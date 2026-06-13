"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import PageFooter from "@/components/layout/PageFooter";

type FaqItem = {
  q: string;
  a: string;
};

type FaqCategory = {
  category: string;
  items: FaqItem[];
};

const faqs: FaqCategory[] = [
  {
    category: "About Heartloom",
    items: [
      {
        q: "What is Heartloom?",
        a: "Heartloom is a legacy and concierge platform that helps people preserve their voice, memories, and important documents for the people they love. You can write letters to be delivered years from now, record audio and video memories, organize your legal and financial documents, and build a private family archive.",
      },
      {
        q: "Who is Heartloom for?",
        a: "Heartloom is for anyone who wants to be intentional about what they leave behind. Many of our users are adults setting things up for themselves. Others are adult children helping a parent get organized. We built the product to be simple enough for any age and meaningful enough for any family.",
      },
      {
        q: "Is Heartloom affiliated with a hospice or legal organization?",
        a: "No. Heartloom is an independent platform. We partner with hospice organizations, elder law attorneys, and care providers to make our guidance resources as accurate and useful as possible, but we are not a healthcare or legal service. For medical or legal advice, please consult a qualified professional.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        q: "What does Heartloom offer?",
        a: "Heartloom has four core features. Future Letters let you write messages scheduled for a specific date or milestone, such as a grandchild's graduation or a partner's next birthday. Living Legacy lets you record audio and video memories guided by thoughtful prompts. The Family Vault is a secure place to store your will, healthcare directives, insurance policies, and other important documents. And our Concierge service connects you with a real person who can help you navigate the practical and emotional side of legacy planning.",
      },
      {
        q: "How does the Future Letters feature work?",
        a: "You write a letter inside the app and choose when it should be delivered. You can set a specific calendar date, or link it to a milestone like a wedding day or the birth of a grandchild. When the time comes, Heartloom delivers the letter to the recipient you chose. Letters can be written, audio, or video.",
      },
      {
        q: "What is the Legacy Concierge?",
        a: "The Legacy Concierge is a human support service available on select plans. Our concierges can help you think through what to record, walk you through organizing your documents, explain hospice and care options in plain language, and connect you with the right professionals when needed. Think of them as a patient, knowledgeable guide for a process that can feel overwhelming.",
      },
      {
        q: "Can I store legal documents in the Vault?",
        a: "Yes. The Vault is designed to hold your will, healthcare directives, DNR instructions, insurance policies, property documents, and personal wishes. Documents are encrypted and can only be accessed by the people you authorize. Heartloom is not a legal service and does not provide legal advice, but we make it easy to store and share the documents your family will need.",
      },
    ],
  },
  {
    category: "Launch & Availability",
    items: [
      {
        q: "When does Heartloom launch?",
        a: "Heartloom launches on May 25th. You can join the waitlist at heartloom.com to be among the first to access the app when it goes live.",
      },
      {
        q: "Will Heartloom be available on iPhone and Android?",
        a: "Yes. Heartloom will be available on both iOS and Android at launch. A web version is also planned for users who prefer to work from a desktop or laptop.",
      },
      {
        q: "Is Heartloom available outside the United States?",
        a: "At launch, Heartloom is available in the United States. We are actively working to expand to Canada, the United Kingdom, and Australia in the months that follow.",
      },
    ],
  },
  {
    category: "Pricing & Plans",
    items: [
      {
        q: "Is Heartloom free to use?",
        a: "Yes. Heartloom has a free plan that includes one Future Letter, one recording, and access to the basic Vault. You can start for free with no credit card required.",
      },
      {
        q: "How is Heartloom priced?",
        a: "Heartloom has three monthly memberships, a lifetime option, and a set of one-time projects. You can choose a recurring membership, pay once for lifetime access, or commission a hands-on project for your family. Most families land on Plus, and if you're managing the legacy of multiple family members, Family is worth the step up.",
      },
      {
        q: "What are the monthly memberships?",
        a: "There are three: Essentials ($9.99/mo), Plus ($15.99/mo), and Family ($23.99/mo). Essentials gets you a secure digital vault for your key documents, guided checklists for hospice and the days after a death, simple story capture, and a Digital Legacy Blueprint your heirs can access. Plus adds guided legal and medical wishes workflows, weekly story prompts for one storyteller, memory boards, and an Heir Access seat with a guided handoff. Family adds up to three storytellers, a shared family space for collaborating, three Heir Access seats, and a dedicated onboarding session with priority support.",
      },
      {
        q: "Is there a one-time payment option?",
        a: "Yes. If you'd rather pay once, the Lifetime membership covers all Family features for a one-time fee of $499.99–$699.99.",
      },
      {
        q: "Do you offer one-time projects?",
        a: "Yes, for families who want something made by hand. The Heartloom Storybook ($149.99–$199.99) turns a life story, family recipes, or service memories into a full-color hardcover book. The Voice & Video Legacy project ($249.99–$399.99) includes structured recorded interviews, an edited highlight reel, and all your raw files. Concierge Setup & Organizing ($299.99–$599.99) is a remote white-glove service where we gather your documents, photos, and accounts and build out your digital vault for you.",
      },
      {
        q: "Do you offer plans for hospice organizations or care teams?",
        a: "Yes. We offer white-label licensing for hospice agencies, elder law firms, and care management organizations. Pricing is custom based on organization size. Contact us at heartloom.com to learn more.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. Monthly plans can be cancelled at any time. Your content, letters, and recordings remain accessible for 90 days after cancellation so you can export everything before it is removed.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Who can see my letters and recordings?",
        a: "Only you and the people you explicitly invite or designate as recipients. Heartloom does not share your content with third parties. Vault documents are encrypted and require biometric or password authentication to access.",
      },
      {
        q: "What happens to my content if Heartloom ever closes?",
        a: "We take long-term access seriously. All users receive 12 months notice if the platform is ever discontinued, and you can export your full archive, including letters, recordings, and documents, at any time. Legacy Vault plan holders receive additional perpetual storage guarantees.",
      },
      {
        q: "Is my data sold to advertisers?",
        a: "No. Heartloom does not sell your data. We do not run ads. Your memories and documents are yours.",
      },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const toggle = (key: string) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const categories = ["All", ...faqs.map((f) => f.category)];
  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[color:var(--parchment)] text-[color:var(--charcoal)]">
      <Navbar />

      <main className="pt-16 sm:pt-20">
        {/* Header band */}
        <div className="bg-[color:var(--charcoal)] px-6 pt-20 pb-16 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[color:var(--brand-amber)] mb-4">
            Help Center
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[52px] font-bold leading-tight text-[color:var(--parchment)] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-serif italic text-lg text-[color:var(--brand-sage)] max-w-md mx-auto leading-relaxed">
            Everything you need to know about Heartloom, in one place.
          </p>
        </div>

        {/* Category filter */}
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-6 pt-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={`flex-shrink-0 whitespace-nowrap rounded-full px-[18px] py-[7px] font-sans text-[13px] font-medium transition-all duration-200 cursor-pointer hover:opacity-80 ${
                  isActive
                    ? "bg-[color:var(--brand-amber)] text-[color:var(--parchment)]"
                    : "bg-[color:var(--parchment-2)] text-[color:var(--muted-text)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ sections */}
        <div className="mx-auto max-w-3xl px-6 pt-4 pb-20">
          {filtered.map((section) => (
            <div key={section.category} className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-5 w-[3px] rounded-full bg-[color:var(--brand-amber)]" />
                <h2 className="font-serif text-lg font-bold text-[color:var(--charcoal)]">
                  {section.category}
                </h2>
              </div>

              <div className="flex flex-col gap-2">
                {section.items.map((item, idx) => {
                  const key = `${section.category}-${idx}`;
                  const isOpen = Boolean(open[key]);
                  return (
                    <div
                      key={key}
                      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                        isOpen
                          ? "border-[color:var(--brand-amber)]/30 bg-[color:var(--parchment-2)]"
                          : "border-[color:var(--border-warm)] bg-[color:var(--card-white)] hover:bg-[color:var(--parchment-2)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-[18px] text-left cursor-pointer"
                      >
                        <span className="flex-1 font-serif text-base leading-snug text-[color:var(--charcoal)]">
                          {item.q}
                        </span>
                        <span
                          className="shrink-0 text-lg leading-none text-[color:var(--brand-amber)] transition-transform duration-200"
                          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.25, ease: "easeOut" },
                            }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5">
                              <div className="mb-4 h-px w-full bg-[color:var(--border-warm)]" />
                              <p className="font-sans text-[15px] leading-[1.8] text-[color:var(--muted-text)]">
                                {item.a}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact footer card */}
          <div className="mt-4 rounded-3xl bg-[linear-gradient(135deg,var(--charcoal),#5a3e28)] p-7 text-center">
            <p className="font-serif text-xl text-[color:var(--parchment)] mb-2">
              Still have questions?
            </p>
            <p className="font-serif italic text-sm text-[color:var(--brand-sage)] mb-5 leading-relaxed">
              We are here. Reach out anytime and a real person will respond.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-[color:var(--brand-amber)] px-7 py-3 font-sans text-sm font-semibold text-[color:var(--charcoal)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

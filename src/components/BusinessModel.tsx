import { Square } from "lucide-react";

const lightFeature =
  "flex items-start gap-3 text-sm text-[color:var(--charcoal)]";
const lightIcon = "w-4 h-4 mt-0.5 text-[color:var(--muted-text)] shrink-0";
const darkFeature = "flex items-start gap-3 text-sm text-[color:var(--parchment)]";
const darkIcon = "w-4 h-4 mt-0.5 text-[color:var(--brand-amber)] shrink-0";

export function BusinessModel() {
  return (
    <section className="py-24 md:py-32 px-6 bg-[color:var(--card-white)]">
      <div className="max-w-6xl mx-auto rounded-3xl bg-[color:var(--charcoal)] p-8 sm:p-12 md:p-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-amber)]">
          Heartloom Hub
        </p>
        <h2 className="mt-3 text-3xl md:text-5xl font-serif text-[color:var(--parchment)]">
          Memberships for every stage.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-[color:var(--parchment)]/60">
          Start free, then choose a monthly plan that grows with your family —
          plus optional one-time projects when you want something made by hand.
        </p>

        {/* Free tier */}
        <div className="mt-12 rounded-2xl bg-[color:var(--parchment)] p-6 sm:p-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-md">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-serif text-[color:var(--charcoal)]">
                Heartloom Free
              </h3>
              <span className="rounded-full bg-[color:var(--brand-sage)]/20 px-3 py-1 text-xs font-medium text-[color:var(--charcoal)]">
                No card needed
              </span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--muted-text)]">
              A no-cost way to start getting organized and capture your first
              story.
            </p>
            <div className="mt-4">
              <span className="text-5xl font-serif text-[color:var(--charcoal)]">$0</span>
              <span className="text-[color:var(--muted-text)]"> /forever</span>
            </div>
          </div>
          <ul className="space-y-4 lg:max-w-sm">
            <li className={lightFeature}>
              <Square className={lightIcon} /> Starter digital vault for a few of
              your key documents
            </li>
            <li className={lightFeature}>
              <Square className={lightIcon} /> Preview of the hospice and
              after-loss checklists
            </li>
            <li className={lightFeature}>
              <Square className={lightIcon} /> Start one story with a few guided
              prompts
            </li>
          </ul>
        </div>

        {/* Subscription tiers */}
        <div className="mt-6 grid md:grid-cols-3 gap-6 items-stretch">
          {/* Essentials */}
          <div className="rounded-2xl bg-[color:var(--parchment)] p-8 flex flex-col">
            <h3 className="text-xl font-serif text-[color:var(--charcoal)]">
              Heartloom Essentials
            </h3>
            <p className="mt-2 text-sm text-[color:var(--muted-text)]">
              For getting organized with clear, basic guidance.
            </p>
            <div className="mt-5">
              <span className="text-5xl font-serif text-[color:var(--charcoal)]">$9.99</span>
              <span className="text-[color:var(--muted-text)]"> /month</span>
            </div>
            <ul className="mt-7 space-y-4">
              <li className={lightFeature}>
                <Square className={lightIcon} /> Secure digital vault for wills,
                trusts, insurance, account lists & DNRs
              </li>
              <li className={lightFeature}>
                <Square className={lightIcon} /> Guided checklists for hospice and
                the first 72 hours & 30 days
              </li>
              <li className={lightFeature}>
                <Square className={lightIcon} /> Simple story capture with text
                prompts, voice recording & photo tagging
              </li>
              <li className={lightFeature}>
                <Square className={lightIcon} /> 1 Digital Legacy Blueprint your
                heirs can access
              </li>
            </ul>
          </div>

          {/* Plus - Featured */}
          <div className="rounded-2xl bg-[color:var(--charcoal)] border-2 border-[color:var(--brand-amber)] p-8 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-serif text-[color:var(--parchment)]">
                Heartloom Plus
              </h3>
              <span className="rounded-full bg-[color:var(--brand-amber)] px-3 py-1 text-xs font-medium text-[color:var(--charcoal)]">
                Most popular
              </span>
            </div>
            <p className="mt-2 text-sm text-[color:var(--parchment)]/60">
              Our most holistic plan, where most families land.
            </p>
            <div className="mt-5">
              <span className="text-5xl font-serif text-[color:var(--brand-amber)]">$15.99</span>
              <span className="text-[color:var(--parchment)]/60"> /month</span>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-[color:var(--parchment)]/50">
              Everything in Essentials, plus
            </p>
            <ul className="mt-4 space-y-4">
              <li className={darkFeature}>
                <Square className={darkIcon} /> Guided legal & medical wishes
                workflows with exportable summaries
              </li>
              <li className={darkFeature}>
                <Square className={darkIcon} /> Advanced story capture with weekly
                prompts, photos & audio for one storyteller
              </li>
              <li className={darkFeature}>
                <Square className={darkIcon} /> Memory boards for recipes, photo
                collections & letters
              </li>
              <li className={darkFeature}>
                <Square className={darkIcon} /> 1 Heir Access seat with a guided
                handoff experience
              </li>
            </ul>
          </div>

          {/* Family */}
          <div className="rounded-2xl bg-[color:var(--parchment)] p-8 flex flex-col">
            <h3 className="text-xl font-serif text-[color:var(--charcoal)]">
              Heartloom Family
            </h3>
            <p className="mt-2 text-sm text-[color:var(--muted-text)]">
              For families with multiple stakeholders or aging parents.
            </p>
            <div className="mt-5">
              <span className="text-5xl font-serif text-[color:var(--charcoal)]">$23.99</span>
              <span className="text-[color:var(--muted-text)]"> /month</span>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-[color:var(--muted-text)]">
              Everything in Plus, plus
            </p>
            <ul className="mt-4 space-y-4">
              <li className={lightFeature}>
                <Square className={lightIcon} /> Up to 3 storytellers, like two
                parents and a grandparent
              </li>
              <li className={lightFeature}>
                <Square className={lightIcon} /> Shared family space to upload &
                collaborate together
              </li>
              <li className={lightFeature}>
                <Square className={lightIcon} /> 3 Heir Access seats
              </li>
              <li className={lightFeature}>
                <Square className={lightIcon} /> Priority support with a dedicated
                onboarding session
              </li>
            </ul>
          </div>
        </div>

        {/* Lifetime */}
        <div className="mt-6 rounded-2xl border border-[color:var(--parchment)]/15 bg-[color:var(--parchment)]/5 p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-serif text-[color:var(--parchment)]">
              Lifetime membership
            </h3>
            <p className="mt-1 text-sm text-[color:var(--parchment)]/60">
              One-and-done for those who prefer to set it once. Includes Family
              features for life.
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-3xl font-serif text-[color:var(--brand-amber)]">$499.99–$699.99</span>
            <span className="text-[color:var(--parchment)]/60"> one-time</span>
          </div>
        </div>

        {/* One-time projects */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--brand-amber)]">
            One-time projects
          </p>
          <h3 className="mt-3 text-2xl md:text-3xl font-serif text-[color:var(--parchment)]">
            Heirlooms made to order.
          </h3>

          <div className="mt-8 grid md:grid-cols-3 gap-6 items-stretch">
            {/* Storybook */}
            <div className="rounded-2xl bg-[color:var(--parchment)] p-8 flex flex-col">
              <h4 className="text-lg font-serif text-[color:var(--charcoal)]">
                Heartloom Storybook
              </h4>
              <div className="mt-3">
                <span className="text-3xl font-serif text-[color:var(--charcoal)]">$149.99–$199.99</span>
                <span className="text-[color:var(--muted-text)]"> /project</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className={lightFeature}>
                  <Square className={lightIcon} /> A defined project, like a life
                  story, family recipes or service stories
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> 12–20 curated prompts with
                  guidance
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> Light editorial clean-up &
                  layout
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> One full-color hardcover, up to
                  200–250 pages
                </li>
              </ul>
              <p className="mt-auto pt-6 text-sm italic text-[color:var(--muted-text)]">
                Extra copies $49.99–$79.99 each
              </p>
            </div>

            {/* Voice & Video */}
            <div className="rounded-2xl bg-[color:var(--parchment)] p-8 flex flex-col">
              <h4 className="text-lg font-serif text-[color:var(--charcoal)]">
                Voice & Video Legacy
              </h4>
              <div className="mt-3">
                <span className="text-3xl font-serif text-[color:var(--charcoal)]">$249.99–$399.99</span>
                <span className="text-[color:var(--muted-text)]"> /project</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className={lightFeature}>
                  <Square className={lightIcon} /> Structured interviews via video
                  or audio, 60–90 minutes across sessions
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> An edited 10–20 minute highlight
                  reel
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> All of your raw recording files
                  to keep
                </li>
              </ul>
            </div>

            {/* Concierge Setup */}
            <div className="rounded-2xl bg-[color:var(--parchment)] p-8 flex flex-col">
              <h4 className="text-lg font-serif text-[color:var(--charcoal)]">
                Concierge Setup & Organizing
              </h4>
              <div className="mt-3">
                <span className="text-3xl font-serif text-[color:var(--charcoal)]">$299.99–$599.99</span>
                <span className="text-[color:var(--muted-text)]"> /project</span>
              </div>
              <ul className="mt-6 space-y-4">
                <li className={lightFeature}>
                  <Square className={lightIcon} /> Remote white-glove gathering of
                  documents, photos & accounts
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> A built-out first pass of your
                  digital vault
                </li>
                <li className={lightFeature}>
                  <Square className={lightIcon} /> Your digital estate checklist,
                  ready to go
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

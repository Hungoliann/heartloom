import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="bg-[color:var(--card-white)] border-t border-[color:var(--border-warm)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col lg:flex-row justify-between gap-10">
        <div className="space-y-3 max-w-sm">
          <div className="font-serif text-2xl sm:text-3xl font-semibold text-primary tracking-tight">Heartloom.</div>
          <p className="text-sm sm:text-base text-[color:var(--muted-text)] leading-relaxed">
            Preserving the human thread. Secure, dignified legacy planning for the ones you love most.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 text-sm">
          <div className="space-y-4">
            <h4 className="font-semibold text-[color:var(--charcoal)]">Platform</h4>
            <ul className="space-y-2 text-[color:var(--muted-text)]">
              <li><Link href="/concierge" className="hover:text-accent transition-colors">The Concierge</Link></li>
              <li><Link href="/letters" className="hover:text-accent transition-colors">Memory Vault</Link></li>
              <li><Link href="/estate-access" className="hover:text-accent transition-colors">Estate Access</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-[color:var(--charcoal)]">Company</h4>
            <ul className="space-y-2 text-[color:var(--muted-text)]">
              <li><Link href="/research" className="hover:text-accent transition-colors">Research Methodology</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-[color:var(--charcoal)]">Legal</h4>
            <ul className="space-y-2 text-[color:var(--muted-text)]">
              <li><Link href="/legal" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-accent transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 text-xs text-[color:var(--muted-text)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[color:var(--border-warm)] pt-6">
        <p>(c) {new Date().getFullYear()} Heartloom. All rights reserved.</p>
        <p>Built with care for the future.</p>
      </div>
    </footer>
  );
}

export default PageFooter;

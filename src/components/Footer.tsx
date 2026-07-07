import { Phone, Mail, Facebook, Instagram, Linkedin, MapPin, Heart } from 'lucide-react';

const quickLinks = [
  { label: 'About SABSA', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'The Science', href: '#science' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact Us', href: '#contact' },
];

const programs = [
  'Focus & Attention',
  'Emotional Regulation',
  'Elderly Balance',
  'Teen Boot Camps',
  'Sensory Processing',
  'Special Schools',
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="relative bg-[#07111f] border-t border-[rgba(255,255,255,0.07)]" style={{ zIndex: 2 }}>
      {/* Top gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent opacity-30" />

      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/images/sabsa-logo.jpg" alt="SABSA Logo" className="w-10 h-10 rounded-full object-cover bg-white" />
              <div>
                <span className="font-bold text-white text-[1.1rem] block leading-tight">SABSA</span>
                <span className="font-mono text-[0.55rem] text-[rgba(255,255,255,0.45)] tracking-[0.12em]">SA BRAIN SENSORY ACTIVATION</span>
              </div>
            </div>
            <p className="text-[rgba(255,255,255,0.5)] text-[0.8rem] leading-[1.7] mb-5">
              A drug-free, evidence-based neuroplasticity programme supporting individuals across South Africa to unlock their brain's full potential.
            </p>
            {/* NPO badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(6,182,212,0.2)] bg-[rgba(6,182,212,0.06)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
              <span className="font-mono text-[0.6rem] tracking-widest text-[#06B6D4]">NPO 322-984-NPO</span>
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <span className="font-mono text-[0.65rem] tracking-[0.18em] text-[#06B6D4] block mb-5">NAVIGATION</span>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-[rgba(255,255,255,0.6)] text-[0.875rem] hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-[rgba(6,182,212,0.4)] group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Programs */}
          <div>
            <span className="font-mono text-[0.65rem] tracking-[0.18em] text-[#06B6D4] block mb-5">PROGRAMS</span>
            <ul className="flex flex-col gap-2.5">
              {programs.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => scrollTo('#programs')}
                    className="text-[rgba(255,255,255,0.6)] text-[0.875rem] hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-[rgba(6,182,212,0.4)] group-hover:w-4 transition-all duration-200" />
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <span className="font-mono text-[0.65rem] tracking-[0.18em] text-[#06B6D4] block mb-5">CONTACT</span>
            <div className="flex flex-col gap-3 mb-5">
              <a href="tel:+27685707475" className="flex items-center gap-3 text-[rgba(255,255,255,0.65)] text-[0.875rem] hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center shrink-0 group-hover:border-[rgba(6,182,212,0.5)] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
                </div>
                +27 68 570 7475
              </a>
              <a href="mailto:info@brainsensory.co.za" className="flex items-center gap-3 text-[rgba(255,255,255,0.65)] text-[0.875rem] hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center shrink-0 group-hover:border-[rgba(6,182,212,0.5)] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#06B6D4]" />
                </div>
                info@brainsensory.co.za
              </a>
              <div className="flex items-center gap-3 text-[rgba(255,255,255,0.45)] text-[0.875rem]">
                <div className="w-8 h-8 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#06B6D4]" />
                </div>
                Gauteng, Western Cape, KZN
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[rgba(255,255,255,0.5)] hover:text-white hover:border-[rgba(6,182,212,0.4)] hover:bg-[rgba(6,182,212,0.08)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.05)] py-5">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] text-[rgba(255,255,255,0.3)]">
            © 2026 SABSA — SA Brain Sensory Activation Center | NPO 322-984-NPO
          </p>
          <p className="flex items-center gap-1.5 font-mono text-[0.65rem] text-[rgba(255,255,255,0.25)]">
            Made with <Heart className="w-3 h-3 text-[#E63946]" /> in South Africa
          </p>
        </div>
      </div>
    </footer>
  );
}

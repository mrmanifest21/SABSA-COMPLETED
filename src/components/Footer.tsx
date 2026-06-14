import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1628] border-t border-[rgba(255,255,255,0.08)]" style={{ zIndex: 2 }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Left - Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/sabsa-logo.jpg"
                alt="SABSA Logo"
                className="w-9 h-9 rounded-full object-cover bg-white"
              />
              <div>
                <span className="font-sans font-bold text-lg text-white block leading-tight">
                  SABSA
                </span>
                <span className="font-mono text-[0.6rem] text-[rgba(255,255,255,0.5)] tracking-[0.1em]">
                  SA Brain Sensory Activation Center
                </span>
              </div>
            </div>
            <p className="font-mono text-[0.75rem] text-[rgba(255,255,255,0.5)] mt-4">
              &copy; 2026 SABSA. All rights reserved.
            </p>
          </div>

          {/* Center - Founder */}
          <div>
            <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[#06B6D4] block mb-3">
              FOUNDER
            </span>
            <p className="font-semibold text-white">E. S. Mashishi</p>
            <p className="text-[0.875rem] text-[rgba(255,255,255,0.7)] mt-1">
              Professional Exercise Science / Therapist
            </p>
            <p className="text-[0.8rem] text-[rgba(255,255,255,0.5)] mt-0.5">
              Master of Physiology / Anatomy and Human Movement
            </p>
          </div>

          {/* Right - Contact */}
          <div>
            <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[#06B6D4] block mb-3">
              CONTACT
            </span>
            <div className="space-y-2">
              <a
                href="tel:+27685707475"
                className="flex items-center gap-2 text-[0.875rem] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +27 68 570 7475
              </a>
              <a
                href="mailto:info@brainsensory.co.za"
                className="flex items-center gap-2 text-[0.875rem] text-[rgba(255,255,255,0.7)] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@brainsensory.co.za
              </a>
            </div>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="text-[rgba(255,255,255,0.7)] hover:text-[#2563EB] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[rgba(255,255,255,0.7)] hover:text-[#2563EB] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[rgba(255,255,255,0.7)] hover:text-[#2563EB] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-[rgba(255,255,255,0.05)] py-5 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p className="font-mono text-[0.7rem] text-[rgba(255,255,255,0.3)]">
            SA Brain Sensory Activation Center | NPO 322-984-NPO
          </p>
        </div>
      </div>
    </footer>
  );
}

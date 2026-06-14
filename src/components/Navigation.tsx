import { useEffect, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'SCIENCE', href: '#science' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          },
          { threshold: 0.3 }
        );
        obs.observe(el);
        observers.push(obs);
      }
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,22,40,0.8)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.08)]'
            : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group">
            <img
              src="/images/sabsa-logo.jpg"
              alt="SABSA Logo"
              className="w-10 h-10 rounded-full object-cover bg-white group-hover:shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all duration-300"
            />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[1.25rem] text-white leading-tight tracking-tight">
                SABSA
              </span>
              <span className="font-mono text-[0.6rem] text-[rgba(255,255,255,0.7)] tracking-[0.12em] leading-none hidden sm:block">
                SA BRAIN SENSORY ACTIVATION CENTER | NPO
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative font-medium text-[0.875rem] tracking-[0.02em] transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.7)] hover:text-white hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#2563EB] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#E63946] text-white font-semibold text-[0.875rem] tracking-[0.02em] rounded-full px-7 py-2.5 hover:brightness-110 hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] transition-all duration-300"
            >
              GET STARTED
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(10,22,40,0.95)] backdrop-blur-[20px] flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-white font-medium text-xl tracking-[0.02em] opacity-0 animate-[fade-up_0.5s_ease-out_forwards]"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-4 bg-[#E63946] text-white font-semibold text-[0.875rem] tracking-[0.02em] rounded-full px-8 py-3 hover:brightness-110 transition-all duration-300 opacity-0 animate-[fade-up_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${navLinks.length * 0.08}s` }}
          >
            GET STARTED
          </button>
        </div>
      )}
    </>
  );
}

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 80);

      // Progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
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
          ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
          { threshold: 0.25 }
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
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-[rgba(255,255,255,0.04)]">
        <div
          className="h-full bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#06B6D4] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(7,17,31,0.85)] backdrop-blur-[24px] border-b border-[rgba(255,255,255,0.07)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
        style={{ height: 68 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('#home')} className="flex items-center gap-3 group shrink-0">
            <img
              src="/images/sabsa-logo.jpg"
              alt="SABSA Logo"
              className="w-9 h-9 rounded-full object-cover group-hover:shadow-[0_0_16px_rgba(6,182,212,0.5)] transition-all duration-300"
            />
            <div className="flex flex-col">
              <span className="font-bold text-[1.2rem] text-white leading-tight tracking-tight">SABSA</span>
              <span className="font-mono text-[0.55rem] text-[rgba(255,255,255,0.55)] tracking-[0.12em] leading-none hidden sm:block">
                SA BRAIN SENSORY ACTIVATION CENTER | NPO
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative font-medium text-[0.82rem] tracking-[0.06em] transition-all duration-300"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#E63946] text-white font-semibold text-[0.82rem] tracking-[0.04em] rounded-full px-6 py-2.5 hover:brightness-110 hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] transition-all duration-300"
            >
              GET STARTED
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-white rounded-lg border border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(7,17,31,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-7">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-white font-medium text-[1.3rem] tracking-[0.04em] transition-all duration-300 hover:text-[#06B6D4]"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s, color 0.2s ease`,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-2 bg-[#E63946] text-white font-semibold text-[0.9rem] tracking-[0.04em] rounded-full px-10 py-3.5 hover:brightness-110 transition-all duration-300"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transition: `opacity 0.4s ease ${navLinks.length * 0.06}s`,
            }}
          >
            GET STARTED
          </button>
        </div>
      </div>
    </>
  );
}

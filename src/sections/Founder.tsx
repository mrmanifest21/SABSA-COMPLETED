import { useEffect, useRef, useState } from 'react';
import { Award, BookOpen, Heart } from 'lucide-react';

const credentials = [
  { icon: BookOpen, label: 'Master of Physiology, Anatomy & Human Movement', colour: '#06B6D4' },
  { icon: Award, label: 'Professional Exercise Scientist & Therapist', colour: '#2563EB' },
  { icon: Heart, label: 'Founder — SABSA NPO (322-984-NPO)', colour: '#E63946' },
];

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{ zIndex: 2, background: 'radial-gradient(ellipse at center, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.97) 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Portrait card */}
          <div
            className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            <div className="relative max-w-[400px] mx-auto lg:mx-0">
              {/* Main portrait */}
              <div className="relative rounded-[24px] overflow-hidden border border-[rgba(255,255,255,0.08)]" style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #0A1628 50%, #0d2040 100%)' }}>
                <div className="aspect-[3/4] flex flex-col items-center justify-center p-10 gap-6">
                  {/* Initials portrait */}
                  <div className="relative">
                    <div
                      className="w-36 h-36 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(37,99,235,0.3) 100%)', border: '2px solid rgba(6,182,212,0.4)', boxShadow: '0 0 60px rgba(6,182,212,0.15)' }}
                    >
                      <span className="font-bold text-[3rem] text-white" style={{ letterSpacing: '-0.02em' }}>ES</span>
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[rgba(6,182,212,0.2)] scale-110 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>

                  {/* Name */}
                  <div className="text-center">
                    <h3 className="font-bold text-[1.75rem] text-white leading-tight">E. S. Mashishi</h3>
                    <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#06B6D4] mt-2">FOUNDER & INVENTOR</p>
                  </div>

                  {/* Decorative neural lines */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(6,182,212,0.06), transparent)' }} />
                </div>

                {/* Image overlay — brain scan for ambiance */}
                <img
                  src="/images/neural-pathways.jpg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.06] mix-blend-screen"
                />
              </div>

              {/* Floating credential chip */}
              <div
                className="absolute -bottom-4 -right-4 glass-card px-4 py-3 flex items-center gap-2 max-w-[200px]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
              >
                <Award className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span className="text-[0.7rem] text-[rgba(255,255,255,0.8)] leading-tight">NPO Registered<br /><span className="text-[#06B6D4]">322-984-NPO</span></span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4">
              FOUNDER &amp; INVENTOR
            </span>
            <h2 className="font-bold text-[clamp(2rem,4vw,3rem)] text-white leading-tight tracking-tight mb-2">
              E. S. Mashishi
            </h2>
            <p className="text-[#2563EB] font-medium text-[1rem] mb-6">
              The Science of Sensory Activation — Built for Africa
            </p>

            <p className="text-[rgba(255,255,255,0.7)] text-[0.9rem] leading-[1.8] mb-4">
              With deep expertise in human movement science and community wellness, E. S. Mashishi created SABSA to fill a critical gap: accessible, non-pharmaceutical brain-body activation rooted in African innovation.
            </p>
            <p className="text-[rgba(255,255,255,0.7)] text-[0.9rem] leading-[1.8] mb-8">
              The programme blends modern neuroscience with sensory-motor integration, helping thousands of families — children, teens, adults, and elders — move beyond limits and unlock innate potential.
            </p>

            {/* Credentials */}
            <div className="flex flex-col gap-3 mb-8">
              {credentials.map((c, i) => {
                const Icon = c.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: `${c.colour}0a`, border: `1px solid ${c.colour}20`, opacity: isVisible ? 1 : 0, transition: `opacity 0.5s ease ${0.5 + i * 0.1}s` }}
                  >
                    <Icon className="w-4 h-4 shrink-0" style={{ color: c.colour }} />
                    <span className="text-[0.825rem] text-[rgba(255,255,255,0.75)]">{c.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <blockquote className="pl-5 border-l-[3px] border-[#06B6D4]">
              <p className="text-[#06B6D4] text-[0.95rem] italic leading-relaxed">
                "Our mission is to empower every individual — child, parent, elder — to unlock their innate potential through the science of sensory activation."
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

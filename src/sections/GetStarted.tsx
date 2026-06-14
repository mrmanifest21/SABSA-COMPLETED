import { useEffect, useRef, useState } from 'react';
import { Phone, CalendarCheck, FileText, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    step: '01',
    title: 'Schedule a Call',
    description:
      'Reach out via WhatsApp or phone. Our team will answer your questions and guide you through the next steps.',
    action: 'WhatsApp Now',
    href: 'https://wa.me/27685707475',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Book an Assessment',
    description:
      'A comprehensive evaluation identifies strengths, sensory profiles, and functional goals — personalised to you.',
    action: 'Book Assessment',
    href: '#contact',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Get Your Plan',
    description:
      'Receive a tailored brain-body activation program designed around your unique profile and goals.',
    action: 'Take Assessment',
    actionType: 'quiz',
    href: '',
  },
];

export default function GetStarted({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding"
      style={{
        zIndex: 2,
        background:
          'radial-gradient(ellipse at center, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.96) 100%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            GET STARTED
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            Ready to See What&apos;s Possible?
          </h2>
          <p
            className={`mt-4 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[rgba(255,255,255,0.7)] leading-relaxed max-w-[600px] mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Three simple steps to begin your journey toward better focus, movement,
            confidence, and daily functioning.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[rgba(6,182,212,0.3)] via-[rgba(37,99,235,0.4)] to-[rgba(6,182,212,0.3)]" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className={`relative text-center transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
              >
                {/* Icon circle */}
                <div className="relative z-10 w-[120px] h-[120px] mx-auto rounded-full glass-card flex items-center justify-center mb-6 border border-[rgba(6,182,212,0.2)]">
                  <Icon className="w-10 h-10 text-[#06B6D4]" />
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#2563EB] text-white text-xs font-bold flex items-center justify-center border-2 border-[#0A1628]">
                    {s.step}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-white mb-3">{s.title}</h3>
                <p className="text-[rgba(255,255,255,0.7)] text-sm leading-relaxed max-w-[280px] mx-auto mb-5">
                  {s.description}
                </p>

                {s.actionType === 'quiz' ? (
                  <button
                    onClick={onOpenQuiz}
                    className="inline-flex items-center gap-2 text-[#06B6D4] font-semibold text-sm hover:text-white transition-colors group"
                  >
                    {s.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : s.href && s.href.startsWith('http') ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#06B6D4] font-semibold text-sm hover:text-white transition-colors group"
                  >
                    {s.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <a
                    href={s.href || '#'}
                    className="inline-flex items-center gap-2 text-[#06B6D4] font-semibold text-sm hover:text-white transition-colors group"
                  >
                    {s.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

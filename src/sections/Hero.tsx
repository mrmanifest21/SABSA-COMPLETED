import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ClipboardCheck, Shield, Sparkles, Users } from 'lucide-react';

const tickerItems = [
  'FOCUS & ATTENTION',
  'EMOTIONAL REGULATION',
  'LEARNING READINESS',
  'ELDERLY BALANCE',
  'BEHAVIOUR SUPPORT',
  'SOCIAL SKILLS',
  'ANXIETY MANAGEMENT',
  'ACADEMIC PERFORMANCE',
  'EXECUTIVE FUNCTIONING',
  'INJURY REHABILITATION',
  'CHRONIC WELLNESS',
  'SPECIAL SCHOOLS',
];

export default function Hero({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tickerText = tickerItems.join(' \u00B7 ') + ' \u00B7 ';

  return (
    <>
      <section
        id="home"
        ref={sectionRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <div className="relative z-10 flex flex-col items-center text-center max-w-[900px] mx-auto pt-20">
          {/* Overline */}
          <span
            className={`font-mono text-[0.75rem] tracking-[0.15em] text-[#06B6D4] mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            SA BRAIN SENSORY ACTIVATION
          </span>

          {/* Headline */}
          <h1 className="font-sans font-bold leading-[1.0] tracking-[-0.02em] text-white">
            <span
              className={`block text-[clamp(2.5rem,7vw,5.5rem)] transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.5s' }}
            >
              Activate the{' '}
              <span className="drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]">Brain</span>.
            </span>
            <span
              className={`block text-[clamp(2.5rem,7vw,5.5rem)] transition-all duration-700 mt-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.65s' }}
            >
              Strengthen the{' '}
              <span className="drop-shadow-[0_0_20px_rgba(230,57,70,0.5)]">Body</span>.
            </span>
            <span
              className={`block text-[clamp(1.8rem,5vw,4rem)] text-[rgba(255,255,255,0.7)] mt-2 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '0.8s' }}
            >
              Transform Daily Functioning.
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`mt-6 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[rgba(255,255,255,0.7)] leading-relaxed max-w-[640px] transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '1.0s' }}
          >
            A drug-free, personalised holistic program that engages brain and body through sensory
            activation, rhythmic movement, and neuroplasticity training — designed to support focus,
            behaviour, emotional regulation, and confidence.
          </p>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mt-6 text-[0.8rem] text-[rgba(255,255,255,0.7)] font-medium transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1.2s' }}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#06B6D4]" /> 100% Drug-Free
            </span>
            <span className="text-[rgba(255,255,255,0.3)]">\u00B7</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#06B6D4]" /> Evidence-Based
            </span>
            <span className="text-[rgba(255,255,255,0.3)]">\u00B7</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#06B6D4]" /> All Ages
            </span>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mt-10 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1.4s' }}
          >
            <button onClick={onOpenQuiz} className="pill-button pill-button-primary">
              <ClipboardCheck className="w-4 h-4" />
              TAKE THE ASSESSMENT
            </button>
            <button
              onClick={() => scrollTo('programs')}
              className="pill-button pill-button-secondary"
            >
              Explore Programs
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '2s' }}
        >
          <div className="relative w-[1px] h-10 bg-[rgba(255,255,255,0.2)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-white rounded-full scroll-dot-animate" />
          </div>
        </div>
      </section>

      {/* Ticker bar */}
      <div
        className="relative w-full h-[60px] bg-[rgba(10,22,40,0.8)] backdrop-blur-[10px] border-t border-b border-[rgba(255,255,255,0.08)] flex items-center overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div className="ticker-scroll flex whitespace-nowrap">
          <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.7)] mr-8">
            {tickerText}
          </span>
          <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.7)] mr-8">
            {tickerText}
          </span>
        </div>
      </div>
    </>
  );
}

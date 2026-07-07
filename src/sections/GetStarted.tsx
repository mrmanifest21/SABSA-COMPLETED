import { useEffect, useRef, useState } from 'react';
import { Phone, CalendarCheck, FileText, ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    step: '01',
    title: 'Schedule a Call',
    description: 'Reach out via WhatsApp or phone. Our team will answer questions and guide you through the next steps at no obligation.',
    action: 'WhatsApp Now',
    href: 'https://wa.me/27685707475',
    colour: '#06B6D4',
    time: '5 min',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Book an Assessment',
    description: 'A comprehensive evaluation identifies your strengths, sensory profile, and functional goals — personalised to you.',
    action: 'Book Assessment',
    href: '#contact',
    colour: '#2563EB',
    time: '60 min',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Get Your Plan',
    description: 'Receive a tailored brain-body activation program designed around your unique profile, goals, and schedule.',
    action: 'Take Assessment',
    actionType: 'quiz' as const,
    href: '',
    colour: '#10B981',
    time: 'Ongoing',
  },
];

const promises = [
  'No medication required',
  'Personalised to your profile',
  'All ages welcome',
  'Measurable outcomes tracked',
];

export default function GetStarted({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#2563EB] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            GET STARTED
          </span>
          <h2 className={`font-bold text-[clamp(2rem,4vw,3.2rem)] text-white leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            Ready to See What's Possible?
          </h2>
          <p className={`mt-4 text-[rgba(255,255,255,0.65)] text-[0.95rem] leading-relaxed max-w-lg mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            Three steps to begin your journey toward better focus, movement, confidence, and daily functioning.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-14">
          {/* Desktop connector */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-[1px] bg-gradient-to-r from-[rgba(6,182,212,0.4)] via-[rgba(37,99,235,0.5)] to-[rgba(16,185,129,0.4)]" style={{ zIndex: 0 }} />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative z-10 glass-card p-7 flex flex-col gap-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${0.3 + i * 0.15}s, transform 0.6s ease ${0.3 + i * 0.15}s`,
                  borderTop: `2px solid ${s.colour}55`,
                }}
              >
                {/* Step circle */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center relative"
                    style={{ background: `${s.colour}18`, border: `2px solid ${s.colour}44` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.colour }} />
                    <span
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white text-[0.6rem] font-bold flex items-center justify-center border border-[#0A1628]"
                      style={{ background: s.colour }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-mono text-[0.65rem] tracking-widest text-[rgba(255,255,255,0.3)]">{s.time}</span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-[1rem] mb-2">{s.title}</h3>
                  <p className="text-[rgba(255,255,255,0.6)] text-[0.85rem] leading-relaxed">{s.description}</p>
                </div>

                {s.actionType === 'quiz' ? (
                  <button
                    onClick={onOpenQuiz}
                    className="mt-auto inline-flex items-center gap-2 font-semibold text-[0.875rem] group"
                    style={{ color: s.colour }}
                  >
                    {s.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : s.href?.startsWith('http') ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 font-semibold text-[0.875rem] group" style={{ color: s.colour }}>
                    {s.action} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <a href={s.href || '#contact'} className="mt-auto inline-flex items-center gap-2 font-semibold text-[0.875rem] group" style={{ color: s.colour }}>
                    {s.action} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Promise card */}
        <div
          className="glass-card p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.7s', background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.06) 100%)', borderColor: 'rgba(6,182,212,0.2)' }}
        >
          <div className="text-center md:text-left shrink-0">
            <p className="font-mono text-[0.65rem] tracking-widest text-[#06B6D4] mb-1">THE SABSA PROMISE</p>
            <h3 className="font-bold text-white text-[1.2rem]">Every Journey Starts Here</h3>
          </div>
          <div className="h-px w-full md:w-px md:h-16 bg-[rgba(255,255,255,0.08)]" />
          <div className="flex flex-wrap justify-center md:justify-start gap-3 flex-1">
            {promises.map((p) => (
              <div key={p} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-[rgba(255,255,255,0.75)] text-[0.875rem]">{p}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onOpenQuiz}
            className="shrink-0 bg-gradient-to-r from-[#E63946] to-[#c1121f] text-white font-bold text-[0.875rem] tracking-wide rounded-full px-8 py-3.5 hover:brightness-110 hover:shadow-[0_0_24px_rgba(230,57,70,0.4)] transition-all duration-300"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </section>
  );
}

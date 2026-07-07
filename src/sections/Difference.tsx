import { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';

const comparisons = [
  { label: 'Personalised to the individual', sabsa: true, traditional: false },
  { label: '100% drug-free approach', sabsa: true, traditional: false },
  { label: 'Rooted in neuroscience', sabsa: true, traditional: true },
  { label: 'Engages body & brain together', sabsa: true, traditional: false },
  { label: 'Addresses sensory root causes', sabsa: true, traditional: false },
  { label: 'Supports all ages', sabsa: true, traditional: false },
  { label: 'Measurable, tracked outcomes', sabsa: true, traditional: true },
  { label: 'Culturally aware & locally rooted', sabsa: true, traditional: false },
];

const pillars = [
  {
    number: '01',
    title: 'Expert Team',
    body: 'Professionals dedicated to brain and sensory development, with expertise in anatomy, physiology, and human movement science.',
    colour: '#06B6D4',
  },
  {
    number: '02',
    title: 'Scientific Foundation',
    body: 'Every protocol is grounded in peer-reviewed neuroscience research. Evidence-based methods deliver measurable, reproducible results.',
    colour: '#2563EB',
  },
  {
    number: '03',
    title: 'Proven Results',
    body: 'Thousands of individuals have reached their cognitive potential through consistent, personalised sensory engagement programs.',
    colour: '#10B981',
  },
  {
    number: '04',
    title: 'South African Roots',
    body: 'Proudly developed for our communities. Culturally aware, accessible, and built on an understanding of local needs.',
    colour: '#F59E0B',
  },
];

export default function Difference() {
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
    <section ref={sectionRef} className="relative section-padding bg-[#0A1628]" style={{ zIndex: 2 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className={`font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            WHY SABSA
          </span>
          <h2 className={`font-bold text-[clamp(2rem,4vw,3.2rem)] text-white leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            The <span className="text-gradient-blue">SABSA</span> Difference
          </h2>
          <p className={`mt-4 text-[rgba(255,255,255,0.6)] text-[0.9rem] max-w-xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            See how SABSA compares to conventional approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: comparison table */}
          <div
            className="glass-card overflow-hidden"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0)' : 'translateX(-24px)', transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s' }}
          >
            {/* Table header */}
            <div className="grid grid-cols-[1fr_80px_80px] bg-[rgba(255,255,255,0.04)] border-b border-[rgba(255,255,255,0.07)] px-5 py-3">
              <span className="font-mono text-[0.65rem] tracking-widest text-[rgba(255,255,255,0.4)]">APPROACH</span>
              <span className="font-mono text-[0.65rem] tracking-widest text-[#06B6D4] text-center">SABSA</span>
              <span className="font-mono text-[0.65rem] tracking-widest text-[rgba(255,255,255,0.3)] text-center">TRAD.</span>
            </div>

            {comparisons.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_80px_80px] px-5 py-3.5 border-b border-[rgba(255,255,255,0.05)] last:border-0 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                style={{ opacity: isVisible ? 1 : 0, transition: `opacity 0.5s ease ${0.3 + i * 0.06}s` }}
              >
                <span className="text-[0.875rem] text-[rgba(255,255,255,0.75)]">{row.label}</span>
                <div className="flex justify-center">
                  {row.sabsa
                    ? <div className="w-6 h-6 rounded-full bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.4)] flex items-center justify-center"><Check className="w-3.5 h-3.5 text-[#10B981]" /></div>
                    : <div className="w-6 h-6 rounded-full bg-[rgba(230,57,70,0.1)] border border-[rgba(230,57,70,0.3)] flex items-center justify-center"><X className="w-3.5 h-3.5 text-[#E63946]" /></div>}
                </div>
                <div className="flex justify-center">
                  {row.traditional
                    ? <div className="w-6 h-6 rounded-full bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center"><Check className="w-3.5 h-3.5 text-[rgba(16,185,129,0.5)]" /></div>
                    : <div className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center"><X className="w-3.5 h-3.5 text-[rgba(255,255,255,0.2)]" /></div>}
                </div>
              </div>
            ))}
          </div>

          {/* Right: 4 pillars */}
          <div className="flex flex-col gap-4">
            {pillars.map((p, i) => (
              <div
                key={p.number}
                className="glass-card glass-card-hover p-5 flex items-start gap-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(24px)',
                  transition: `opacity 0.6s ease ${0.25 + i * 0.12}s, transform 0.6s ease ${0.25 + i * 0.12}s`,
                  borderLeft: `3px solid ${p.colour}66`,
                }}
              >
                <span
                  className="font-mono text-[0.65rem] tracking-widest shrink-0 mt-1"
                  style={{ color: p.colour }}
                >
                  {p.number}
                </span>
                <div>
                  <h3 className="font-semibold text-white text-[0.95rem] mb-1.5">{p.title}</h3>
                  <p className="text-[rgba(255,255,255,0.6)] text-[0.85rem] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

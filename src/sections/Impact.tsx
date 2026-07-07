import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
  colour: string;
}

const stats: StatItem[] = [
  { value: '2 000+', numericValue: 2000, suffix: '+', label: 'Learners Reached', sub: 'Across all programmes', colour: '#06B6D4' },
  { value: '15+', numericValue: 15, suffix: '+', label: 'Partner Schools', sub: 'Active partnerships', colour: '#2563EB' },
  { value: '100%', numericValue: 100, suffix: '%', label: 'Drug-Free', sub: 'No medication. Ever.', colour: '#10B981' },
  { value: '6', numericValue: 6, suffix: '', label: 'Intervention Domains', sub: 'Holistic approach', colour: '#7C3AED' },
];

const regions = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'Mpumalanga'];

function AnimatedCounter({ target, suffix, prefix = '', isVisible, delay }: { target: number; suffix: string; prefix?: string; isVisible: boolean; delay: number }) {
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!isVisible || animated.current) return;
    animated.current = true;
    const timer = setTimeout(() => {
      const duration = 1800;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  return (
    <span className="font-bold text-[clamp(2.5rem,5vw,4rem)] text-white leading-none tracking-tight tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ zIndex: 2, background: 'linear-gradient(135deg, #0A1628 0%, #0d2040 50%, #0A1628 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(6,182,212,0.06) 0%, transparent 65%)' }} />
      {/* Decorative grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            COMMUNITY IMPACT
          </span>
          <h2 className={`font-bold text-[clamp(2rem,4vw,3rem)] text-white leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            Changing Lives Across{' '}
            <span className="text-gradient-blue">South Africa</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-6 flex flex-col gap-2 text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${0.1 + i * 0.12}s, transform 0.6s ease ${0.1 + i * 0.12}s`,
                borderBottom: `2px solid ${stat.colour}55`,
              }}
            >
              <AnimatedCounter target={stat.numericValue} suffix={stat.suffix} isVisible={isVisible} delay={(i + 1) * 180} />
              <p className="font-semibold text-white text-[0.875rem] mt-1">{stat.label}</p>
              <p className="text-[rgba(255,255,255,0.45)] text-[0.72rem] font-mono">{stat.sub}</p>
              <div className="h-0.5 w-8 mx-auto rounded-full mt-1" style={{ background: stat.colour }} />
            </div>
          ))}
        </div>

        {/* Regions */}
        <div
          className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.6s' }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <MapPin className="w-4 h-4 text-[#06B6D4]" />
            <span className="font-mono text-[0.7rem] tracking-[0.15em] text-[#06B6D4] uppercase">Active Provinces</span>
          </div>
          <div className="h-px flex-1 hidden sm:block bg-[rgba(255,255,255,0.06)]" />
          <div className="flex flex-wrap gap-2">
            {regions.map((r) => (
              <span
                key={r}
                className="text-[0.75rem] font-medium px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Mission line */}
        <p
          className="text-center text-[rgba(255,255,255,0.4)] text-[0.8rem] mt-10 leading-relaxed"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.8s' }}
        >
          Partnering with schools, clinics, and community centres — personalised assessments guide every journey.
        </p>
      </div>
    </section>
  );
}

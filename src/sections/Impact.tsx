import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  isCustom?: boolean;
}

const stats: StatItem[] = [
  { value: '15+', numericValue: 15, suffix: '+', label: 'Partner Schools' },
  { value: '6', numericValue: 6, suffix: '', label: 'Intervention Domains' },
  { value: '100%', numericValue: 100, suffix: '%', label: 'Drug-Free Approach' },
  { value: 'Custom', numericValue: 0, suffix: '', label: 'Outcome-Based Plans', isCustom: true },
];

function AnimatedCounter({
  target,
  suffix,
  isVisible,
  delay,
  isCustom,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
  isCustom?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      if (isCustom) {
        setCount(0);
        return;
      }
      const duration = 2000;
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
  }, [isVisible, target, delay, isCustom]);

  if (isCustom) {
    return (
      <span className="font-sans font-bold text-[clamp(3rem,6vw,5rem)] text-white leading-none tracking-[-0.02em]">
        Custom
      </span>
    );
  }

  return (
    <span className="font-sans font-bold text-[clamp(3rem,6vw,5rem)] text-white leading-none tracking-[-0.02em]">
      {count}
      {suffix}
    </span>
  );
}

export default function Impact() {
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-[120px] bg-[#0A1628] border-b border-[rgba(255,255,255,0.08)]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <span
            className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            COMMUNITY IMPACT
          </span>
          <h2
            className={`font-sans font-bold text-[2rem] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            Community-Focused Impact
          </h2>
          <p
            className={`mt-4 text-base text-[rgba(255,255,255,0.7)] leading-relaxed max-w-[700px] mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Partnering with schools, clinics, and community centres across Gauteng, Western Cape,
            and KZN. Personalised assessments guide each journey — results are measured in improved
            daily functioning.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-14">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${0.3 + i * 0.15}s` }}
            >
              <AnimatedCounter
                target={stat.numericValue}
                suffix={stat.suffix}
                isVisible={isVisible}
                delay={i * 200}
                isCustom={stat.isCustom}
              />
              <p className="mt-2 font-medium text-[0.875rem] text-[rgba(255,255,255,0.7)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

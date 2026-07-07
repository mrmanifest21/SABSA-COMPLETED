import { useEffect, useRef, useState } from 'react';
import VideoBackground from '../components/VideoBackground';

const pillars = [
  {
    number: '01',
    title: 'Learning Readiness',
    icon: '📚',
    color: '#06B6D4',
    body: 'A regulated nervous system is the foundation for all learning. When sensory processing is optimised, children can absorb, retain, and apply information with far greater ease.',
    outcomes: ['Improved focus & attention span', 'Better reading comprehension', 'Enhanced memory retention'],
  },
  {
    number: '02',
    title: 'Productivity & Performance',
    icon: '🎯',
    color: '#2563EB',
    body: 'Adults and professionals with regulated sensory systems demonstrate superior executive function, problem-solving capacity, and sustained concentration under pressure.',
    outcomes: ['Enhanced executive function', 'Greater stress resilience', 'Sharper decision-making'],
  },
  {
    number: '03',
    title: 'Emotional Regulation',
    icon: '💫',
    color: '#7C3AED',
    body: "Sensory dysregulation sits at the root of many emotional and behavioural challenges. Targeted activation resets the nervous system's baseline, reducing reactivity and building self-control.",
    outcomes: ['Reduced anxiety & meltdowns', 'Improved self-awareness', 'Stronger social connections'],
  },
  {
    number: '04',
    title: 'Wellbeing & Balance',
    icon: '🌿',
    color: '#10B981',
    body: 'Physical health, mental clarity, and emotional wellbeing are deeply interconnected. Sensory optimisation supports better sleep, body awareness, and a lasting sense of calm.',
    outcomes: ['Improved sleep quality', 'Reduced chronic stress', 'Greater mind-body connection'],
  },
];

export default function RegulationPerformance() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="regulation-performance"
      className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
    >
      <VideoBackground
        src="/videos/wellness.mp4"
        fallbackSrc="/videos/hero-ambient.mp4"
        overlay="linear-gradient(to bottom, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.7) 40%, rgba(10,22,40,0.92) 100%)"
      />

      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#10B981] opacity-[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#2563EB] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] mb-4 uppercase">
          04 · Regulation &amp; Performance
        </p>
        <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-white mb-6 max-w-3xl">
          Sensory Mastery Unlocks{' '}
          <span className="text-gradient-blue">Human Potential</span>
        </h2>
        <p className="text-[rgba(255,255,255,0.65)] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed max-w-2xl mb-16">
          Understanding and optimising sensory processing is not just about managing challenges —
          it is about unlocking the brain's capacity for extraordinary performance, emotional
          intelligence, and sustained wellbeing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => {
            const isActive = activeCard === i;
            return (
              <div
                key={i}
                ref={(el) => { if (el) cardRefs.current[i] = el; }}
                className="glass-card p-7 flex flex-col gap-5 cursor-pointer group"
                style={{
                  opacity: 0,
                  transform: 'translateY(40px) scale(0.97)',
                  transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s, border-color 0.3s ease, box-shadow 0.3s ease`,
                  borderColor: isActive ? `${pillar.color}44` : undefined,
                  boxShadow: isActive ? `0 0 40px ${pillar.color}18, 0 8px 32px rgba(0,0,0,0.3)` : undefined,
                }}
                onClick={() => setActiveCard(isActive ? null : i)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-[1.4rem] shrink-0"
                      style={{ background: `${pillar.color}18`, border: `1px solid ${pillar.color}33` }}
                    >
                      {pillar.icon}
                    </div>
                    <div>
                      <span
                        className="block font-mono text-[0.65rem] tracking-widest mb-0.5"
                        style={{ color: pillar.color }}
                      >
                        {pillar.number}
                      </span>
                      <h3 className="font-bold text-white text-[1rem] leading-snug">{pillar.title}</h3>
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-all duration-300"
                    style={{ borderColor: `${pillar.color}44`, color: pillar.color }}
                  >
                    <span className="text-[0.7rem] font-bold">{isActive ? '−' : '+'}</span>
                  </div>
                </div>

                <p className="text-[rgba(255,255,255,0.65)] text-[0.875rem] leading-relaxed">{pillar.body}</p>

                {/* Expandable outcomes */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isActive ? '120px' : '0', opacity: isActive ? 1 : 0 }}
                >
                  <ul className="flex flex-col gap-1.5 pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    {pillar.outcomes.map((o, j) => (
                      <li key={j} className="flex items-center gap-2 text-[0.825rem]" style={{ color: pillar.color }}>
                        <span className="text-[0.5rem]">◆</span>
                        <span className="text-[rgba(255,255,255,0.75)]">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent */}
                <div
                  className="mt-auto h-[2px] rounded-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, ${pillar.color}, transparent)`,
                    width: isActive ? '100%' : '2.5rem',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

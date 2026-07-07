import { useEffect, useRef, useState } from 'react';
import VideoBackground from '../components/VideoBackground';

const senses = [
  {
    id: '01',
    label: 'Vision',
    emoji: '👁',
    color: '#06B6D4',
    description:
      'Visual processing underpins reading, spatial orientation, and coordination. Dysfunction here affects focus and academic performance.',
    detail: 'Contrast sensitivity · Tracking · Visual-motor integration',
  },
  {
    id: '02',
    label: 'Hearing',
    emoji: '👂',
    color: '#2563EB',
    description:
      'Auditory processing shapes language, social interaction and emotional responses. Many children mis-labelled as inattentive have auditory processing differences.',
    detail: 'Auditory discrimination · Figure-ground · Temporal processing',
  },
  {
    id: '03',
    label: 'Touch',
    emoji: '🤚',
    color: '#7C3AED',
    description:
      'The tactile system regulates the nervous system and provides grounding. Over- or under-sensitivity drives avoidance behaviours and emotional dysregulation.',
    detail: 'Tactile discrimination · Light touch · Deep pressure',
  },
  {
    id: '04',
    label: 'Vestibular',
    emoji: '⚖️',
    color: '#06B6D4',
    description:
      'Your inner-ear balance system connects directly to attention, postural control, and emotional regulation — often the root of fidgeting and poor focus.',
    detail: 'Balance · Gravitational security · Movement tolerance',
  },
  {
    id: '05',
    label: 'Proprioception',
    emoji: '🧠',
    color: '#2563EB',
    description:
      'Body-position awareness allows us to navigate space, grade movement force, and feel emotionally secure — a key driver of confidence and calm.',
    detail: 'Body awareness · Muscle feedback · Motor planning',
  },
];

export default function SensoryProcessing() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeSense = senses[active];

  return (
    <section
      id="sensory-processing"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
      style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
    >
      <VideoBackground
        src="/videos/sensory-system.mp4"
        fallbackSrc="/videos/hero-ambient.mp4"
        overlay="linear-gradient(to right, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.65) 60%, rgba(10,22,40,0.85) 100%)"
      />

      {/* Glow blobs */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#7C3AED] opacity-[0.06] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#06B6D4] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] mb-4 uppercase">
          03 · Sensory Systems
        </p>
        <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-white mb-6 max-w-3xl">
          The Five Pathways to{' '}
          <span className="text-gradient-blue">Understanding</span>
        </h2>
        <p className="text-[rgba(255,255,255,0.65)] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed max-w-2xl mb-14">
          Our sensory systems are the gateway through which the brain receives and interprets the
          world. When any pathway is disrupted, it creates a cascade of challenges — and
          opportunities for targeted intervention.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: sense selector */}
          <div className="flex flex-col gap-2 lg:w-64 shrink-0">
            {senses.map((sense, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  active === i
                    ? 'bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)]'
                    : 'hover:bg-[rgba(255,255,255,0.04)]'
                }`}
              >
                <span
                  className="font-mono text-[0.65rem] tracking-widest transition-colors"
                  style={{ color: active === i ? sense.color : 'rgba(255,255,255,0.4)' }}
                >
                  {sense.id}
                </span>
                <span
                  className="font-semibold text-[0.95rem] transition-colors"
                  style={{ color: active === i ? '#fff' : 'rgba(255,255,255,0.55)' }}
                >
                  {sense.label}
                </span>
                {active === i && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: sense.color }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="glass-card flex-1 p-8 flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[1.25rem] shrink-0"
                style={{
                  background: `${activeSense.color}22`,
                  border: `1px solid ${activeSense.color}44`,
                }}
              >
                {activeSense.emoji}
              </div>
              <h3 className="font-bold text-white text-[1.25rem]">{activeSense.label} System</h3>
            </div>
            <p className="text-[rgba(255,255,255,0.75)] text-[0.95rem] leading-relaxed">
              {activeSense.description}
            </p>
            <div
              className="rounded-lg px-4 py-3 text-[0.8rem] font-mono tracking-wide"
              style={{
                background: `${activeSense.color}11`,
                color: activeSense.color,
                border: `1px solid ${activeSense.color}22`,
              }}
            >
              {activeSense.detail}
            </div>
            <p className="text-[rgba(255,255,255,0.5)] text-[0.85rem]">
              Brain Sense designs targeted programmes that address this specific sensory pathway —
              helping the brain process information more efficiently and effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

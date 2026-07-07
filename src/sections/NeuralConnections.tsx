import { useEffect, useRef } from 'react';
import VideoBackground from '../components/VideoBackground';

const nodes = [
  {
    icon: '⚡',
    title: 'Electrical Signals',
    body: 'Neurons communicate through precisely timed electrical impulses, transmitting information across trillions of synaptic connections every second.',
  },
  {
    icon: '🔗',
    title: 'Synaptic Plasticity',
    body: 'Every experience you have physically rewires your brain — strengthening connections that are used and pruning those that are not.',
  },
  {
    icon: '🌐',
    title: 'Neural Networks',
    body: 'Specialised regions collaborate in real time through vast networks, coordinating perception, movement, emotion, and thought simultaneously.',
  },
  {
    icon: '🔄',
    title: 'Neuroplasticity',
    body: 'The brain retains its ability to reorganise itself at any age. Targeted sensory activation accelerates this process of growth and adaptation.',
  },
];

export default function NeuralConnections() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="neural-connections"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden"
    >
      <VideoBackground
        src="/videos/neurons.mp4"
        fallbackSrc="/videos/hero-ambient.mp4"
        overlay="linear-gradient(135deg, rgba(10,22,40,0.88) 0%, rgba(14,30,58,0.75) 50%, rgba(10,22,40,0.92) 100%)"
      />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2563EB] opacity-[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#06B6D4] opacity-[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section label */}
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] mb-4 uppercase">
          02 · Neural Activity
        </p>

        {/* Headline */}
        <h2 className="font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-white mb-6 max-w-3xl">
          How Your Brain{' '}
          <span className="text-gradient-blue">Communicates</span>
        </h2>
        <p className="text-[rgba(255,255,255,0.65)] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed max-w-2xl mb-16">
          Beneath every thought, feeling and movement lies an intricate web of neural activity —
          billions of connections firing in concert. Understanding this system is the first step to
          optimising it.
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {nodes.map((node, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="glass-card glass-card-hover p-6 flex flex-col gap-4 cursor-default"
              style={{
                opacity: 0,
                transform: 'translateY(32px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
              }}
            >
              <span className="text-3xl">{node.icon}</span>
              <h3 className="font-semibold text-white text-[1rem] leading-snug">{node.title}</h3>
              <p className="text-[rgba(255,255,255,0.6)] text-[0.875rem] leading-relaxed">{node.body}</p>
              {/* Cyan accent line */}
              <div className="mt-auto h-[2px] w-10 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

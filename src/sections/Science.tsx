import { useEffect, useRef, useState, useCallback } from 'react';
import { Zap, Target, Activity } from 'lucide-react';

const scienceCards = [
  {
    icon: Zap,
    title: 'Rhythmic Entrainment',
    description:
      'Synchronises brainwave activity, improving attention span and language processing through patterned auditory stimulation.',
  },
  {
    icon: Target,
    title: 'Visual Stimulation',
    description:
      'Tracking exercises that strengthen oculomotor and cognitive pathways, building visual processing capacity essential for reading and focus.',
  },
  {
    icon: Activity,
    title: 'Bilateral Coordination',
    description:
      'Cross-lateral movements that integrate left-right brain communication, enhancing whole-brain learning and motor planning.',
  },
];

interface CardTilt {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

function ScienceCard({
  card,
  index,
  isVisible,
}: {
  card: (typeof scienceCards)[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<CardTilt>({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    setTilt({ rotateX, rotateY, glareX: x * 100, glareY: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    setIsHovered(false);
  }, []);

  const Icon = card.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card glass-card-hover p-8 md:p-10 relative overflow-hidden cursor-default transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${0.15 * index}s`,
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`
          : 'perspective(800px) rotateX(0) rotateY(0) scale(1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s, box-shadow 0.4s',
      }}
    >
      {/* Specular highlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.4), transparent 60%)`,
        }}
      />
      <div className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center mb-5">
          <Icon className="w-12 h-12 text-[#06B6D4]" />
        </div>
        <h3 className="font-semibold text-[1.125rem] text-white mb-3">{card.title}</h3>
        <p className="text-[0.95rem] text-[rgba(255,255,255,0.7)] leading-relaxed">{card.description}</p>
      </div>
    </div>
  );
}

export default function Science() {
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
      id="science"
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
        <div className="text-center">
          <span
            className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            THE SCIENCE
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[700px] mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            Neuroplasticity Through Rhythm & Movement
          </h2>
          <p
            className={`mt-4 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[rgba(255,255,255,0.7)] leading-relaxed max-w-[600px] mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Our approach is rooted in three scientifically supported mechanisms that activate the
            brain&apos;s natural ability to reorganise and strengthen neural pathways.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {scienceCards.map((card, i) => (
            <ScienceCard key={card.title} card={card} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

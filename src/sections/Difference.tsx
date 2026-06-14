import { useEffect, useRef, useState, useCallback } from 'react';
import { Users, Brain, TrendingUp, MapPin } from 'lucide-react';

const pillars = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Professionals dedicated to brain and sensory development, with expertise in anatomy, physiology, and human movement.',
  },
  {
    icon: Brain,
    title: 'Scientific Approach',
    description: 'Evidence-based methods for measurable results. Every protocol is grounded in neuroscience research.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: 'Helping individuals reach their full cognitive potential through consistent, personalised engagement.',
  },
  {
    icon: MapPin,
    title: 'South African Roots',
    description: 'Proudly developed for our communities and future. Culturally aware, accessible, and locally rooted.',
  },
];

function PillarCard({
  pillar,
  index,
  isVisible,
}: {
  pillar: (typeof pillars)[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (y - 0.5) * -6,
      rotateY: (x - 0.5) * 6,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const Icon = pillar.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card glass-card-hover p-8 md:p-10 min-h-[280px] relative overflow-hidden cursor-default transition-all duration-500 flex flex-col ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${0.1 * index}s`,
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`
          : 'perspective(800px) rotateX(0) rotateY(0) scale(1)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s, box-shadow 0.4s',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.1 : 0,
          background: `radial-gradient(circle at ${50 + tilt.rotateY * 3}% ${50 - tilt.rotateX * 3}%, rgba(255,255,255,0.3), transparent 60%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <div
          className={`w-[72px] h-[72px] rounded-full glass-card flex items-center justify-center mb-6 transition-all duration-300 ${
            isHovered ? 'shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''
          }`}
        >
          <Icon className="w-8 h-8 text-[#06B6D4]" />
        </div>
        <h3 className="font-semibold text-[1.125rem] text-white mb-3">{pillar.title}</h3>
        <p className="text-[0.95rem] text-[rgba(255,255,255,0.7)] leading-relaxed flex-1">
          {pillar.description}
        </p>
      </div>
    </div>
  );
}

export default function Difference() {
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
      className="relative section-padding bg-[#0A1628]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <span
            className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            WHY SABSA
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            The <span className="text-[#06B6D4]">SABSA</span> Difference
          </h2>
          <p
            className={`mt-4 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[rgba(255,255,255,0.7)] leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Four pillars that set our approach apart from traditional interventions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

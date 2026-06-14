import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Target,
  Zap,
  Heart,
  Shield,
  Users,
  Sparkles,
  BookOpen,
  BarChart3,
  Activity,
  Hand,
  Accessibility,
  Clock,
  TrendingUp,
  School,
} from 'lucide-react';

const programs = [
  {
    icon: Target,
    title: 'Focus & Attention',
    description: 'Reduce distractibility. Build sustained concentration for school, work, and daily tasks.',
  },
  {
    icon: Zap,
    title: 'Hyperactivity & Impulsivity',
    description: 'Channel energy constructively through rhythmic movement and sensory regulation.',
  },
  {
    icon: Heart,
    title: 'Emotional Regulation',
    description: 'Anxiety support, mood stability, and behavioural calm through body-based techniques.',
  },
  {
    icon: Shield,
    title: 'Behaviour Support',
    description: 'Positive behaviour frameworks grounded in sensory understanding and motor planning.',
  },
  {
    icon: Users,
    title: 'Social Skills',
    description: 'Confidence, communication, and positive interaction through group-based sensory activities.',
  },
  {
    icon: Sparkles,
    title: 'Anxiety Support',
    description: 'Calm the nervous system with rhythmic entrainment and grounding movement protocols.',
  },
  {
    icon: BookOpen,
    title: 'Academic Performance',
    description: 'Executive function, classroom engagement, and learning readiness through targeted activation.',
  },
  {
    icon: BarChart3,
    title: 'Executive Functioning',
    description: 'Planning, organisation, working memory, and cognitive flexibility through structured exercises.',
  },
  {
    icon: Activity,
    title: 'Balance & Coordination',
    description: 'Restore motor coordination and body awareness for confident movement.',
  },
  {
    icon: Hand,
    title: 'Injury Rehabilitation',
    description: 'Support recovery with gentle, progressive sensory-motor re-education.',
  },
  {
    icon: Accessibility,
    title: 'Elderly Balance & Movement',
    description: 'Falls prevention, vestibular training, and cognitive stimulation for independent living.',
  },
  {
    icon: Clock,
    title: 'Chronic Wellness Support',
    description: 'Long-term neurological and physical vitality through consistent, low-impact sensory programs.',
  },
  {
    icon: TrendingUp,
    title: 'Teen Depression Support',
    description: 'Movement-based regulation that stabilises emotions and rebuilds neural pathways during adolescent development.',
  },
  {
    icon: School,
    title: 'Special Schools Support',
    description: 'Dedicated programs for learners in special schools, addressing unique developmental and sensory needs with specialised care.',
  },
];

function ProgramCard({
  program,
  index,
  isVisible,
}: {
  program: (typeof programs)[0];
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

  const Icon = program.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-card p-7 md:p-8 relative overflow-hidden cursor-default transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${0.08 * index}s`,
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
      <div className="relative z-10">
        <div className="w-9 h-9 flex items-center justify-center mb-4">
          <Icon
            className={`w-9 h-9 text-[#06B6D4] transition-all duration-300 ${
              isHovered ? 'scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : ''
            }`}
          />
        </div>
        <h3 className="font-semibold text-[1.1rem] text-white mb-2">{program.title}</h3>
        <p className="text-[0.9rem] text-[rgba(255,255,255,0.7)] leading-relaxed">
          {program.description}
        </p>
      </div>
    </div>
  );
}

export default function Programs() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="programs"
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
            WHAT WE SUPPORT
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            Comprehensive Support for Every Stage of Life
          </h2>
          <p
            className={`mt-4 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[rgba(255,255,255,0.7)] leading-relaxed transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            From early years to older age, SABSA adapts across the entire lifespan.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {programs.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}

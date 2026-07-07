import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Target, Zap, Heart, Shield, Users, Sparkles,
  BookOpen, BarChart3, Activity, Hand, Accessibility, Clock, TrendingUp, School,
} from 'lucide-react';

interface Program {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
  colour: string;
}

const programs: Program[] = [
  { icon: Target, title: 'Focus & Attention', colour: '#06B6D4', tags: ['children', 'adults'], description: 'Reduce distractibility. Build sustained concentration for school, work, and daily tasks.' },
  { icon: Zap, title: 'Hyperactivity & Impulsivity', colour: '#2563EB', tags: ['children', 'teens'], description: 'Channel energy constructively through rhythmic movement and sensory regulation.' },
  { icon: Heart, title: 'Emotional Regulation', colour: '#E63946', tags: ['children', 'teens', 'adults'], description: 'Anxiety support, mood stability, and behavioural calm through body-based techniques.' },
  { icon: Shield, title: 'Behaviour Support', colour: '#7C3AED', tags: ['children', 'teens'], description: 'Positive behaviour frameworks grounded in sensory understanding and motor planning.' },
  { icon: Users, title: 'Social Skills', colour: '#06B6D4', tags: ['children', 'teens'], description: 'Confidence, communication, and positive interaction through group-based sensory activities.' },
  { icon: Sparkles, title: 'Anxiety Support', colour: '#10B981', tags: ['teens', 'adults'], description: 'Calm the nervous system with rhythmic entrainment and grounding movement protocols.' },
  { icon: BookOpen, title: 'Academic Performance', colour: '#F59E0B', tags: ['children'], description: 'Executive function, classroom engagement, and learning readiness through targeted activation.' },
  { icon: BarChart3, title: 'Executive Functioning', colour: '#2563EB', tags: ['children', 'adults'], description: 'Planning, organisation, working memory, and cognitive flexibility through structured exercises.' },
  { icon: Activity, title: 'Balance & Coordination', colour: '#06B6D4', tags: ['children', 'teens', 'adults', 'elderly'], description: 'Restore motor coordination and body awareness for confident movement.' },
  { icon: Hand, title: 'Injury Rehabilitation', colour: '#10B981', tags: ['adults', 'elderly'], description: 'Support recovery with gentle, progressive sensory-motor re-education.' },
  { icon: Accessibility, title: 'Elderly Balance & Movement', colour: '#F59E0B', tags: ['elderly'], description: 'Falls prevention, vestibular training, and cognitive stimulation for independent living.' },
  { icon: Clock, title: 'Chronic Wellness', colour: '#7C3AED', tags: ['adults', 'elderly'], description: 'Long-term neurological and physical vitality through consistent, low-impact sensory programs.' },
  { icon: TrendingUp, title: 'Teen Depression Support', colour: '#E63946', tags: ['teens'], description: 'Movement-based regulation that stabilises emotions and rebuilds neural pathways during adolescent development.' },
  { icon: School, title: 'Special Schools Support', colour: '#06B6D4', tags: ['children'], description: 'Dedicated programs for learners in special schools, addressing unique developmental and sensory needs.' },
];

const filters = [
  { id: 'all', label: 'All Programs', count: programs.length },
  { id: 'children', label: 'Children', count: programs.filter(p => p.tags.includes('children')).length },
  { id: 'teens', label: 'Teens', count: programs.filter(p => p.tags.includes('teens')).length },
  { id: 'adults', label: 'Adults', count: programs.filter(p => p.tags.includes('adults')).length },
  { id: 'elderly', label: 'Elderly', count: programs.filter(p => p.tags.includes('elderly')).length },
];

function ProgramCard({ program, isVisible, delay }: { program: Program; isVisible: boolean; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rotateX: (y - 0.5) * -6, rotateY: (x - 0.5) * 6 });
  }, []);

  const Icon = program.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ rotateX: 0, rotateY: 0 }); setIsHovered(false); }}
      className="glass-card p-6 relative overflow-hidden cursor-default flex flex-col gap-4"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? (isHovered ? `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)` : 'translateY(0)')
          : 'translateY(16px)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, box-shadow 0.3s ease`,
        borderTop: `2px solid ${program.colour}44`,
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[20px]"
        style={{ opacity: isHovered ? 0.08 : 0, background: `radial-gradient(circle at center, ${program.colour}, transparent 70%)` }}
      />

      <div className="flex items-start gap-4 relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: `${program.colour}18`, border: `1px solid ${program.colour}33` }}
        >
          <Icon className="w-5 h-5" style={{ color: program.colour }} />
        </div>
        <div>
          <h3 className="font-semibold text-[0.95rem] text-white leading-snug mb-1">{program.title}</h3>
          <p className="text-[0.82rem] text-[rgba(255,255,255,0.6)] leading-relaxed">{program.description}</p>
        </div>
      </div>

      {/* Tag pills */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {program.tags.map((tag) => (
          <span
            key={tag}
            className="text-[0.6rem] font-mono tracking-wider px-2 py-0.5 rounded-full capitalize"
            style={{ background: `${program.colour}14`, color: program.colour, border: `1px solid ${program.colour}25` }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'all'
    ? programs
    : programs.filter(p => p.tags.includes(activeFilter));

  return (
    <section id="programs" ref={sectionRef} className="relative section-padding bg-[#0A1628]" style={{ zIndex: 2 }}>
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className={`font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            WHAT WE SUPPORT
          </span>
          <h2 className={`font-bold text-[clamp(2rem,4vw,3.2rem)] text-white leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            Support for Every Stage of Life
          </h2>
          <p className={`mt-4 text-[clamp(0.9rem,1.4vw,1.05rem)] text-[rgba(255,255,255,0.65)] leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            From early childhood to older age, SABSA tailors programs to your unique brain-body profile — not a generic diagnosis.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '0.3s' }}
        >
          {filters.map((f) => {
            const isActive = f.id === activeFilter;
            return (
              <button
                key={f.id}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(f.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.82rem] font-medium transition-all duration-300 border"
                style={{
                  background: isActive ? 'rgba(6,182,212,0.12)' : 'transparent',
                  borderColor: isActive ? 'rgba(6,182,212,0.5)' : 'rgba(255,255,255,0.1)',
                  color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.55)',
                }}
              >
                {f.label}
                <span
                  className="text-[0.65rem] font-mono px-1.5 py-0.5 rounded-full"
                  style={{ background: isActive ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.08)', color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.4)' }}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((program, i) => (
            <ProgramCard key={program.title} program={program} isVisible={isVisible} delay={0.05 * i} />
          ))}
        </div>

        {/* Bottom note */}
        <p className={`text-center text-[0.8rem] text-[rgba(255,255,255,0.4)] mt-10 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.8s' }}>
          All programs are 100% drug-free and personalised to the individual. Contact us to discuss your specific needs.
        </p>
      </div>
    </section>
  );
}

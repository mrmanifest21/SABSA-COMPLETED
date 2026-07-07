import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Parent',
    location: 'Gauteng',
    initials: 'SM',
    colour: '#06B6D4',
    text: "Since starting SABSA, my son's focus in school has improved dramatically. His teacher noticed the difference within weeks. The sensory exercises are fun and he actually looks forward to them. It's been life-changing for our family.",
    tag: 'Child — Focus & Attention',
  },
  {
    name: 'Thabo K.',
    role: 'Parent',
    location: 'Western Cape',
    initials: 'TK',
    colour: '#2563EB',
    text: "My daughter struggled with anxiety and social interaction. The SABSA team created a personalised plan that addressed her specific needs. She's now more confident, sleeps better, and has made friends at school. We are incredibly grateful.",
    tag: 'Child — Anxiety & Social Skills',
  },
  {
    name: 'Mrs. Nkosi',
    role: 'Special School Educator',
    location: 'KZN',
    initials: 'MN',
    colour: '#7C3AED',
    text: "SABSA has been instrumental in supporting our learners with developmental challenges. Their specialised approach helps children who traditional methods could not reach. The progress in attention, behaviour, and motor skills has been remarkable.",
    tag: 'Special Schools',
  },
  {
    name: 'Lerato D.',
    role: 'Adult Participant',
    location: 'Johannesburg',
    initials: 'LD',
    colour: '#10B981',
    text: "I joined SABSA for chronic stress and balance issues. The program is holistic and the team truly cares. My coordination has improved, I feel calmer, and I have tools to manage my anxiety daily. Highly recommend for adults too.",
    tag: 'Adult — Chronic Wellness',
  },
  {
    name: 'Mr. & Mrs. Peters',
    role: 'Parents of Teen Participant',
    location: 'Pretoria',
    initials: 'PP',
    colour: '#F59E0B',
    text: "Our teenager was struggling with depression and isolation. The teen boot camp gave him purpose, community, and tools to regulate his emotions. He came back a different person — more engaged, hopeful, and connected. Thank you SABSA.",
    tag: 'Teen — Depression Support',
  },
  {
    name: 'Grace N.',
    role: 'Grandparent',
    location: 'Cape Town',
    initials: 'GN',
    colour: '#E63946',
    text: "At 72, I was worried about falling and losing my independence. The elderly balance program at SABSA has given me confidence to move freely again. The exercises are gentle but effective. I feel stronger and more stable every day.",
    tag: 'Elderly — Balance & Movement',
  },
];

function TestimonialCard({ t, isVisible, delay }: { t: typeof testimonials[0]; isVisible: boolean; delay: number }) {
  return (
    <div
      className="glass-card p-6 flex flex-col gap-4 h-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        borderTop: `2px solid ${t.colour}44`,
      }}
    >
      {/* Quote icon */}
      <Quote className="w-7 h-7 opacity-20" style={{ color: t.colour }} />

      {/* Tag */}
      <span
        className="self-start text-[0.65rem] font-mono tracking-wider px-2.5 py-1 rounded-full"
        style={{ background: `${t.colour}14`, color: t.colour, border: `1px solid ${t.colour}25` }}
      >
        {t.tag}
      </span>

      {/* Text */}
      <p className="text-[0.875rem] text-[rgba(255,255,255,0.8)] leading-[1.7] flex-1 italic">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-3 border-t border-[rgba(255,255,255,0.07)]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.colour}cc, ${t.colour}66)` }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-semibold text-white text-[0.875rem]">{t.name}</p>
          <p className="text-[0.75rem] text-[rgba(255,255,255,0.5)]">{t.role} · {t.location}</p>
        </div>
        {/* Verified badge */}
        <div className="ml-auto flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center">
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white"><path d="M10 3L5 9 2 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span className="text-[0.6rem] text-[rgba(255,255,255,0.3)] font-mono">Verified</span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Mobile carousel state
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mobile auto-rotate — pauses on user interaction or when user prefers reduced motion
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [isMobile, isAutoPlaying]);

  const goTo = useCallback((dir: number) => {
    setActive(a => { const n = a + dir; if (n < 0) return testimonials.length - 1; if (n >= testimonials.length) return 0; return n; });
  }, []);

  return (
    <section ref={sectionRef} className="relative section-padding bg-[#0A1628]" style={{ zIndex: 2 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className={`font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            TESTIMONIALS
          </span>
          <h2 className={`font-bold text-[clamp(2rem,4vw,3.2rem)] text-white leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.1s' }}>
            Families See the Difference
          </h2>
          <p className={`mt-4 text-[rgba(255,255,255,0.55)] text-[0.9rem] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            Real stories from real people across South Africa.
          </p>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} isVisible={isVisible} delay={0.1 * i} />
          ))}
        </div>

        {/* Mobile: single carousel */}
        <div className="md:hidden">
          <div className="relative">
            <TestimonialCard t={testimonials[active]} isVisible={isVisible} delay={0} />

            {/* Nav */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => { goTo(-1); setIsAutoPlaying(false); }}
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoPlaying(p => !p)}
                  className="w-6 h-6 flex items-center justify-center text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
                  aria-label={isAutoPlaying ? 'Pause auto-advance' : 'Resume auto-advance'}
                >
                  {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => { setActive(i); setIsAutoPlaying(false); }} className="rounded-full transition-all duration-300" style={{ width: i === active ? 20 : 6, height: 6, background: i === active ? '#06B6D4' : 'rgba(255,255,255,0.2)' }} aria-label={`Go to testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={() => { goTo(1); setIsAutoPlaying(false); }} className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.08)] transition-colors" aria-label="Next testimonial">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className={`flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-[rgba(255,255,255,0.06)] transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.7s' }}>
          {[['6', 'Intervention Domains'], ['15+', 'Partner Schools'], ['100%', 'Drug-Free'], ['All Ages', 'From toddlers to 70+']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="font-bold text-white text-[1.3rem] leading-none">{val}</p>
              <p className="text-[rgba(255,255,255,0.45)] text-[0.75rem] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

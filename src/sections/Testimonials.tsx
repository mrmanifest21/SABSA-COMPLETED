import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Parent',
    location: 'Gauteng',
    text: "Since starting SABSA, my son's focus in school has improved dramatically. His teacher noticed the difference within weeks. The sensory exercises are fun and he actually looks forward to them. It's been life-changing for our family.",
    rating: 5,
  },
  {
    name: 'Thabo K.',
    role: 'Parent',
    location: 'Western Cape',
    text: "My daughter struggled with anxiety and social interaction. The SABSA team created a personalised plan that addressed her specific needs. She's now more confident, sleeps better, and has made friends at school. We are incredibly grateful.",
    rating: 5,
  },
  {
    name: 'Mrs. Nkosi',
    role: 'Special School Educator',
    location: 'KZN',
    text: "SABSA has been instrumental in supporting our learners with developmental challenges. Their specialised approach helps children who traditional methods could not reach. The progress we have seen in attention, behaviour, and motor skills has been remarkable.",
    rating: 5,
  },
  {
    name: 'Lerato D.',
    role: 'Adult Participant',
    location: 'Johannesburg',
    text: "I joined SABSA for chronic stress and balance issues. The program is holistic and the team truly cares. My coordination has improved, I feel calmer, and I have tools to manage my anxiety daily. Highly recommend for adults too.",
    rating: 5,
  },
  {
    name: 'Mr. & Mrs. Peters',
    role: 'Parents of Teen Participant',
    location: 'Pretoria',
    text: "Our teenager was struggling with depression and isolation. The teen boot camp gave him purpose, community, and tools to regulate his emotions. He came back a different person — more engaged, hopeful, and connected. Thank you SABSA.",
    rating: 5,
  },
  {
    name: 'Grace N.',
    role: 'Grandparent',
    location: 'Cape Town',
    text: "At 72, I was worried about falling and losing my independence. The elderly balance program at SABSA has given me confidence to move freely again. The exercises are gentle but effective. I feel stronger and more stable every day.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = useCallback(
    (dir: number) => {
      setActive((a) => {
        const next = a + dir;
        if (next < 0) return testimonials.length - 1;
        if (next >= testimonials.length) return 0;
        return next;
      });
    },
    []
  );

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="relative section-padding bg-[#0A1628]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            TESTIMONIALS
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            Families See the Difference
          </h2>
        </div>

        {/* Carousel */}
        <div
          className={`max-w-[800px] mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.3s' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="glass-card p-8 md:p-12 relative">
            {/* Quote icon */}
            <Quote className="absolute top-6 right-6 w-10 h-10 text-[rgba(6,182,212,0.15)]" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-[#F4A261] fill-[#F4A261]"
                />
              ))}
            </div>

            {/* Text */}
            <p className="text-lg md:text-xl text-[rgba(255,255,255,0.85)] leading-relaxed mb-8 italic">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-[rgba(255,255,255,0.6)]">
                  {t.role} &middot; {t.location}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <button
                onClick={() => goTo(-1)}
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-8 bg-[#06B6D4]'
                        : 'w-2 bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(1)}
                className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

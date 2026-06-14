import { useEffect, useRef, useState } from 'react';

export default function Founder() {
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
      className="relative section-padding"
      style={{
        zIndex: 2,
        background:
          'radial-gradient(ellipse at center, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.96) 100%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Founder Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative w-full max-w-[420px] mx-auto lg:mx-0 aspect-[4/5] rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A5F] via-[#0A1628] to-[#06B6D4] opacity-80" />
              <img
                src="/images/about-brain-scan.jpg"
                alt="E. S. Mashishi - Founder of SABSA"
                className="absolute inset-0 w-full h-full object-cover opacity-40 mixblendlend-screen"
                style={{ mixBlendMode: 'screen' }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-24 h-24 rounded-full border-2 border-[#06B6D4] flex items-center justify-center mb-6 bg-[rgba(6,182,212,0.1)]">
                  <span className="font-sans font-bold text-3xl text-[#06B6D4]">ES</span>
                </div>
                <h3 className="font-sans font-bold text-[2.5rem] text-white text-center leading-tight">
                  E. S. Mashishi
                </h3>
                <p className="font-mono text-xs text-[#06B6D4] tracking-[0.15em] mt-3 text-center">
                  FOUNDER & INVENTOR
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-3">
              FOUNDER & INVENTOR
            </span>
            <h2 className="font-sans font-bold text-[clamp(2rem,4vw,3rem)] text-white leading-[1.1] tracking-[-0.01em]">
              E. S. Mashishi
            </h2>
            <p className="mt-2 font-medium text-[1.1rem] text-[#2563EB]">
              Professional Exercise Science / Therapist
            </p>
            <p className="mt-1 text-sm text-[rgba(255,255,255,0.5)]">
              Master of Physiology / Anatomy and Human Movement
            </p>
            <p className="mt-5 text-base text-[rgba(255,255,255,0.7)] leading-[1.7]">
              With deep expertise in human movement science and community wellness, E. S. Mashishi
              created SABSA to fill a gap: accessible, non-pharmaceutical brain-body activation
              rooted in African innovation. The program blends modern neuroscience with sensory-motor
              integration, helping thousands of families move beyond limits.
            </p>
            <blockquote className="mt-8 pl-6 border-l-[3px] border-[#06B6D4]">
              <p className="text-[1.1rem] text-[#06B6D4] italic leading-relaxed">
                &ldquo;Our mission is to empower every individual — child, parent, elder — to unlock
                their innate potential through the science of sensory activation.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

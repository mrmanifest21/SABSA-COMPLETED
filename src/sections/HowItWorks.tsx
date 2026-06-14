import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    title: 'Assessment',
    description: 'A comprehensive evaluation identifies developmental strengths, sensory profiles, and functional goals.',
  },
  {
    number: '02',
    title: 'Personalised Plan',
    description: 'A tailored sensory activation program is designed around your unique brain-body profile.',
  },
  {
    number: '03',
    title: 'Guided Exercises',
    description: 'One-on-one or group sessions combining rhythmic movement, visual tracking, and balance training.',
  },
  {
    number: '04',
    title: 'Progress Tracking',
    description: 'Regular reassessment measures improvements in focus, behaviour, coordination, and daily functioning.',
  },
  {
    number: '05',
    title: 'Sustainable Results',
    description: 'Skills transfer to real life — school, work, home, and community — with lasting impact.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate line progress
          let progress = 0;
          const interval = setInterval(() => {
            progress += 2;
            setLineProgress(progress);
            if (progress >= 100) clearInterval(interval);
          }, 30);
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
      id="how-it-works"
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
            HOW IT WORKS
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            Your Journey to Better Brain Function
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-16 max-w-[800px] mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-[rgba(255,255,255,0.06)]">
            <div
              className="w-full bg-gradient-to-b from-[#06B6D4] to-[#2563EB] transition-all duration-100"
              style={{ height: `${lineProgress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const stepDelay = 0.2 + i * 0.15;
              const stepVisible = lineProgress > (i / steps.length) * 100;

              return (
                <div
                  key={step.number}
                  className={`relative flex items-start gap-6 md:gap-0 transition-all duration-700 ${
                    stepVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${stepDelay}s` }}
                >
                  {/* Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        stepVisible
                          ? 'border-[#06B6D4] scale-100'
                          : 'border-[rgba(255,255,255,0.2)] scale-0'
                      }`}
                      style={{
                        background: stepVisible ? 'rgba(6,182,212,0.1)' : 'transparent',
                        transitionDelay: `${stepDelay}s`,
                      }}
                    >
                      <span className="font-mono text-sm text-[#06B6D4]">{step.number}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[42%] glass-card p-6 md:p-7 ${
                      isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}
                  >
                    <h3 className="font-semibold text-[1.1rem] text-white mb-2">{step.title}</h3>
                    <p className="text-[0.9rem] text-[rgba(255,255,255,0.7)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

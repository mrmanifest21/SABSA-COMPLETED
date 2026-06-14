import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // 3D brain particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(w, h) * 0.35;

    interface Particle {
      angle: number;
      yOffset: number;
      speed: number;
      size: number;
      opacity: number;
      radiusOffset: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 200; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        yOffset: (Math.random() - 0.5) * radius * 1.6,
        speed: 0.002 + Math.random() * 0.004,
        size: 1 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.7,
        radiusOffset: (Math.random() - 0.5) * radius * 0.3,
      });
    }

    let animId: number;
    let time = 0;

    const draw = () => {
      animId = requestAnimationFrame(draw);
      time += 0.01;
      ctx.clearRect(0, 0, w, h);

      // Draw brain silhouette
      const brainGradient = ctx.createRadialGradient(centerX, centerY - 20, 0, centerX, centerY, radius * 1.4);
      brainGradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      brainGradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.08)');
      brainGradient.addColorStop(1, 'rgba(10, 22, 40, 0)');
      ctx.fillStyle = brainGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY - 10, radius * 0.85, radius * 1.1, 0, 0, Math.PI * 2);
      ctx.fill();

      // Draw particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const r = radius * 0.7 + p.radiusOffset + Math.sin(time + p.yOffset * 0.01) * 10;
        const x = centerX + Math.cos(p.angle) * r;
        const y = centerY + p.yOffset + Math.sin(time * 0.5 + p.angle) * 5;

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        glow.addColorStop(0, `rgba(6, 182, 212, ${p.opacity * 0.4})`);
        glow.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw neural connections
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const r1 = radius * 0.7 + p1.radiusOffset + Math.sin(time + p1.yOffset * 0.01) * 10;
          const r2 = radius * 0.7 + p2.radiusOffset + Math.sin(time + p2.yOffset * 0.01) * 10;
          const x1 = centerX + Math.cos(p1.angle) * r1;
          const y1 = centerY + p1.yOffset + Math.sin(time * 0.5 + p1.angle) * 5;
          const x2 = centerX + Math.cos(p2.angle) * r2;
          const y2 = centerY + p2.yOffset + Math.sin(time * 0.5 + p2.angle) * 5;
          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
          if (dist < 40) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative section-padding bg-[#0A1628]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <span
              className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              ABOUT SABSA
            </span>
            <h2
              className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.1s' }}
            >
              Activating Potential,{' '}
              <span className="relative">
                Transforming Lives
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#E63946] transition-all duration-1000 ${
                    isVisible ? 'w-full' : 'w-0'
                  }`}
                  style={{ transitionDelay: '0.8s' }}
                />
              </span>
            </h2>
            <p
              className={`mt-6 text-base text-[rgba(255,255,255,0.7)] leading-[1.7] transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.2s' }}
            >
              SABSA identifies developmental strengths and weaknesses to better understand how all
              aspects of development synchronise to support higher-level brain functions. Our
              personalised programs engage the brain and body through auditory stimulation, visual
              cues, rhythmic movement, balance training, and sensory integration — without medication.
            </p>
            <p
              className={`mt-4 text-base text-[rgba(255,255,255,0.7)] leading-[1.7] transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '0.3s' }}
            >
              We support individuals across the lifespan — from children building focus and
              confidence, to teens navigating emotional challenges, to adults seeking stress relief,
              to elders preserving independence and cognitive vitality. Every program is tailored to
              the person, not the diagnosis.
            </p>
            <button
              onClick={() => scrollTo('science')}
              className={`mt-8 inline-flex items-center gap-2 text-[#2563EB] font-semibold text-sm hover:text-[#06B6D4] transition-all duration-300 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.4s' }}
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* 3D Brain visual */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="relative w-full max-w-[420px] aspect-[4/5]">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ borderRadius: '20px' }}
              />
              <img
                src="/images/about-brain-scan.jpg"
                alt="3D Brain Scan Visualization"
                className="absolute inset-0 w-full h-full object-cover rounded-[20px] opacity-30 mix-blend-screen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

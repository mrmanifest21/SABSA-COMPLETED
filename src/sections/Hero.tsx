import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ClipboardCheck, Shield, Sparkles, Users } from 'lucide-react';
import VideoBackground from '../components/VideoBackground';

const tickerItems = [
  'FOCUS & ATTENTION',
  'EMOTIONAL REGULATION',
  'LEARNING READINESS',
  'ELDERLY BALANCE',
  'BEHAVIOUR SUPPORT',
  'SOCIAL SKILLS',
  'ANXIETY MANAGEMENT',
  'ACADEMIC PERFORMANCE',
  'EXECUTIVE FUNCTIONING',
  'INJURY REHABILITATION',
  'CHRONIC WELLNESS',
  'SPECIAL SCHOOLS',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  pulse: number;
}

export default function Hero({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Floating particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const COUNT = window.innerWidth < 768 ? 30 : 60;

    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouseRef.current.x * canvas.width;
      const my = mouseRef.current.y * canvas.height;

      particlesRef.current.forEach((p) => {
        // Mouse attraction (gentle pull)
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1 && dist < 200) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;

        // Wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulseOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        // Draw particle glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        gradient.addColorStop(0, `rgba(6, 182, 212, ${pulseOpacity})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${pulseOpacity * 1.5})`;
        ctx.fill();
      });

      // Draw connections
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - d / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObs.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tickerText = tickerItems.join(' · ') + ' · ';

  return (
    <>
      <section
        id="home"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Video background */}
        <VideoBackground
          src="/videos/brain-hero.mp4"
          fallbackSrc="/videos/hero-ambient.mp4"
          overlay="linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.35) 40%, rgba(10,22,40,0.75) 100%)"
        />

        {/* Neural particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Ambient glow orbs */}
        <div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div
          className="relative flex flex-col items-center text-center max-w-[920px] mx-auto pt-20"
          style={{ zIndex: 2 }}
        >
          {/* Overline */}
          <span
            className={`font-mono text-[0.75rem] tracking-[0.2em] text-[#06B6D4] mb-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            SA BRAIN SENSORY ACTIVATION
          </span>

          {/* Headline */}
          <h1 className="font-sans font-bold leading-[1.05] tracking-[-0.02em] text-white">
            <span
              className={`block text-[clamp(2.8rem,7.5vw,5.8rem)] transition-all duration-800 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.5s', transitionDuration: '0.8s' }}
            >
              Unlock Your{' '}
              <span
                className="text-gradient-blue"
                style={{ filter: 'drop-shadow(0 0 24px rgba(6,182,212,0.4))' }}
              >
                Brain's
              </span>
            </span>
            <span
              className={`block text-[clamp(2.8rem,7.5vw,5.8rem)] transition-all duration-800 mt-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0.65s', transitionDuration: '0.8s' }}
            >
              Potential
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-7 text-[clamp(1rem,1.6vw,1.2rem)] text-[rgba(255,255,255,0.72)] leading-relaxed max-w-[620px] transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.9s' }}
          >
            Understanding sensory processing to improve{' '}
            <strong className="text-white font-medium">learning</strong>,{' '}
            <strong className="text-white font-medium">performance</strong> and{' '}
            <strong className="text-white font-medium">wellbeing</strong>.
          </p>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mt-7 text-[0.8rem] text-[rgba(255,255,255,0.65)] font-medium transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1.1s' }}
          >
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#06B6D4]" /> 100% Drug-Free
            </span>
            <span className="text-[rgba(255,255,255,0.25)]">·</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#06B6D4]" /> Evidence-Based
            </span>
            <span className="text-[rgba(255,255,255,0.25)]">·</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#06B6D4]" /> All Ages
            </span>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mt-10 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1.3s' }}
          >
            <button onClick={onOpenQuiz} className="pill-button pill-button-primary">
              <ClipboardCheck className="w-4 h-4" />
              Discover Your Sensory Profile
            </button>
            <button
              onClick={() => scrollTo('neural-connections')}
              className="pill-button pill-button-secondary"
            >
              Explore the Science
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '2s', zIndex: 2 }}
        >
          <div className="relative w-[1px] h-10 bg-[rgba(255,255,255,0.2)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-white rounded-full scroll-dot-animate" />
          </div>
        </div>
      </section>

      {/* Ticker bar */}
      <div
        className="relative w-full h-[60px] bg-[rgba(10,22,40,0.85)] backdrop-blur-[10px] border-t border-b border-[rgba(255,255,255,0.08)] flex items-center overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div className="ticker-scroll flex whitespace-nowrap">
          <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.7)] mr-8">
            {tickerText}
          </span>
          <span className="font-mono text-[0.75rem] tracking-[0.1em] text-[rgba(255,255,255,0.7)] mr-8">
            {tickerText}
          </span>
        </div>
      </div>
    </>
  );
}

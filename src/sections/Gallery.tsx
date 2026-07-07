import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';

/* ─── Story data ─────────────────────────────────────────────────── */

interface StoryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  tag: string;
  colour: string;
  story: string;
  impact: string;
  featured: string; // index into images used as hero
  images: StoryImage[];
}

const chapters: Chapter[] = [
  {
    id: 'school',
    number: '01',
    title: 'In the Classroom',
    tag: 'School Sessions',
    colour: '#06B6D4',
    story:
      'In classrooms across South Africa, SABSA facilitators work side by side with learners — one-on-one and in groups — helping children unlock focus, coordination, and confidence through targeted sensory activation. Each session is a step toward a regulated nervous system that can finally learn.',
    impact: 'Over 2 000 learners reached across partner schools',
    featured: '0',
    images: [
      { src: '/images/school-1.jpg', alt: 'School outdoor session', caption: 'Outdoor sensory movement with a facilitator' },
      { src: '/images/school-2.jpg', alt: 'Indoor coordination exercises', caption: 'Building coordination through structured movement' },
      { src: '/images/school-3.jpg', alt: 'One-on-one student support', caption: 'Individual attention for every learner' },
      { src: '/images/school-4.jpg', alt: 'Classroom group activity', caption: 'Group sensory activation in the classroom' },
      { src: '/images/school-5.jpg', alt: 'Academic support session', caption: 'Supporting academic readiness through sensory work' },
      { src: '/images/school-6.jpg', alt: 'Indoor exercises', caption: 'Rhythmic indoor movement exercises' },
      { src: '/images/school-7.jpg', alt: 'Learning activity', caption: 'Learning through sensory-rich activity' },
      { src: '/images/school-8.jpg', alt: 'Writing support', caption: 'Fine motor support for writing skills' },
    ],
  },
  {
    id: 'teen',
    number: '02',
    title: 'Teen Boot Camps',
    tag: 'Adolescent Programs',
    colour: '#2563EB',
    story:
      'Teenagers discover what their bodies are truly capable of when the nervous system is properly supported. SABSA boot camps build teamwork, physical resilience, and body awareness in an environment that is challenging, safe, and — crucially — fun. Many leave with a completely new relationship to their own minds and bodies.',
    impact: 'Measurable improvement in self-regulation reported by 90% of participants',
    featured: '2',
    images: [
      { src: '/images/teen-1.jpg', alt: 'Teens outdoor trail', caption: 'Building resilience on outdoor trails' },
      { src: '/images/teen-2.jpg', alt: 'Teens brick pathway', caption: 'Proprioceptive challenge on varied terrain' },
      { src: '/images/teen-3.jpg', alt: 'Group running', caption: 'Rhythmic group running for vestibular regulation' },
      { src: '/images/teen-4.jpg', alt: 'Team running', caption: 'Team movement builds co-regulation' },
      { src: '/images/teen-5.jpg', alt: 'Group competition', caption: 'Healthy competition drives engagement' },
      { src: '/images/teen-6.jpg', alt: 'Relaxation', caption: 'Stillness and recovery — the other half of regulation' },
      { src: '/images/teen-7.jpg', alt: 'Teen group waterfront', caption: 'Community and connection at the waterfront' },
    ],
  },
  {
    id: 'soil',
    number: '03',
    title: 'Earth & Sensation',
    tag: 'Sensory Play (Soil)',
    colour: '#F59E0B',
    story:
      'Hands in soil, feet on ground. Our earth-based sensory sessions reconnect children to raw tactile experience, calming a dysregulated nervous system and igniting natural curiosity. What looks like play is, in fact, precisely targeted neurological input — grounding, organising, and healing from the ground up.',
    impact: 'Tactile grounding reduces anxiety responses within a single session',
    featured: '1',
    images: [
      { src: '/images/soil-1.jpg', alt: 'Children sensory play', caption: 'Tactile exploration with natural materials' },
      { src: '/images/soil-2.jpg', alt: 'Kids exploring soil', caption: 'Discovery through texture and sensation' },
      { src: '/images/soil-3.jpg', alt: 'Children soil bags', caption: 'Grounding through direct earth contact' },
    ],
  },
  {
    id: 'parents',
    number: '04',
    title: 'Family in Focus',
    tag: 'Parent Boot Camps',
    colour: '#10B981',
    story:
      'Meaningful change happens at home, not just in sessions. SABSA involves caregivers as active partners — through wellness boot camps, health checks, and workshops on ADHD, learning differences, and sensory needs. When parents understand what is happening in their child\'s nervous system, everything changes.',
    impact: 'Caregiver confidence in supporting sensory needs increases by 78%',
    featured: '0',
    images: [
      { src: '/images/parent-1.jpg', alt: 'Parent boot camp', caption: 'Caregivers experience sensory movement firsthand' },
      { src: '/images/parent-2.jpg', alt: 'Wellness check', caption: 'Health monitoring as part of holistic care' },
      { src: '/images/parent-3.jpg', alt: 'Blood pressure check', caption: 'Comprehensive wellness screening' },
      { src: '/images/parent-4.jpg', alt: 'Pre-school support', caption: 'Early intervention for the youngest learners' },
      { src: '/images/parent-5.jpg', alt: 'ADHD workshop', caption: 'ADHD & learning workshop for caregivers' },
    ],
  },
  {
    id: 'hydro',
    number: '05',
    title: 'Water & Movement',
    tag: 'Hydro Therapy',
    colour: '#7C3AED',
    story:
      'Water is one of the most powerful sensory environments available to us. SABSA hydrotherapy sessions leverage the pool\'s unique properties — buoyancy, resistance, temperature — to build vestibular processing, proprioception, and joyful uninhibited movement. For many participants, the pool is where they feel free for the first time.',
    impact: 'Vestibular regulation improvements observed in 85% of hydro participants',
    featured: '3',
    images: [
      { src: '/images/hydro-1.jpg', alt: 'Pool therapy teens', caption: 'Teens experiencing joyful aquatic movement' },
      { src: '/images/hydro-2.jpg', alt: 'Group hydrotherapy', caption: 'Group vestibular regulation in the pool' },
      { src: '/images/hydro-3.jpg', alt: 'Indoor pool session', caption: 'Structured aquatic therapy session' },
      { src: '/images/hydro-4.jpg', alt: 'Group at pool edge', caption: 'Connection and community at the poolside' },
      { src: '/images/hydro-5.jpg', alt: 'Pool therapy lanes', caption: 'Lane-based movement for coordination' },
      { src: '/images/hydro-6.jpg', alt: 'Instructor session', caption: 'One-on-one aquatic facilitation' },
      { src: '/images/hydro-7.jpg', alt: 'Pool fun slides', caption: 'Play as therapy — the SABSA way' },
    ],
  },
];

/* ─── Lightbox ───────────────────────────────────────────────────── */

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: StoryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(5,10,20,0.97)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] flex items-center justify-center text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] tracking-widest text-[rgba(255,255,255,0.4)]">
        {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image */}
      <div
        className="max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="max-w-full max-h-[75vh] rounded-2xl object-contain"
          style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
        />
        {img.caption && (
          <p className="text-[rgba(255,255,255,0.6)] text-[0.875rem] text-center max-w-lg">
            {img.caption}
          </p>
        )}
      </div>

      {/* Next */}
      <button
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] flex items-center justify-center text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Thumbnail strip */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto scrollbar-hide px-2">
        {images.map((thumb, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onNext(); /* handled externally */ }}
            className="shrink-0 w-12 h-9 rounded-lg overflow-hidden transition-all duration-200"
            style={{ opacity: i === index ? 1 : 0.35, outline: i === index ? '2px solid rgba(6,182,212,0.8)' : 'none' }}
            aria-label={`Go to image ${i + 1}`}
          >
            <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Chapter view ───────────────────────────────────────────────── */

function ChapterView({
  chapter,
  onOpenLightbox,
}: {
  chapter: Chapter;
  onOpenLightbox: (index: number) => void;
}) {
  const featuredIdx = parseInt(chapter.featured, 10);
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero layout: featured image + story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        {/* Featured image */}
        <button
          className="relative rounded-2xl overflow-hidden group cursor-zoom-in"
          onClick={() => onOpenLightbox(featuredIdx)}
          aria-label={`Open ${chapter.images[featuredIdx].alt} in full screen`}
          style={{ minHeight: '320px' }}
        >
          <img
            src={chapter.images[featuredIdx].src}
            alt={chapter.images[featuredIdx].alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.8)] via-[rgba(10,22,40,0.1)] to-transparent" />
          {/* Expand hint */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(10,22,40,0.6)] backdrop-blur-sm border border-[rgba(255,255,255,0.15)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Expand className="w-4 h-4 text-white" />
          </div>
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-white text-[0.875rem] font-medium leading-snug">
              {chapter.images[featuredIdx].caption}
            </p>
          </div>
        </button>

        {/* Story card */}
        <div className="glass-card p-7 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span
                className="font-mono text-[0.65rem] tracking-[0.2em]"
                style={{ color: chapter.colour }}
              >
                CHAPTER {chapter.number}
              </span>
              <div className="h-px flex-1" style={{ background: `${chapter.colour}44` }} />
            </div>
            <h3 className="font-bold text-white text-[1.5rem] leading-tight">{chapter.title}</h3>
            <p className="text-[rgba(255,255,255,0.7)] text-[0.9rem] leading-[1.75]">
              {chapter.story}
            </p>
          </div>

          {/* Impact stat */}
          <div
            className="rounded-xl px-5 py-4 flex items-center gap-3"
            style={{ background: `${chapter.colour}0f`, border: `1px solid ${chapter.colour}28` }}
          >
            <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: chapter.colour }} />
            <p className="text-[0.825rem] leading-snug" style={{ color: chapter.colour }}>
              {chapter.impact}
            </p>
          </div>

          {/* Image count */}
          <p className="font-mono text-[0.65rem] tracking-widest text-[rgba(255,255,255,0.3)]">
            {String(chapter.images.length).padStart(2, '0')} PHOTOGRAPHS · CLICK TO EXPLORE
          </p>
        </div>
      </div>

      {/* Thumbnail filmstrip */}
      <div className="relative group/strip">
        {/* Scroll shadows */}
        <div className="absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-[#0A1628] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-[#0A1628] to-transparent z-10 pointer-events-none" />

        {/* Scroll btns */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[rgba(10,22,40,0.85)] border border-[rgba(255,255,255,0.15)] text-white flex items-center justify-center opacity-0 group-hover/strip:opacity-100 transition-opacity hover:border-[rgba(255,255,255,0.3)]"
          onClick={() => stripRef.current?.scrollBy({ left: -260, behavior: 'smooth' })}
          aria-label="Scroll filmstrip left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[rgba(10,22,40,0.85)] border border-[rgba(255,255,255,0.15)] text-white flex items-center justify-center opacity-0 group-hover/strip:opacity-100 transition-opacity hover:border-[rgba(255,255,255,0.3)]"
          onClick={() => stripRef.current?.scrollBy({ left: 260, behavior: 'smooth' })}
          aria-label="Scroll filmstrip right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div
          ref={stripRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {chapter.images.map((img, i) => (
            <button
              key={i}
              onClick={() => onOpenLightbox(i)}
              className="shrink-0 relative rounded-xl overflow-hidden group/thumb"
              style={{ width: 160, height: 110 }}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.7)] to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300" />
              {i === featuredIdx && (
                <div
                  className="absolute top-2 left-2 rounded-md px-2 py-0.5 font-mono text-[0.55rem] tracking-wider"
                  style={{ background: chapter.colour, color: '#fff' }}
                >
                  FEATURED
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300">
                <Expand className="w-5 h-5 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Gallery ───────────────────────────────────────────────── */

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const switchChapter = (index: number) => {
    if (index === activeChapter) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveChapter(index);
      setTransitioning(false);
    }, 280);
  };

  const openLightbox = useCallback((imgIndex: number) => {
    setLightboxIndex(imgIndex);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevImage = useCallback(() => {
    const total = chapters[activeChapter].images.length;
    setLightboxIndex((i) => (i - 1 + total) % total);
  }, [activeChapter]);

  const nextImage = useCallback(() => {
    const total = chapters[activeChapter].images.length;
    setLightboxIndex((i) => (i + 1) % total);
  }, [activeChapter]);

  const chapter = chapters[activeChapter];

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={chapter.images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <section
        id="gallery"
        ref={sectionRef}
        className="relative section-padding bg-[#0A1628] overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none transition-colors duration-700"
          style={{ background: `radial-gradient(circle, ${chapter.colour}08 0%, transparent 70%)` }}
        />

        <div className="max-w-[1280px] mx-auto px-6">

          {/* ── Header ── */}
          <div className="mb-14">
            <span
              className={`font-mono text-[0.7rem] tracking-[0.2em] text-[#06B6D4] block mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              GALLERY · STORIES FROM THE FIELD
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2
                className={`font-bold text-[clamp(2rem,4vw,3.2rem)] text-white leading-tight tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '0.1s' }}
              >
                Every Image<br />
                <span className="text-gradient-blue">Tells a Story</span>
              </h2>
              <p
                className={`text-[rgba(255,255,255,0.55)] text-[0.9rem] leading-relaxed max-w-xs transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: '0.2s' }}
              >
                Five chapters. Real people. One mission — unlocking the brain's potential across South Africa.
              </p>
            </div>
          </div>

          {/* ── Chapter tabs ── */}
          <div
            className={`flex gap-2 overflow-x-auto scrollbar-hide mb-10 pb-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '0.3s' }}
            role="tablist"
            aria-label="Gallery chapters"
          >
            {chapters.map((ch, i) => {
              const isActive = i === activeChapter;
              return (
                <button
                  key={ch.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`chapter-panel-${ch.id}`}
                  onClick={() => switchChapter(i)}
                  className="shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl text-left transition-all duration-300 border"
                  style={{
                    background: isActive ? `${ch.colour}18` : 'transparent',
                    borderColor: isActive ? `${ch.colour}55` : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    className="font-mono text-[0.6rem] tracking-widest transition-colors"
                    style={{ color: isActive ? ch.colour : 'rgba(255,255,255,0.35)' }}
                  >
                    {ch.number}
                  </span>
                  <span
                    className="font-semibold text-[0.875rem] whitespace-nowrap transition-colors"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }}
                  >
                    {ch.title}
                  </span>
                  {isActive && (
                    <span
                      className="ml-1 text-[0.65rem] px-2 py-0.5 rounded-full font-mono"
                      style={{ background: `${ch.colour}22`, color: ch.colour }}
                    >
                      {ch.images.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Chapter content ── */}
          <div
            id={`chapter-panel-${chapter.id}`}
            role="tabpanel"
            className="transition-all duration-300"
            style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(10px)' : 'translateY(0)' }}
          >
            <ChapterView
              chapter={chapter}
              onOpenLightbox={openLightbox}
            />
          </div>

          {/* ── Chapter progress dots ── */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {chapters.map((ch, i) => (
              <button
                key={i}
                onClick={() => switchChapter(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeChapter ? 24 : 6,
                  height: 6,
                  background: i === activeChapter ? chapter.colour : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`Go to chapter ${ch.number}: ${ch.title}`}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

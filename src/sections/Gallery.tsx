import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryCategory {
  title: string;
  images: { src: string; alt: string }[];
}

const galleryCategories: GalleryCategory[] = [
  {
    title: 'School Sessions',
    images: [
      { src: '/images/school-1.jpg', alt: 'School outdoor session with facilitator' },
      { src: '/images/school-2.jpg', alt: 'Indoor coordination exercises with students' },
      { src: '/images/school-3.jpg', alt: 'One-on-one student support' },
      { src: '/images/school-4.jpg', alt: 'Classroom group activity' },
      { src: '/images/school-5.jpg', alt: 'Academic support session' },
      { src: '/images/school-6.jpg', alt: 'Indoor exercises with school children' },
      { src: '/images/school-7.jpg', alt: 'Learning activity with teacher' },
      { src: '/images/school-8.jpg', alt: 'Writing exercise with student support' },
    ],
  },
  {
    title: 'Teen Boot Camps',
    images: [
      { src: '/images/teen-1.jpg', alt: 'Teens walking outdoor trail' },
      { src: '/images/teen-2.jpg', alt: 'Teens walking on brick pathway' },
      { src: '/images/teen-3.jpg', alt: 'Group running on sports field' },
      { src: '/images/teen-4.jpg', alt: 'Team running exercise' },
      { src: '/images/teen-5.jpg', alt: 'Group competition activity' },
      { src: '/images/teen-6.jpg', alt: 'Relaxation by the lake' },
      { src: '/images/teen-7.jpg', alt: 'Teen group by the waterfront' },
    ],
  },
  {
    title: 'Sensory Session (Soil)',
    images: [
      { src: '/images/soil-1.jpg', alt: 'Children sensory play with tubes' },
      { src: '/images/soil-2.jpg', alt: 'Kids exploring soil with bottles' },
      { src: '/images/soil-3.jpg', alt: 'Children working with soil bags' },
    ],
  },
  {
    title: "Parents Brain Sensory Boot Camp",
    images: [
      { src: '/images/parent-1.jpg', alt: 'Parent boot camp exercise session' },
      { src: '/images/parent-2.jpg', alt: 'Caregiver health check session' },
      { src: '/images/parent-3.jpg', alt: 'Blood pressure wellness check' },
      { src: '/images/parent-4.jpg', alt: 'Pre-school learning support' },
      { src: '/images/parent-5.jpg', alt: 'ADHD and Learning workshop' },
    ],
  },
  {
    title: 'Hydro Therapy Sessions',
    images: [
      { src: '/images/hydro-1.jpg', alt: 'Teens enjoying pool therapy session' },
      { src: '/images/hydro-2.jpg', alt: 'Group hydrotherapy in outdoor pool' },
      { src: '/images/hydro-3.jpg', alt: 'Indoor pool swimming session' },
      { src: '/images/hydro-4.jpg', alt: 'Group smiling at pool edge' },
      { src: '/images/hydro-5.jpg', alt: 'Indoor pool therapy with lanes' },
      { src: '/images/hydro-6.jpg', alt: 'Pool therapy with instructor' },
      { src: '/images/hydro-7.jpg', alt: 'Hydrotherapy fun at pool with slides' },
    ],
  },
];

function ImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[rgba(10,22,40,0.8)] border border-[rgba(255,255,255,0.15)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[rgba(37,99,235,0.6)]"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[rgba(10,22,40,0.8)] border border-[rgba(255,255,255,0.15)] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[rgba(37,99,235,0.6)]"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Images */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl overflow-hidden relative group/card"
          >
            <div className="aspect-[4/3] relative">
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.7)] via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 text-sm text-white/90 font-medium truncate">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative section-padding bg-[#0A1628]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            GALLERY
          </span>
          <h2
            className={`font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            SABSA in Action
          </h2>
          <p
            className={`mt-4 text-[clamp(0.95rem,1.5vw,1.15rem)] text-[rgba(255,255,255,0.7)] leading-relaxed max-w-[700px] mx-auto transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            Real moments from our programs across South Africa — from school classrooms to hydro
            therapy pools, boot camps to sensory soil sessions.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {galleryCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${0.3 + catIndex * 0.15}s` }}
            >
              {/* Category title with accent line */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="font-sans font-bold text-xl md:text-2xl text-white whitespace-nowrap">
                  {category.title}
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[rgba(6,182,212,0.4)] to-transparent" />
                <span className="font-mono text-xs text-[#06B6D4]">
                  {String(category.images.length).padStart(2, '0')} photos
                </span>
              </div>

              {/* Carousel */}
              <ImageCarousel images={category.images} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

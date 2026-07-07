import { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  /** Primary video path */
  src: string;
  /** Fallback video if primary fails */
  fallbackSrc?: string;
  /** CSS gradient string for overlay (e.g. dark scrim) */
  overlay?: string;
  className?: string;
}

/**
 * Reusable full-bleed video background.
 * - Autoplays muted & looped
 * - Lazy-loads (preload="none" → load on mount)
 * - Fades in when ready; shows gradient fallback until loaded / on error
 * - Works on mobile (playsInline)
 */
export default function VideoBackground({
  src,
  fallbackSrc,
  overlay = 'linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, rgba(10,22,40,0.3) 50%, rgba(10,22,40,0.7) 100%)',
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Trigger load after mount (lazy)
    video.load();
    video.play().catch(() => {/* silenced — browser may block autoplay */});
  }, []);

  const handleError = () => {
    const video = videoRef.current;
    if (video && fallbackSrc && video.getAttribute('data-tried-fallback') !== '1') {
      video.setAttribute('data-tried-fallback', '1');
      video.src = fallbackSrc;
      video.load();
      video.play().catch(() => {});
    } else {
      setFailed(true);
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Gradient fallback — always rendered, fades out when video is ready */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d2040] to-[#0A1628] transition-opacity duration-1000"
        style={{ opacity: loaded && !failed ? 0 : 1 }}
      />

      {!failed && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setLoaded(true)}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <source src={src} type="video/mp4" />
          {fallbackSrc && <source src={fallbackSrc} type="video/mp4" />}
        </video>
      )}

      {/* Dark overlay / scrim */}
      <div className="absolute inset-0" style={{ background: overlay }} />
    </div>
  );
}

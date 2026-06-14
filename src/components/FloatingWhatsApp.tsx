import { PhoneCall } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/27685707475"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <PhoneCall className="w-6 h-6 text-white" />
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-[#0A1628] text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}

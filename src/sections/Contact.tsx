import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, PhoneCall, Send, Check, Loader2, AlertCircle, MapPin, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_6wsyh4s';
const TEMPLATE_ID = 'template_hu4icxe';
const PUBLIC_KEY = 'tG5qWqlwrDDYqd6IP';

const provinces = [
  'Gauteng',
  'Western Cape',
  'KwaZulu-Natal',
  'Eastern Cape',
  'Free State',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    from_name: '',
    from_email: '',
    from_phone: '',
    city: '',
    province: '',
    country: 'South Africa',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formState.from_name,
          from_email: formState.from_email,
          from_phone: formState.from_phone || 'Not provided',
          message: `FULL NAME: ${formState.from_name}\nEMAIL: ${formState.from_email}\nPHONE: ${formState.from_phone || 'Not provided'}\nLOCATION: ${formState.city}, ${formState.province}, ${formState.country}\n\nMESSAGE:\n${formState.message}`,
          to_email: 'info@brainsensory.co.za',
          reply_to: formState.from_email,
        },
        PUBLIC_KEY
      );
      setStatus('success');
      setFormState({
        from_name: '',
        from_email: '',
        from_phone: '',
        city: '',
        province: '',
        country: 'South Africa',
        message: '',
      });
    } catch {
      setStatus('error');
      setErrorMsg('There was a problem sending your message. Please try again or contact us directly via WhatsApp.');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative section-padding"
      style={{
        zIndex: 2,
        background:
          'radial-gradient(ellipse at center, rgba(10,22,40,0.78) 0%, rgba(10,22,40,0.92) 100%)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16">
          {/* Left - Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="font-mono text-[0.75rem] tracking-[0.12em] text-[#06B6D4] block mb-4">
              GET IN TOUCH
            </span>
            <h2 className="font-sans font-bold text-[clamp(2rem,4vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em]">
              Begin Your Assessment
            </h2>
            <p className="mt-4 text-base text-[rgba(255,255,255,0.7)] leading-relaxed">
              Reach out for a confidential consultation. We will design a brain-body plan just for
              you or your organisation.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,22,40,0.4)]">
                <div className="w-12 h-12 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div>
                  <p className="text-[0.7rem] text-[rgba(255,255,255,0.5)] font-mono tracking-[0.1em] uppercase">WhatsApp / Call</p>
                  <a
                    href="tel:+27685707475"
                    className="font-semibold text-[1.1rem] text-white hover:text-[#06B6D4] transition-colors"
                  >
                    +27 68 570 7475
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(10,22,40,0.4)]">
                <div className="w-12 h-12 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.2)] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div>
                  <p className="text-[0.7rem] text-[rgba(255,255,255,0.5)] font-mono tracking-[0.1em] uppercase">Email</p>
                  <a
                    href="mailto:info@brainsensory.co.za"
                    className="font-semibold text-[1.05rem] text-white hover:text-[#06B6D4] transition-colors"
                  >
                    info@brainsensory.co.za
                  </a>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/27685707475"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 bg-[#25D366] text-white font-bold text-[0.95rem] tracking-[0.02em] rounded-full px-8 py-4 hover:brightness-110 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-all duration-300"
            >
              <PhoneCall className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Right - Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="glass-card p-8 md:p-10 border border-[rgba(255,255,255,0.1)]">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[rgba(6,182,212,0.1)] border-2 border-[#06B6D4] flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-[#06B6D4]" />
                  </div>
                  <h3 className="font-bold text-2xl text-white mb-3">Thank You</h3>
                  <p className="text-[rgba(255,255,255,0.7)] mb-2">
                    Your enquiry has been sent to <span className="text-[#06B6D4] font-medium">info@brainsensory.co.za</span>.
                  </p>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm">
                    We will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-[rgba(230,57,70,0.1)] border border-[rgba(230,57,70,0.3)] flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                      <p className="text-[#E63946] text-sm">{errorMsg}</p>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-2">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formState.from_name}
                      onChange={(e) => setFormState((s) => ({ ...s, from_name: e.target.value }))}
                      className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-2">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formState.from_email}
                        onChange={(e) => setFormState((s) => ({ ...s, from_email: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-2">
                        <Phone className="w-3.5 h-3.5" /> Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+27 ..."
                        value={formState.from_phone}
                        onChange={(e) => setFormState((s) => ({ ...s, from_phone: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-2">
                      <MapPin className="w-3.5 h-3.5" /> Your Location
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="City / Town"
                        value={formState.city}
                        onChange={(e) => setFormState((s) => ({ ...s, city: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300"
                      />
                      <select
                        required
                        value={formState.province}
                        onChange={(e) => setFormState((s) => ({ ...s, province: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300 appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                      >
                        <option value="" disabled className="bg-[#0A1628] text-[rgba(255,255,255,0.35)]">Province</option>
                        {provinces.map((p) => (
                          <option key={p} value={p} className="bg-[#0A1628]">{p}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Country"
                        value={formState.country}
                        onChange={(e) => setFormState((s) => ({ ...s, country: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-2">
                      <MessageSquare className="w-3.5 h-3.5" /> Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your needs (focus, learning, anxiety, elderly balance, special schools...)"
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300 resize-none min-h-[140px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-[1rem] tracking-[0.02em] rounded-full px-8 py-5 hover:brightness-110 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 inline-flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending to info@brainsensory.co.za...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

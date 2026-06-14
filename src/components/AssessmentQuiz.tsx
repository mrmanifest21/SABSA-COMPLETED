import { useState, useCallback } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  ClipboardCheck,
  Baby,
  Brain,
  HeartPulse,
  School,
  Users,
  Accessibility,
  Sparkles,
  PhoneCall,
  Loader2,
  MapPin,
  AlertCircle,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_6wsyh4s';
const TEMPLATE_ID = 'template_hu4icxe';
const PUBLIC_KEY = 'tG5qWqlwrDDYqd6IP';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const concerns = [
  { icon: Brain, label: 'Attention & Focus', id: 'attention' },
  { icon: HeartPulse, label: 'Anxiety & Mood', id: 'anxiety' },
  { icon: School, label: 'Learning & Academic', id: 'academic' },
  { icon: Users, label: 'Social Skills', id: 'social' },
  { icon: Sparkles, label: 'Behaviour', id: 'behaviour' },
  { icon: Accessibility, label: 'Balance & Coordination', id: 'coordination' },
  { icon: Baby, label: 'Sensory Processing', id: 'sensory' },
  { icon: Brain, label: 'Executive Functioning', id: 'executive' },
];

const ageGroups = [
  { label: '4-7 years', value: '4-7' },
  { label: '8-12 years', value: '8-12' },
  { label: '13-17 years', value: '13-17' },
  { label: '18+ years', value: '18+' },
  { label: '65+ years', value: '65+' },
];

const symptoms = [
  'Easily distracted or trouble staying on task',
  'Difficulty following multi-step instructions',
  'Struggles with reading or writing',
  'Avoids social interaction or group activities',
  'Frequent meltdowns or emotional outbursts',
  'Clumsy or poor balance',
  'Difficulty sleeping or resting',
  'Low self-esteem or confidence',
  'Trouble transitioning between activities',
  'Over-sensitive to sounds, textures, or lights',
];

const provinces = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State',
  'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West',
];

export default function AssessmentQuiz({ isOpen, onClose }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    age: '',
    selectedConcerns: [] as string[],
    selectedSymptoms: [] as string[],
    name: '',
    phone: '',
    email: '',
    city: '',
    province: '',
    country: 'South Africa',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggleConcern = useCallback((id: string) => {
    setAnswers((prev) => ({
      ...prev,
      selectedConcerns: prev.selectedConcerns.includes(id)
        ? prev.selectedConcerns.filter((c) => c !== id)
        : [...prev.selectedConcerns, id],
    }));
  }, []);

  const toggleSymptom = useCallback((symptom: string) => {
    setAnswers((prev) => ({
      ...prev,
      selectedSymptoms: prev.selectedSymptoms.includes(symptom)
        ? prev.selectedSymptoms.filter((s) => s !== symptom)
        : [...prev.selectedSymptoms, symptom],
    }));
  }, []);

  const handleSubmit = async () => {
    setStatus('submitting');

    const concernLabels = answers.selectedConcerns
      .map((c) => concerns.find((cn) => cn.id === c)?.label || c)
      .join(', ');

    const symptomList = answers.selectedSymptoms.length > 0
      ? answers.selectedSymptoms.map((s) => `  - ${s}`).join('\n')
      : '  None selected';

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: answers.name || 'Anonymous Assessment',
          from_email: answers.email || 'assessment@sabsa.co.za',
          from_phone: answers.phone || 'Not provided',
          message: `FULL NAME: ${answers.name || 'Not provided'}\nEMAIL: ${answers.email || 'Not provided'}\nPHONE: ${answers.phone || 'Not provided'}\nLOCATION: ${answers.city || 'Not provided'}, ${answers.province || 'Not provided'}, ${answers.country}\n\n--- ASSESSMENT RESULTS ---\n\nAGE GROUP: ${answers.age || 'Not selected'}\n\nCONCERNS:\n  ${concernLabels || 'None selected'}\n\nSYMPTOMS:\n${symptomList}\n\n--- END ---`,
          to_email: 'info@brainsensory.co.za',
          reply_to: answers.email || '',
        },
        PUBLIC_KEY
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = useCallback(() => {
    setStep(0);
    setAnswers({ age: '', selectedConcerns: [], selectedSymptoms: [], name: '', phone: '', email: '', city: '', province: '', country: 'South Africa' });
    setStatus('idle');
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  const totalSteps = 6;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm" onClick={reset} />

      <div className="relative w-full max-w-[580px] max-h-[92vh] overflow-y-auto glass-card border border-[rgba(255,255,255,0.12)] rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-7 py-5 bg-[rgba(10,22,40,0.95)] border-b border-[rgba(255,255,255,0.08)] rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[rgba(6,182,212,0.15)] border border-[rgba(6,182,212,0.3)] flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <div>
              <span className="font-semibold text-white text-sm block">SABSA Assessment</span>
              <span className="font-mono text-[0.6rem] text-[rgba(255,255,255,0.4)] tracking-[0.1em]">SA BRAIN SENSORY ACTIVATION</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`h-[6px] rounded-full transition-all duration-300 ${i <= step ? 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] w-5' : 'bg-[rgba(255,255,255,0.12)] w-[6px]'}`} />
              ))}
            </div>
            <button onClick={reset} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <X className="w-5 h-5 text-[rgba(255,255,255,0.5)]" />
            </button>
          </div>
        </div>

        <div className="p-7 md:p-9">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[rgba(6,182,212,0.2)] to-[rgba(37,99,235,0.1)] border-2 border-[#06B6D4] flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-[#06B6D4]" />
              </div>
              <h3 className="font-bold text-[1.75rem] text-white mb-3">Assessment Complete</h3>
              <p className="text-[rgba(255,255,255,0.7)] mb-2">
                Thank you, <span className="text-white font-medium">{answers.name || 'there'}</span>.
              </p>
              <p className="text-[rgba(255,255,255,0.5)] text-sm">
                Your assessment has been sent to <span className="text-[#06B6D4] font-medium">info@brainsensory.co.za</span>.
              </p>
              {answers.selectedConcerns.length > 0 && (
                <div className="mt-6 glass-card p-5 rounded-2xl text-left">
                  <p className="font-mono text-[0.7rem] text-[#06B6D4] tracking-[0.1em] uppercase mb-3">Areas we can help with</p>
                  <div className="flex flex-wrap gap-2">
                    {answers.selectedConcerns.map((c) => {
                      const concern = concerns.find((cn) => cn.id === c);
                      return (
                        <span key={c} className="px-4 py-2 rounded-full bg-[rgba(6,182,212,0.1)] border border-[rgba(6,182,212,0.25)] text-[#06B6D4] text-sm font-medium">
                          {concern?.label || c}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              <p className="text-[rgba(255,255,255,0.5)] mt-6 text-sm">
                A SABSA specialist will contact you within 24 hours.
              </p>
              <a href="https://wa.me/27685707475" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-sm rounded-full px-8 py-4 hover:brightness-110 hover:shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all">
                <PhoneCall className="w-5 h-5" />
                WhatsApp Us Now
              </a>
            </div>
          ) : (
            <>
              {/* Step 0: Intro */}
              {step === 0 && (
                <div className="text-center">
                  <h2 className="font-bold text-[1.75rem] md:text-[2.25rem] text-white leading-tight mb-4">
                    Is SABSA Right<br />for You or Your Child?
                  </h2>
                  <p className="text-[rgba(255,255,255,0.65)] mb-8 leading-relaxed text-[1.05rem]">
                    Take our quick assessment. In just a few minutes, you will get personalised
                    insight into challenges and how they connect to the brain.
                  </p>
                  <div className="space-y-3 text-left glass-card p-6 rounded-2xl mb-8">
                    {[
                      { icon: Check, text: 'Takes only a few minutes' },
                      { icon: Check, text: 'Confidential and secure' },
                      { icon: Check, text: 'Immediate insight with clear next steps' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[rgba(6,182,212,0.15)] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-[#06B6D4]" />
                        </div>
                        <span className="text-[rgba(255,255,255,0.85)] text-[0.95rem]">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Age */}
              {step === 1 && (
                <div>
                  <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-5">
                    <User className="w-3.5 h-3.5" /> What is the age group?
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {ageGroups.map((age) => (
                      <button
                        key={age.value}
                        onClick={() => { setAnswers((p) => ({ ...p, age: age.value })); setStep(2); }}
                        className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all duration-300 ${
                          answers.age === age.value
                            ? 'border-[#06B6D4] bg-[rgba(6,182,212,0.1)]'
                            : 'border-[rgba(255,255,255,0.08)] bg-[rgba(10,22,40,0.4)] hover:border-[rgba(255,255,255,0.2)]'
                        }`}
                      >
                        <span className="text-white font-medium text-[1.05rem]">{age.label}</span>
                        {answers.age === age.value && <Check className="w-5 h-5 text-[#06B6D4]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Concerns */}
              {step === 2 && (
                <div>
                  <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-5">
                    <Brain className="w-3.5 h-3.5" /> What are your primary concerns?
                  </label>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-5">Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {concerns.map((concern) => {
                      const Icon = concern.icon;
                      const isSelected = answers.selectedConcerns.includes(concern.id);
                      return (
                        <button
                          key={concern.id}
                          onClick={() => toggleConcern(concern.id)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-[#06B6D4] bg-[rgba(6,182,212,0.1)]'
                              : 'border-[rgba(255,255,255,0.08)] bg-[rgba(10,22,40,0.4)] hover:border-[rgba(255,255,255,0.2)]'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-[rgba(6,182,212,0.2)]' : 'bg-[rgba(255,255,255,0.05)]'}`}>
                            <Icon className={`w-4.5 h-4.5 ${isSelected ? 'text-[#06B6D4]' : 'text-[rgba(255,255,255,0.4)]'}`} />
                          </div>
                          <span className="text-white text-[0.95rem] font-medium">{concern.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Symptoms */}
              {step === 3 && (
                <div>
                  <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-5">
                    <HeartPulse className="w-3.5 h-3.5" /> Which symptoms have you noticed?
                  </label>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-5">Select all that apply.</p>
                  <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                    {symptoms.map((symptom) => {
                      const isSelected = answers.selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          onClick={() => toggleSymptom(symptom)}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-[#06B6D4] bg-[rgba(6,182,212,0.1)]'
                              : 'border-[rgba(255,255,255,0.08)] bg-[rgba(10,22,40,0.4)] hover:border-[rgba(255,255,255,0.2)]'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#06B6D4] border-[#06B6D4]' : 'border-[rgba(255,255,255,0.25)]'
                          }`}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-[rgba(255,255,255,0.9)] text-[0.95rem]">{symptom}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Location */}
              {step === 4 && (
                <div>
                  <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-5">
                    <MapPin className="w-3.5 h-3.5" /> Where are you located?
                  </label>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-6">
                    This helps us connect you with the nearest SABSA program.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[0.75rem] font-mono tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">City / Town *</label>
                      <input
                        type="text"
                        required
                        value={answers.city}
                        onChange={(e) => setAnswers((p) => ({ ...p, city: e.target.value }))}
                        placeholder="e.g. Johannesburg, Cape Town, Durban"
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.75rem] font-mono tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">Province *</label>
                      <select
                        required
                        value={answers.province}
                        onChange={(e) => setAnswers((p) => ({ ...p, province: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                      >
                        <option value="" disabled className="bg-[#0A1628]">Select your province</option>
                        {provinces.map((p) => (
                          <option key={p} value={p} className="bg-[#0A1628]">{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[0.75rem] font-mono tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">Country *</label>
                      <input
                        type="text"
                        value={answers.country}
                        onChange={(e) => setAnswers((p) => ({ ...p, country: e.target.value }))}
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Contact */}
              {step === 5 && (
                <div>
                  <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[#06B6D4] uppercase mb-5">
                    <User className="w-3.5 h-3.5" /> Almost done — your details
                  </label>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm mb-6">
                    A SABSA specialist will contact you within 24 hours.
                  </p>
                  <div className="space-y-5">
                    <div>
                      <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">
                        <User className="w-3 h-3" /> Full Name
                      </label>
                      <input
                        type="text"
                        value={answers.name}
                        onChange={(e) => setAnswers((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">
                        <Mail className="w-3 h-3" /> Email
                      </label>
                      <input
                        type="email"
                        value={answers.email}
                        onChange={(e) => setAnswers((p) => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[0.75rem] font-mono tracking-[0.08em] text-[rgba(255,255,255,0.5)] uppercase mb-2">
                        <Phone className="w-3 h-3" /> Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={answers.phone}
                        onChange={(e) => setAnswers((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+27 ..."
                        className="w-full bg-[rgba(10,22,40,0.5)] border border-[rgba(255,255,255,0.1)] rounded-2xl px-5 py-4 text-[1.05rem] text-white placeholder-[rgba(255,255,255,0.35)] focus:border-[#06B6D4] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                  {status === 'error' && (
                    <div className="mt-5 p-4 rounded-xl bg-[rgba(230,57,70,0.1)] border border-[rgba(230,57,70,0.3)] flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#E63946] flex-shrink-0 mt-0.5" />
                      <p className="text-[#E63946] text-sm">Failed to send. Please try again or contact us on WhatsApp.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-9">
                {step > 0 && step < totalSteps - 1 ? (
                  <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 text-[rgba(255,255,255,0.5)] hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-full hover:bg-[rgba(255,255,255,0.05)]">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step === 0 ? (
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-[0.95rem] rounded-full px-7 py-4 hover:brightness-110 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all">
                    Get Started <ChevronRight className="w-5 h-5" />
                  </button>
                ) : step === 1 ? (
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-[0.95rem] rounded-full px-7 py-4 hover:brightness-110 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all">
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                ) : step === totalSteps - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!answers.phone || status === 'submitting'}
                    className={`flex items-center gap-2 font-bold text-[0.95rem] rounded-full px-7 py-4 transition-all ${
                      answers.phone && status !== 'submitting'
                        ? 'bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white hover:brightness-110 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                        : 'bg-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.3)] cursor-not-allowed'
                    }`}
                  >
                    {status === 'submitting' ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                    ) : (
                      <>Submit Assessment <Check className="w-5 h-5" /></>
                    )}
                  </button>
                ) : (
                  <button onClick={() => setStep((s) => s + 1)} className="flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white font-bold text-[0.95rem] rounded-full px-7 py-4 hover:brightness-110 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all">
                    Continue <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

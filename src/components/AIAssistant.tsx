import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';

const PRESET_QUESTIONS = [
  'What is sensory processing?',
  'Why am I sensitive to sounds?',
  'How can Brain Sense help me?',
  'What age groups do you support?',
  'Is this approach drug-free?',
];

// Placeholder responses — replace with real AI API integration later
const MOCK_RESPONSES: Record<string, string> = {
  'What is sensory processing?':
    'Sensory processing is the way your nervous system receives, interprets and responds to information from your senses — sight, sound, touch, movement, and body position. When this system works well, it happens automatically. When it doesn\'t, everyday activities can feel overwhelming or confusing.',
  'Why am I sensitive to sounds?':
    'Sound sensitivity often indicates auditory over-responsivity — your nervous system is amplifying input that others filter out naturally. This is a recognised sensory processing difference, not a personality trait. The Brain Sense auditory programme uses rhythmic entrainment to help recalibrate your auditory threshold.',
  'How can Brain Sense help me?':
    'Brain Sense begins with a comprehensive sensory profile assessment to understand exactly how your nervous system processes information. From there, a personalised, drug-free programme is designed using rhythmic movement, sensory activation techniques, and neuroplasticity exercises to improve regulation, focus, and performance.',
  'What age groups do you support?':
    'We support all ages — from toddlers with developmental concerns, school-age children with learning and behavioural challenges, teenagers managing anxiety, to adults seeking performance optimisation and elderly individuals improving balance and cognitive function.',
  'Is this approach drug-free?':
    'Yes — 100%. The Brain Sense method uses sensory activation, rhythmic movement, and neuroplasticity-based exercises. There are no medications, supplements, or chemical interventions of any kind. Our approach works with your brain\'s own capacity to reorganise and strengthen itself.',
};

type Message = { role: 'user' | 'assistant'; text: string };

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi! I'm the Brain Sense AI assistant. Ask me anything about sensory processing, our programmes, or how we can help you.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const question = text.trim();
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setTyping(true);

    // Simulate response delay
    setTimeout(
      () => {
        const response =
          MOCK_RESPONSES[question] ||
          "That's a great question. For detailed, personalised answers please contact our team directly at info@brainsensory.co.za or use the contact form below — we'd love to help.";
        setTyping(false);
        setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
      },
      800 + Math.random() * 600
    );
  };

  return (
    <section
      id="ai-assistant"
      className="relative py-24 px-6 overflow-hidden bg-[rgba(10,22,40,0.95)]"
    >
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB] opacity-[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.07)] text-[#06B6D4] text-[0.75rem] font-mono tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-POWERED · COMING SOON
          </div>
          <h2 className="font-bold text-[clamp(2rem,5vw,3rem)] leading-tight tracking-tight text-white mb-4">
            Ask the Brain Sense{' '}
            <span className="text-gradient-blue">AI Assistant</span>
          </h2>
          <p className="text-[rgba(255,255,255,0.6)] text-[clamp(0.9rem,1.3vw,1.05rem)] leading-relaxed max-w-xl mx-auto">
            Get instant, evidence-based answers about sensory processing, our approach, and how we
            can support you or your child.
          </p>
        </div>

        {/* Chat interface */}
        <div className="glass-card overflow-hidden max-w-2xl mx-auto">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.07)]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-[0.875rem] font-semibold">Brain Sense Assistant</p>
              <p className="text-[rgba(255,255,255,0.4)] text-[0.7rem]">Sensory neuroscience · Always available</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[0.7rem] text-[rgba(255,255,255,0.4)]">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto flex flex-col gap-4 p-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-[0.875rem] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#2563EB] text-white rounded-tr-sm'
                      : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.85)] rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-[rgba(255,255,255,0.06)] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                  {[0, 1, 2].map((j) => (
                    <div
                      key={j}
                      className="w-1.5 h-1.5 rounded-full bg-[rgba(255,255,255,0.4)]"
                      style={{ animation: `bounce 1s ease infinite ${j * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset questions */}
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {PRESET_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-[0.72rem] px-3 py-1.5 rounded-full border border-[rgba(6,182,212,0.25)] text-[rgba(6,182,212,0.8)] hover:border-[rgba(6,182,212,0.5)] hover:text-[#06B6D4] transition-all duration-200 bg-[rgba(6,182,212,0.05)]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <form
              className="flex gap-2 mt-1"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white text-[0.875rem] placeholder-[rgba(255,255,255,0.3)] outline-none focus:border-[rgba(6,182,212,0.4)] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center shrink-0 disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
            <p className="text-center text-[0.65rem] text-[rgba(255,255,255,0.25)] mt-3">
              AI responses are informational only. For clinical advice, contact our team directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

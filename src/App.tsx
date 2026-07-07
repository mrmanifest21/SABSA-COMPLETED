import { useState } from 'react';
import NeuralRibbon from './components/NeuralRibbon';
import Navigation from './components/Navigation';
import AssessmentQuiz from './components/AssessmentQuiz';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import NeuralConnections from './sections/NeuralConnections';
import SensoryProcessing from './sections/SensoryProcessing';
import RegulationPerformance from './sections/RegulationPerformance';
import About from './sections/About';
import Science from './sections/Science';
import Programs from './sections/Programs';
import HowItWorks from './sections/HowItWorks';
import Difference from './sections/Difference';
import Founder from './sections/Founder';
import Impact from './sections/Impact';
import Testimonials from './sections/Testimonials';
import Gallery from './sections/Gallery';
import GetStarted from './sections/GetStarted';
import Contact from './sections/Contact';

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);

  const openQuiz = () => setQuizOpen(true);
  const closeQuiz = () => setQuizOpen(false);

  return (
    <div className="relative min-h-screen bg-[#0A1628]">
      {/* 3D Neural Ribbon Background — persistent throughout */}
      <NeuralRibbon />

      {/* Navigation */}
      <Navigation />

      {/* Assessment Quiz Popup */}
      <AssessmentQuiz isOpen={quizOpen} onClose={closeQuiz} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Main Content */}
      <main className="relative">
        {/* ── Immersive cinematic intro ── */}
        <Hero onOpenQuiz={openQuiz} />
        <NeuralConnections />
        <SensoryProcessing />
        <RegulationPerformance />

        {/* ── Existing SABSA content ── */}
        <About />
        <Science />
        <Programs />
        <HowItWorks />
        <Difference />
        <Founder />
        <Impact />
        <Testimonials />
        <Gallery />
        <GetStarted onOpenQuiz={openQuiz} />

        {/* ── AI Assistant (future-ready) ── */}
        <AIAssistant />

        {/* ── Contact / Services & Booking ── */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

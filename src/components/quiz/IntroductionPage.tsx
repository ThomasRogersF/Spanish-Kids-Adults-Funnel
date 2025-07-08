
import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react';

interface IntroductionPageProps {
  onStart: () => void;
  onDebugOffer?: () => void;
}

const LOGO_URL =
  'https://spanishvip.com/wp-content/uploads/2025/06/SpanishVIP-Original-Logo.png';
const HERO_IMAGE_URL =
  'https://spanishvip.com/wp-content/uploads/2025/06/Spanish-Learning-for-All-Ages.png';

const testimonials = [
  {
    name: 'Koji',
    role: 'SpanishVIP Student',
    quote:
      'I can finally talk to my grandchildren in Spanish!',
    image: 'https://spanishvip.com/wp-content/uploads/2025/07/Captura-de-pantalla-2025-07-08-181137.png',
    video: 'https://spanishvip.com/wp-content/uploads/2025/07/Koji-Testimonial-Video.mp4',
    rating: 5,
  },
  {
    name: 'Suzanne',
    role: 'SpanishVIP Student',
    quote:
      'My confidence has skyrocketed!',
    image: 'https://spanishvip.com/wp-content/uploads/2025/07/Captura-de-pantalla-2025-07-08-181102.png',
    video: 'https://spanishvip.com/wp-content/uploads/2025/07/Suzanne-Testimonial-Video.mp4',
    rating: 5,
  },
  {
    name: 'Catie',
    role: 'SpanishVIP Student',
    quote:
      'Learning Spanish opened new doors!',
    image: 'https://spanishvip.com/wp-content/uploads/2025/07/Captura-de-pantalla-2025-07-08-181037.png',
    video: 'https://spanishvip.com/wp-content/uploads/2024/02/catie-reel.mp4',
    rating: 5,
  },
];

export default function IntroductionPage({ onStart, onDebugOffer }: IntroductionPageProps) {
  const [videoModal, setVideoModal] = useState<{ open: boolean; videoUrl: string | null }>({ open: false, videoUrl: null });

  const openVideoModal = (videoUrl: string) => {
    setVideoModal({ open: true, videoUrl });
  };
  const closeVideoModal = () => {
    setVideoModal({ open: false, videoUrl: null });
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col font-sans">
      {/* Header */}
      <header className="w-full flex flex-col items-center pt-8 pb-2">
        <img
          src={LOGO_URL}
          alt="SpanishVIP Logo"
          className="h-14 mb-2"
          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.04))' }}
        />
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-12 py-6 md:py-12 max-w-6xl mx-auto w-full">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            It's Never Too Late to <br />
            <span className="text-[#F36A20]">Master Spanish!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Take our quick quiz to discover the ideal learning style for you, and unlock a special offer to start your journey today.
          </p>
          <div className="text-left inline-block mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 text-lg">Why Spanish Learning After 50 is Perfect:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-base">
                <span className="text-[#3EB489] text-xl">✅</span> Start learning at your own comfortable pace
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-[#3EB489] text-xl">✅</span> Boost your brain health and memory
              </li>
              <li className="flex items-center gap-2 text-base">
                <span className="text-[#3EB489] text-xl">✅</span> Achieve your lifelong dream of speaking Spanish
              </li>
            </ul>
          </div>
          <button
            onClick={onStart}
            className="mt-2 px-8 py-3 bg-[#F36A20] text-white font-semibold rounded-full text-lg flex items-center gap-2 shadow-lg hover:bg-[#e85c0c] transition-colors duration-200 mx-auto md:mx-0"
          >
            Start Now <ArrowRight className="w-5 h-5" />
          </button>
          {onDebugOffer && (
            <button
              onClick={onDebugOffer}
              className="mt-4 px-8 py-3 bg-brand-primary text-white font-semibold rounded-full text-lg flex items-center gap-2 shadow-lg hover:bg-orange-600 transition-colors duration-200 mx-auto md:mx-0"
            >
              Debug: Go to Offer Page
            </button>
          )}
        </div>
        {/* Right: Image with video call UI */}
        <div className="flex-1 flex items-center justify-center relative max-w-md w-full">
          <div className="relative w-full max-w-xs md:max-w-sm rounded-3xl overflow-hidden shadow-xl bg-white">
            <img
              src={HERO_IMAGE_URL}
              alt="Older adult learning Spanish via video call"
              className="w-full h-80 object-cover object-center rounded-3xl"
            />
            {/* Video call UI overlay */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-4">
              <div className="flex gap-3 bg-white/80 rounded-full px-4 py-2 shadow-md">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 10v4M9 10v4M21 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2l1-2h6l1 2h2a2 2 0 0 1 2 2Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F36A20] hover:bg-[#e85c0c]">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 10v4M9 10v4M21 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2l1-2h6l1 2h2a2 2 0 0 1 2 2Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3EB489] hover:bg-[#2fa77e]">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.5"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicator */}
      <section className="w-full text-center mt-6 mb-2">
        <p className="text-gray-500 text-base tracking-wide mb-1">Trusted by Thousands</p>
      </section>

      {/* Testimonials */}
      <section className="w-full flex flex-col items-center px-4 pb-12">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg p-6 flex-1 flex flex-col items-center max-w-sm min-w-[260px] relative"
            >
              <div className="relative mb-4 w-24 h-24 cursor-pointer" onClick={() => openVideoModal(t.video)}>
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-24 h-24 object-cover rounded-full border-4 border-[#F36A20] shadow-md"
                />
                {/* Play icon overlay */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <circle cx="19" cy="19" r="19" fill="#F36A20" fillOpacity="0.85" />
                    <polygon points="15,12 28,19 15,26" fill="#fff" />
                  </svg>
                </span>
              </div>
              <blockquote className="italic text-gray-700 text-base mb-3 text-center">“{t.quote}”</blockquote>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{t.name}</span>
                <span className="text-gray-400 text-sm">{t.role}</span>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-[#F36A20] text-lg">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Video Modal */}
        {videoModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-lg w-full relative flex flex-col items-center">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                onClick={closeVideoModal}
                aria-label="Close video"
              >
                ×
              </button>
              <video
                src={videoModal.videoUrl || undefined}
                controls
                autoPlay
                className="w-full rounded-xl max-h-[70vh]"
                poster=""
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { animationClasses } from '@/lib/animations';

interface InterstitialContent {
  headline: string;
  body: string;
  bullets: string[];
  footer: string;
  buttonText: string;
}

const interstitialContent: Record<'a' | 'b', InterstitialContent> = {
  a: {
    headline: "Your goal shapes your plan",
    body: "Factors like travel, family, or personal growth change what you should practice first. A focused plan builds confidence faster.",
    bullets: [
      "Real conversation practice",
      "CEFR roadmap", 
      "Flexible group or 1-on-1 options"
    ],
    footer: "Why we ask: matching your goal = fewer detours, more wins.",
    buttonText: "Continue →"
  },
  b: {
    headline: "Your style determines what works",
    body: "Prefer group energy, 1-on-1 guidance, or a combo? We'll align activities for the right mix of speaking, feedback, and structure.",
    bullets: [
      "Live classes",
      "Targeted home practice",
      "Easy schedule swaps"
    ],
    footer: "What's next: tell us your weekly time — we'll fit sessions to your routine.",
    buttonText: "Continue →"
  }
};

interface InterstitialStepProps {
  type: 'a' | 'b';
  onContinue: () => void;
  isTransitioning?: boolean;
}

const InterstitialStep: React.FC<InterstitialStepProps> = ({ 
  type, 
  onContinue, 
  isTransitioning = false 
}) => {
  const content = interstitialContent[type];
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    if (!isTransitioning && continueButtonRef.current) {
      continueButtonRef.current.focus();
    }
  }, [isTransitioning]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onContinue();
    }
  };

  return (
    <div 
      className={`interstitial-step-container ${
        isTransitioning ? animationClasses.interstitialFadeOut : animationClasses.interstitialFadeIn
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="interstitial-headline"
      aria-describedby="interstitial-body"
    >
      <div className="interstitial-content-wrapper interstitial-stagger-children">
        <h1 id="interstitial-headline" className="interstitial-headline">
          {content.headline}
        </h1>
        <p id="interstitial-body" className="interstitial-body">
          {content.body}
        </p>
        
        <ul className="interstitial-bullets">
          {content.bullets.map((bullet, index) => (
            <li key={index} className="interstitial-bullet">
              <span className="bullet-text">{bullet}</span>
            </li>
          ))}
        </ul>
        
        <p className="interstitial-footer">{content.footer}</p>
        
        <button 
          ref={continueButtonRef}
          className={`interstitial-continue-button ${
            isTransitioning ? '' : 'interstitial-button-appear'
          }`}
          onClick={onContinue}
          onKeyDown={handleKeyDown}
          disabled={isTransitioning}
          aria-label="Continue to next question"
        >
          {content.buttonText}
        </button>
      </div>
    </div>
  );
};

export default InterstitialStep;
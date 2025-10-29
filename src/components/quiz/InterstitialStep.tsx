import React, { useEffect, useRef } from 'react';
import { animationClasses } from '@/lib/animations';

interface InterstitialContent {
  headline: string;
  body: string;
  bullets: string[];
  footer: string;
  buttonText: string;
}

const interstitialContent: Record<'a' | 'b' | 'c', InterstitialContent> = {
  a: {
    headline: "Your goal shapes your plan",
    body: "For community practice and great value, learners pick Group (unlimited Mon-Fri). If you want a teacher who plans just for you, choose Private with a free 1:1 trial.",
    bullets: [
      "Real conversation practice",
      "CEFR roadmap",
      "Flexible group or 1-on-1 options"
    ],
    footer: "We ask this to recommend the option that fits your time, budget, and confidence.",
    buttonText: "Continue →"
  },
  b: {
    headline: "Group = momentum + value",
    body: "Join our unlimited group sessions and build momentum with peers at your level.",
    bullets: [
      "Unlimited sessions Mon-Fri at your level (CEFR)",
      "Learn with a global peer group, led by native teachers",
      "Fixed monthly price, join as often as you like"
    ],
    footer: "Group is designed for adults 18+.",
    buttonText: "Continue →"
  },
  c: {
    headline: "Private = your teacher, your plan",
    body: "Get personalized attention and accelerate your progress with dedicated instruction.",
    bullets: [
      "A dedicated, native teacher plans every session around your goals",
      "Flexible times, direct feedback, faster course-corrections",
      "Try a free 1:1 class before you decide"
    ],
    footer: "Private tutoring adapts completely to your schedule and learning style.",
    buttonText: "Continue →"
  }
};

interface InterstitialStepProps {
  type: 'a' | 'b' | 'c';
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
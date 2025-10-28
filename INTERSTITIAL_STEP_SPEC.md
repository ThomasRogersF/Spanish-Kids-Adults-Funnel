# InterstitialStep Component Technical Specification

## Component Interface

### Props
```typescript
interface InterstitialStepProps {
  type: 'a' | 'b';
  onContinue: () => void;
  isTransitioning?: boolean;
}
```

### Content Data Structure
```typescript
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
```

## Component Structure

### JSX Structure
```jsx
<div className="interstitial-step-container">
  <div className="interstitial-content-wrapper">
    <h1 className="interstitial-headline">{content.headline}</h1>
    <p className="interstitial-body">{content.body}</p>
    
    <ul className="interstitial-bullets">
      {content.bullets.map((bullet, index) => (
        <li key={index} className="interstitial-bullet">
          <span className="bullet-text">{bullet}</span>
        </li>
      ))}
    </ul>
    
    <p className="interstitial-footer">{content.footer}</p>
    
    <button 
      className="interstitial-continue-button"
      onClick={onContinue}
      disabled={isTransitioning}
    >
      {content.buttonText}
    </button>
  </div>
</div>
```

## CSS Classes & Styling

### Container
```css
.interstitial-step-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--svip-bg);
  z-index: 50;
}
```

### Content Wrapper
```css
.interstitial-content-wrapper {
  max-width: 640px;
  width: 100%;
  padding: 2rem;
  text-align: center;
}
```

### Typography
```css
.interstitial-headline {
  font-size: 2rem;
  font-weight: 600;
  color: var(--svip-ink);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.interstitial-body {
  font-size: 1.125rem;
  color: var(--svip-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.interstitial-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.interstitial-bullet {
  font-size: 1.125rem;
  color: var(--svip-ink);
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
}

.interstitial-bullet::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--svip-accent);
  font-weight: bold;
}

.interstitial-footer {
  font-size: 0.875rem;
  color: var(--svip-muted);
  margin-bottom: 2rem;
  font-style: italic;
}
```

### Button Styling
```css
.interstitial-continue-button {
  background-color: var(--svip-accent);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.interstitial-continue-button:hover:not(:disabled) {
  background-color: var(--svip-accent-dark);
  transform: translateY(-2px);
}

.interstitial-continue-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

## Animation Implementation

### Animation Classes
```css
/* Container animations */
.interstitial-fade-in {
  animation: interstitial-fade-in 500ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.interstitial-fade-out {
  animation: interstitial-fade-out 500ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

/* Staggered child animations */
.interstitial-stagger-children > * {
  opacity: 0;
  transform: translateY(8px);
  animation: text-reveal-up 400ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.interstitial-stagger-children > *:nth-child(1) { animation-delay: 100ms; }
.interstitial-stagger-children > *:nth-child(2) { animation-delay: 140ms; }
.interstitial-stagger-children > *:nth-child(3) { animation-delay: 180ms; }
.interstitial-stagger-children > *:nth-child(4) { animation-delay: 220ms; }
.interstitial-stagger-children > *:nth-child(5) { animation-delay: 260ms; }
.interstitial-stagger-children > *:nth-child(6) { animation-delay: 300ms; }
```

### Keyframes
```css
@keyframes interstitial-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes interstitial-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes text-reveal-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .interstitial-fade-in,
  .interstitial-fade-out,
  .interstitial-stagger-children > * {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
  }
  
  .interstitial-stagger-children > * {
    opacity: 1;
    transform: none;
  }
}
```

## Responsive Design

### Mobile (< 768px)
```css
@media (max-width: 767px) {
  .interstitial-content-wrapper {
    padding: 1.5rem;
  }
  
  .interstitial-headline {
    font-size: 1.75rem;
  }
  
  .interstitial-body,
  .interstitial-bullet {
    font-size: 1rem;
  }
}
```

### Desktop (≥ 768px)
```css
@media (min-width: 768px) {
  .interstitial-content-wrapper {
    padding: 3rem;
  }
  
  .interstitial-headline {
    font-size: 2.5rem;
  }
}
```

## Accessibility Features

### ARIA Attributes
```jsx
<div 
  className="interstitial-step-container"
  role="dialog"
  aria-modal="true"
  aria-labelledby="interstitial-headline"
  aria-describedby="interstitial-body"
>
  <h1 id="interstitial-headline" className="interstitial-headline">
    {content.headline}
  </h1>
  <p id="interstitial-body" className="interstitial-body">
    {content.body}
  </p>
  {/* ... rest of content */}
</div>
```

### Keyboard Navigation
```jsx
<button 
  className="interstitial-continue-button"
  onClick={onContinue}
  disabled={isTransitioning}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onContinue();
    }
  }}
>
  {content.buttonText}
</button>
```

### Focus Management
```typescript
useEffect(() => {
  if (!isTransitioning) {
    // Focus the continue button when interstitial becomes visible
    const continueButton = document.querySelector('.interstitial-continue-button');
    if (continueButton) {
      (continueButton as HTMLElement).focus();
    }
  }
}, [isTransitioning]);
```

## Performance Considerations

### CSS Optimizations
```css
.interstitial-step-container {
  will-change: opacity;
  transform: translateZ(0); /* Hardware acceleration */
}

.interstitial-stagger-children > * {
  will-change: opacity, transform;
}
```

### React Optimizations
```typescript
const InterstitialStep = React.memo<InterstitialStepProps>(({ 
  type, 
  onContinue, 
  isTransitioning = false 
}) => {
  // Component implementation
});

export default InterstitialStep;
```

## Testing Strategy

### Unit Tests
1. Render with different types ('a' and 'b')
2. Verify correct content is displayed
3. Test continue button functionality
4. Verify animation classes are applied
5. Test reduced motion behavior

### Integration Tests
1. Test transition from question to interstitial
2. Test transition from interstitial to question
3. Verify back navigation works correctly
4. Test keyboard navigation
5. Verify accessibility attributes

### Visual Tests
1. Verify responsive design at different breakpoints
2. Test animation timing and easing
3. Verify reduced motion alternatives
4. Test focus states and hover states
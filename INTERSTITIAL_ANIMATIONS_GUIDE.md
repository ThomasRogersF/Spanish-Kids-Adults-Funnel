# Interstitial Animations Implementation Guide

## Animation Requirements

### Timing & Easing
- **Duration**: 500ms for all interstitial transitions
- **Easing**: `cubic-bezier(0.22, 0.84, 0.36, 1)` (smooth, natural feel)
- **Stagger Delay**: 40ms between child elements
- **Offset**: 8px upward movement for text reveal

### Reduced Motion Support
- Respect `prefers-reduced-motion` media query
- Provide instant show/hide alternatives
- Maintain accessibility without motion

## CSS Animation Classes

### Container Animations
```css
/* Main interstitial container animations */
.interstitial-fade-in {
  animation: interstitial-fade-in 500ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.interstitial-fade-out {
  animation: interstitial-fade-out 500ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

/* Staggered children animations */
.interstitial-stagger-children > * {
  opacity: 0;
  transform: translateY(8px);
  animation: text-reveal-up 400ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

/* Individual stagger delays */
.interstitial-stagger-children > *:nth-child(1) { animation-delay: 100ms; }
.interstitial-stagger-children > *:nth-child(2) { animation-delay: 140ms; }
.interstitial-stagger-children > *:nth-child(3) { animation-delay: 180ms; }
.interstitial-stagger-children > *:nth-child(4) { animation-delay: 220ms; }
.interstitial-stagger-children > *:nth-child(5) { animation-delay: 260ms; }
.interstitial-stagger-children > *:nth-child(6) { animation-delay: 300ms; }
.interstitial-stagger-children > *:nth-child(7) { animation-delay: 340ms; }
```

### Button Animation
```css
.interstitial-button-appear {
  animation: button-appear 400ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
  animation-delay: 340ms;
}

.interstitial-button-hover {
  transition: all 0.2s cubic-bezier(0.22, 0.84, 0.36, 1);
}

.interstitial-button-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(15, 163, 177, 0.3);
}
```

## Keyframes Implementation

### Container Keyframes
```css
@keyframes interstitial-fade-in {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes interstitial-fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.98);
  }
}
```

### Text Reveal Keyframes
```css
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

### Button Keyframes
```css
@keyframes button-appear {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

## Reduced Motion Implementation

### Media Query for Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all animations */
  .interstitial-fade-in,
  .interstitial-fade-out,
  .interstitial-stagger-children > *,
  .interstitial-button-appear {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Show content immediately */
  .interstitial-stagger-children > * {
    opacity: 1;
    transform: none;
  }
  
  /* Remove hover effects that rely on motion */
  .interstitial-button-hover:hover {
    transform: none;
  }
}
```

## Performance Optimizations

### Hardware Acceleration
```css
.interstitial-step-container {
  will-change: opacity, transform;
  transform: translateZ(0); /* Force hardware acceleration */
  backface-visibility: hidden;
  perspective: 1000px;
}

.interstitial-stagger-children > * {
  will-change: opacity, transform;
  transform: translateZ(0);
}
```

### Smooth Rendering
```css
.interstitial-content-wrapper {
  contain: layout style paint;
  /* Prevent layout shifts during animation */
}

.interstitial-headline,
.interstitial-body,
.interstitial-bullet {
  /* Ensure smooth text rendering during animation */
  render-priority: high;
  text-rendering: optimizeLegibility;
}
```

## Animation Sequence Timing

### Entry Animation Timeline
```
0ms:     Container starts fading in (0-500ms)
100ms:    Headline starts revealing (100-500ms)
140ms:    Body text starts revealing (140-540ms)
180ms:    Bullet 1 starts revealing (180-580ms)
220ms:    Bullet 2 starts revealing (220-620ms)
260ms:    Bullet 3 starts revealing (260-660ms)
300ms:    Footer starts revealing (300-700ms)
340ms:    Button starts revealing (340-740ms)
500ms:    Container fully visible
740ms:    All elements fully visible
```

### Exit Animation Timeline
```
0ms:     Container starts fading out (0-500ms)
0ms:     All elements fade together
500ms:    Container fully hidden
```

## Browser Compatibility

### Vendor Prefixes
```css
@keyframes interstitial-fade-in {
  from {
    opacity: 0;
    transform: scale(0.98);
    -webkit-transform: scale(0.98);
    -moz-transform: scale(0.98);
    -ms-transform: scale(0.98);
    -o-transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
  }
}
```

### Fallback for Older Browsers
```css
/* Fallback for browsers that don't support animations */
.no-cssanimations .interstitial-step-container {
  opacity: 1;
  transform: none;
}

.no-cssanimations .interstitial-stagger-children > * {
  opacity: 1;
  transform: none;
}
```

## Debugging Tools

### Animation Debug Classes
```css
/* Debug mode to visualize animation timing */
.interstitial-debug .interstitial-stagger-children > *::before {
  content: attr(data-debug-timing);
  position: absolute;
  top: -20px;
  left: 0;
  font-size: 10px;
  color: red;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 4px;
  border-radius: 2px;
}

/* Slow motion for debugging */
.interstitial-debug-slow .interstitial-fade-in {
  animation-duration: 2000ms !important;
}

.interstitial-debug-slow .interstitial-stagger-children > * {
  animation-duration: 1000ms !important;
}
```

## Integration with Existing Animation System

### Update to animations.ts
```typescript
// Add to src/lib/animations.ts
export const animationClasses = {
  // ... existing classes
  
  // Interstitial animations
  interstitialFadeIn: 'animate-interstitial-fade-in',
  interstitialFadeOut: 'animate-interstitial-fade-out',
  interstitialStagger: 'animate-interstitial-stagger',
  textRevealUp: 'animate-text-reveal-up',
  buttonAppear: 'animate-button-appear',
};

export const durations = {
  // ... existing durations
  
  // Interstitial durations
  interstitialFade: 500,
  interstitialStagger: 400,
  interstitialButtonDelay: 340,
  interstitialStaggerDelay: 40,
};
```

### Update to index.css
```css
/* Add to src/index.css */
.animate-interstitial-fade-in {
  animation: interstitial-fade-in 500ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.animate-interstitial-fade-out {
  animation: interstitial-fade-out 500ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.animate-interstitial-stagger > * {
  opacity: 0;
  transform: translateY(8px);
  animation: text-reveal-up 400ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.animate-text-reveal-up {
  animation: text-reveal-up 400ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}

.animate-button-appear {
  animation: button-appear 400ms cubic-bezier(0.22, 0.84, 0.36, 1) forwards;
}
```

## Testing Strategy

### Visual Testing
1. Verify smooth fade-in/out transitions
2. Check stagger timing is visually appealing
3. Test reduced motion alternatives
4. Verify no layout shifts during animations

### Performance Testing
1. Monitor frame rate during animations
2. Check for memory leaks
3. Verify hardware acceleration is working
4. Test on low-end devices

### Cross-browser Testing
1. Test in Chrome, Firefox, Safari, Edge
2. Verify mobile browser compatibility
3. Test with different screen sizes
4. Check accessibility tools compatibility

## Troubleshooting

### Common Issues
1. **Janky animations**: Check for hardware acceleration
2. **Stagger not working**: Verify CSS selector specificity
3. **Reduced motion not respected**: Check media query syntax
4. **Performance issues**: Optimize will-change usage

### Debug Techniques
1. Use browser dev tools animation panel
2. Add debug classes to visualize timing
3. Test with slow motion animations
4. Monitor console for animation warnings
// CSS Animation Classes for smooth transitions

export const animationClasses = {
  // Fade animations
  fadeOut: 'animate-fade-out',
  fadeIn: 'animate-fade-in',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  fadeOutRight: 'animate-fade-out-right',
  fadeOutLeft: 'animate-fade-out-left',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  scaleUp: 'animate-scale-up',
  scaleDown: 'animate-scale-down',
  
  // Slide animations
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-in-left',
  slideRight: 'animate-slide-in-right',
  
  // Option specific animations
  optionSelected: 'animate-option-selected',
  optionFadeOut: 'animate-option-fade-out',
  optionHover: 'animate-option-hover',
  optionPress: 'animate-option-press',
  
  // Button animations
  buttonHover: 'animate-button-hover',
  buttonPress: 'animate-button-press',
  buttonRipple: 'animate-button-ripple',
  
  // Progress animations
  progressUpdate: 'animate-progress-update',
  progressPulse: 'animate-progress-pulse',
  
  // Stagger animations for lists
  staggerChildren: 'animate-stagger-children',
  staggerItem: 'animate-stagger-item',
  
  // Feedback animations
  success: 'animate-success',
  error: 'animate-error',
  shake: 'animate-shake',
  
  // Loading animations
  skeleton: 'animate-skeleton',
  pulse: 'animate-pulse',
  
  // Interstitial animations
  interstitialFadeIn: 'animate-interstitial-fade-in',
  interstitialFadeOut: 'animate-interstitial-fade-out',
  interstitialStagger: 'animate-interstitial-stagger',
  textRevealUp: 'animate-text-reveal-up',
  buttonAppear: 'animate-button-appear',
};

// Animation duration classes (in milliseconds)
export const durations = {
  fast: 150,              // Quick transitions
  normal: 300,            // Standard transitions
  slow: 450,              // Slower transitions
  optionSelect: 350,       // Option selection feedback
  questionTransition: 500,  // Question changes
  microInteraction: 200,     // Hover, focus states
  stageTransition: 600,      // Major view changes
};

// Animation easing functions
export const easings = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  smooth: 'cubic-bezier(0.22, 0.84, 0.36, 1)',
};
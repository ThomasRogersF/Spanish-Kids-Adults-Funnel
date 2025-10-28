# Interstitial Steps Implementation Plan

## Overview
Add two blank interstitial steps to the Spanish Learning Quiz flow:
- Interstitial A: After Q1 (before Q2)
- Interstitial B: After Q3 (before Q4)

## Key Requirements
1. Full-screen centered content with no chrome (logo, progress bar hidden)
2. Slower fade transitions (500ms) with custom easing
3. Text reveal animations with stagger effect
4. Reduced motion support
5. No impact on quiz state/answers

## Implementation Steps

### 1. Create InterstitialStep Component
Create a new component `src/components/quiz/InterstitialStep.tsx` with:
- Centered content layout
- Custom animations for text reveal
- Stagger effect for bullet points
- Reduced motion support
- Continue button with proper styling

### 2. Update Animation System
Extend `src/lib/animations.ts` with:
- New interstitial-specific animation classes
- 500ms duration for interstitial transitions
- Custom easing: `cubic-bezier(0.22, 0.84, 0.36, 1)`
- Stagger animation support

### 3. Update CSS Animations
Add new keyframes to `src/index.css`:
- `interstitial-fade-in` (500ms)
- `interstitial-fade-out` (500ms)
- `text-reveal-up` with stagger support
- Reduced motion variants

### 4. Update QuizController Logic
Modify `src/components/quiz/QuizController.tsx`:
- Add new quiz stage types for interstitials
- Implement interstitial flow logic after Q1 and Q3
- Handle hiding/showing chrome elements
- Manage transition states between questions and interstitials

### 5. Content Structure
Define content for both interstitials:
- Interstitial A: "Your goal shapes your plan"
- Interstitial B: "Your style determines what works"
- Bullet points with pill styling for key terms
- Micro-footer text

## Technical Details

### Component Structure
```
InterstitialStep
├── Full-screen container (no chrome)
├── Centered content wrapper
├── Headline (animated)
├── Body text (animated)
├── Bullet list (staggered animation)
├── Micro-footer (subtle)
└── Continue button (primary CTA)
```

### Animation Sequence
1. Parent container fades in (500ms)
2. Children elements stagger in (40ms delay between)
3. Each child has slight upward offset (y: 8px)
4. Reverse animation on exit

### State Management
- Track current step type (question vs interstitial)
- Maintain question history separately
- Preserve all answers during interstitials
- Handle back navigation properly

### Responsive Design
- Mobile-first approach
- Proper spacing for all screen sizes
- Touch-friendly button sizing
- Readable typography at all breakpoints

## File Changes Required

### New Files
1. `src/components/quiz/InterstitialStep.tsx` - Main interstitial component

### Modified Files
1. `src/components/quiz/QuizController.tsx` - Flow logic and state management
2. `src/lib/animations.ts` - New animation classes and durations
3. `src/index.css` - New keyframes and animation classes

## Testing Considerations
1. Verify smooth transitions between all step types
2. Test reduced motion preferences
3. Verify back navigation works correctly
4. Test responsive behavior on all screen sizes
5. Ensure no impact on quiz answers/state
6. Verify accessibility with screen readers

## Performance Considerations
1. Use CSS transforms for smooth animations
2. Minimize layout shifts during transitions
3. Proper cleanup of animation states
4. Efficient re-rendering during transitions
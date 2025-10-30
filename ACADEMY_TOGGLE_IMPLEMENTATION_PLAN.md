# Academy Toggle Implementation Plan

## Overview
Implement a dynamic CTA box with an interactive toggle component that allows users to optionally include the Academy premium add-on to their selected plan. The toggle will dynamically update payment links across all pricing tiers.

## Component Architecture

### 1. AcademyToggle Component
**File:** `src/components/quiz/AcademyToggle.tsx`

**Features:**
- Interactive switch using existing `Switch` component from `@/components/ui/switch`
- Visually distinct card design with gradient background
- Smooth animations and micro-interactions
- Touch-friendly controls for mobile devices
- Proper ARIA labels for accessibility
- Loading state to prevent link flickering

**Props:**
- `isChecked: boolean` - Current state of the toggle
- `onChange: (checked: boolean) => void` - Toggle change handler
- `isLoading?: boolean` - Optional loading state

**Styling:**
- Card with gradient background (orange to red theme matching brand)
- Prominent positioning above recommendation cards
- Responsive design with larger touch targets on mobile
- Smooth color transitions when toggling

### 2. Payment Links Configuration
**File:** `src/config/paymentLinks.ts`

**Structure:**
```typescript
export const paymentLinks = {
  group: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[GROUP_PLAN_ID]?...",
    withAcademy: "https://spanishvip.punchpass.com/passes/[GROUP_ACADEMY_ID]?..."
  },
  private: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[PRIVATE_PLAN_ID]?...",
    withAcademy: "https://spanishvip.punchpass.com/passes/[PRIVATE_ACADEMY_ID]?..."
  },
  bundled: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[BUNDLE_PLAN_ID]?...",
    withAcademy: "https://spanishvip.punchpass.com/passes/[BUNDLE_ACADEMY_ID]?..."
  },
  kids: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[KIDS_PLAN_ID]?...",
    withAcademy: "https://spanishvip.punchpass.com/passes/[KIDS_ACADEMY_ID]?..."
  }
};
```

**Base URL Pattern:**
Using the existing link from OfferPage.tsx as template:
```
https://spanishvip.punchpass.com/passes/99815?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=99815&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25
```

### 3. Updated RecommendationCard Component
**File:** `src/components/quiz/RecommendationCard.tsx`

**Changes:**
- Add `paymentLink` prop to accept dynamic payment URL
- Add `isLoading` prop for loading state
- Update button click handler to use dynamic payment link
- Add loading state styling to prevent flickering

**New Props:**
- `paymentLink?: string` - Dynamic payment URL
- `isLoading?: boolean` - Loading state for button

### 4. Updated RecommendationResults Component
**File:** `src/components/quiz/RecommendationResults.tsx`

**Changes:**
- Add state management for Academy toggle
- Import and render AcademyToggle component above recommendation cards
- Calculate and pass appropriate payment links to each RecommendationCard
- Handle toggle state changes and update payment links accordingly

**State Management:**
```typescript
const [isAcademyIncluded, setIsAcademyIncluded] = useState(false);
const [isTransitioning, setIsTransitioning] = useState(false);

const handleAcademyToggle = async (checked: boolean) => {
  setIsTransitioning(true);
  // Simulate loading to prevent flickering
  await new Promise(resolve => setTimeout(resolve, 300));
  setIsAcademyIncluded(checked);
  setIsTransitioning(false);
};
```

## Implementation Details

### Visual Design
- **Toggle Card:** Gradient background from orange-500 to red-500, rounded-2xl, shadow-xl
- **Switch Component:** Custom styling with larger touch targets (48px minimum)
- **Animations:** Smooth transitions using Framer Motion for card entrance and toggle state changes
- **Loading State:** Subtle opacity change and disabled state during transitions

### Accessibility Features
- **ARIA Labels:** Descriptive labels for screen readers
- **Keyboard Navigation:** Full keyboard support for toggle
- **Focus Management:** Visible focus indicators
- **Screen Reader Announcements:** State change announcements

### Responsive Design
- **Mobile:** Larger touch targets, simplified layout, stacked elements
- **Tablet:** Optimized spacing and sizing
- **Desktop:** Full layout with hover states and enhanced animations

### Performance Considerations
- **Debouncing:** Prevent rapid toggle state changes
- **Loading States:** Prevent UI flickering during link updates
- **Optimized Re-renders:** Efficient state management to minimize unnecessary updates

## File Structure
```
src/
├── components/quiz/
│   ├── AcademyToggle.tsx (NEW)
│   ├── RecommendationCard.tsx (UPDATED)
│   └── RecommendationResults.tsx (UPDATED)
├── config/
│   └── paymentLinks.ts (NEW)
└── types/
    └── payment.ts (NEW - optional, for TypeScript types)
```

## Testing Strategy
1. **Unit Tests:** Test AcademyToggle component behavior
2. **Integration Tests:** Test toggle state management across components
3. **Accessibility Tests:** Verify ARIA compliance and keyboard navigation
4. **Responsive Tests:** Test on various screen sizes
5. **User Interaction Tests:** Verify smooth transitions and loading states

## Implementation Order
1. Create payment links configuration
2. Build AcademyToggle component
3. Update RecommendationCard with dynamic payment links
4. Integrate AcademyToggle into RecommendationResults
5. Add animations and micro-interactions
6. Implement responsive design
7. Add accessibility features
8. Test and refine

## Success Criteria
- [ ] Toggle is prominently positioned above recommendation cards
- [ ] All "Get Started" buttons update payment links when toggled
- [ ] Smooth animations and color transitions work correctly
- [ ] Component is fully responsive with touch-friendly controls
- [ ] Proper ARIA labels and accessibility features are implemented
- [ ] Loading state prevents link flickering during transitions
- [ ] Payment links follow the specified pattern for all plan variants
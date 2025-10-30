# Academy Toggle Component Code Specification

## 1. AcademyToggle Component Implementation

### File: `src/components/quiz/AcademyToggle.tsx`

```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AcademyToggleProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  isLoading?: boolean;
}

export const AcademyToggle: React.FC<AcademyToggleProps> = ({
  isChecked,
  onChange,
  isLoading = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleChange = (checked: boolean) => {
    if (!isLoading) {
      onChange(checked);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <Card 
        className={cn(
          "relative overflow-hidden transition-all duration-500",
          "border-2 shadow-xl",
          isChecked 
            ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-400" 
            : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background elements */}
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </AnimatePresence>

        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <GraduationCap className={cn(
                  "w-8 h-8 transition-colors duration-300",
                  isChecked ? "text-white" : "text-orange-500"
                )} />
                <h3 className={cn(
                  "text-xl sm:text-2xl font-bold transition-colors duration-300",
                  isChecked ? "text-white" : "text-gray-900"
                )}>
                  SpanishVIP Academy
                </h3>
                {isChecked && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    INCLUDED
                  </Badge>
                )}
              </div>
              
              <p className={cn(
                "text-base sm:text-lg mb-4 transition-colors duration-300",
                isChecked ? "text-white/90" : "text-gray-600"
              )}>
                Get 24/7 access to interactive lessons, videos, and exercises—learn anytime, anywhere!
              </p>

              {/* Features list */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  { icon: Star, text: "Interactive Lessons" },
                  { icon: Zap, text: "Self-Paced Learning" },
                  { icon: GraduationCap, text: "Progress Tracking" }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-300",
                      isChecked 
                        ? "bg-white/20 text-white" 
                        : "bg-orange-100 text-orange-700"
                    )}
                  >
                    <feature.icon className="w-3 h-3" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Toggle */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <div className={cn(
                  "text-3xl sm:text-4xl font-bold mb-1 transition-colors duration-300",
                  isChecked ? "text-white" : "text-gray-900"
                )}>
                  {isChecked ? "FREE" : "+$0"}
                </div>
                <p className={cn(
                  "text-sm transition-colors duration-300",
                  isChecked ? "text-white/80" : "text-gray-500"
                )}>
                  Limited time offer
                </p>
              </div>

              {/* Enhanced Switch */}
              <div className="relative">
                <Switch
                  checked={isChecked}
                  onCheckedChange={handleToggleChange}
                  disabled={isLoading}
                  aria-label="Include SpanishVIP Academy premium add-on"
                  aria-describedby="academy-description"
                  className={cn(
                    "scale-125 transition-all duration-300",
                    isChecked && "data-[state=checked]:bg-white",
                    !isChecked && "data-[state=unchecked]:bg-orange-500"
                  )}
                />
                
                {/* Loading overlay */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full"
                  >
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </div>

              <p 
                id="academy-description"
                className={cn(
                  "text-xs sm:text-sm max-w-32 text-center transition-colors duration-300",
                  isChecked ? "text-white/80" : "text-gray-500"
                )}
              >
                {isChecked ? "Academy included" : "Add Academy to your plan"}
              </p>
            </div>
          </div>

          {/* Hover effect overlay */}
          <AnimatePresence>
            {isHovered && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isChecked 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
                    : "linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.05) 100%)"
                }}
              />
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};
```

## 2. Payment Links Configuration

### File: `src/config/paymentLinks.ts`

```typescript
export const paymentLinks = {
  group: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/99815?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=99815&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25",
    withAcademy: "https://spanishvip.punchpass.com/passes/[GROUP_ACADEMY_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[GROUP_ACADEMY_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25"
  },
  private: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[PRIVATE_PLAN_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[PRIVATE_PLAN_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25",
    withAcademy: "https://spanishvip.punchpass.com/passes/[PRIVATE_ACADEMY_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[PRIVATE_ACADEMY_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25"
  },
  bundled: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[BUNDLE_PLAN_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[BUNDLE_PLAN_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25",
    withAcademy: "https://spanishvip.punchpass.com/passes/[BUNDLE_ACADEMY_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[BUNDLE_ACADEMY_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25"
  },
  kids: {
    withoutAcademy: "https://spanishvip.punchpass.com/passes/[KIDS_PLAN_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[KIDS_PLAN_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25",
    withAcademy: "https://spanishvip.punchpass.com/passes/[KIDS_ACADEMY_ID]?pass%5Bcheck%5D=&pass%5Bpasstype_id%5D=[KIDS_ACADEMY_ID]&pass%5Bassignee_sgid%5D=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaVZuYVdRNkx5OXdkVzVqYUhCaGMzTXZRM1Z6ZEc5dFpYSXZNalV5TlRZM05nWTZCa1ZVIiwiZXhwIjoiMjAyNS0wOC0xMFQxNTo0MTowNS4yNTJaIiwicHVyIjoiZGVmYXVsdCJ9fQ%3D%3D--357f1eff4a5be750270b2e907777edb0ec1d242f&pass%5Bdiscount_code%5D=PROMO50%25"
  }
};

export const getPaymentLink = (planType: keyof typeof paymentLinks, includeAcademy: boolean): string => {
  return paymentLinks[planType][includeAcademy ? 'withAcademy' : 'withoutAcademy'];
};
```

## 3. Updated RecommendationCard Component

### Changes to `src/components/quiz/RecommendationCard.tsx`

```typescript
// Add new props to interface
interface RecommendationCardProps {
  content: RecommendationContent;
  type: 'group' | 'private' | 'kids' | 'bundled';
  isPrimary?: boolean;
  onSelect?: () => void;
  onViewDetails?: () => void;
  paymentLink?: string; // NEW
  isLoading?: boolean; // NEW
}

// Update button click handler
const handleGetStarted = () => {
  if (paymentLink) {
    window.open(paymentLink, '_blank');
  }
  onSelect?.();
};

// Update button JSX
<button
  className={cn(
    "flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300",
    "relative overflow-hidden",
    isPrimary 
      ? 'bg-white text-blue-600 hover:bg-blue-50' 
      : 'bg-blue-600 text-white hover:bg-blue-700',
    isLoading && "opacity-75 cursor-not-allowed"
  )}
  onClick={handleGetStarted}
  disabled={isLoading}
  aria-label={`Get started with ${content.title} ${paymentLink ? 'and proceed to checkout' : ''}`}
>
  {isLoading ? (
    <div className="flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      Processing...
    </div>
  ) : (
    <>
      {isPrimary ? 'Get Started' : 'Choose This'}
      {paymentLink && <span className="ml-1">→</span>}
    </>
  )}
</button>
```

## 4. Updated RecommendationResults Component

### Changes to `src/components/quiz/RecommendationResults.tsx`

```typescript
// Add imports
import { AcademyToggle } from './AcademyToggle';
import { getPaymentLink } from '@/config/paymentLinks';

// Add state management
const [isAcademyIncluded, setIsAcademyIncluded] = useState(false);
const [isTransitioning, setIsTransitioning] = useState(false);

// Add toggle handler
const handleAcademyToggle = async (checked: boolean) => {
  setIsTransitioning(true);
  // Simulate loading to prevent flickering
  await new Promise(resolve => setTimeout(resolve, 300));
  setIsAcademyIncluded(checked);
  setIsTransitioning(false);
};

// Add payment link calculation
const getPaymentLinkForCard = (type: 'group' | 'private' | 'kids' | 'bundled') => {
  return getPaymentLink(type, isAcademyIncluded);
};

// Add AcademyToggle component above recommendation cards
<AcademyToggle
  isChecked={isAcademyIncluded}
  onChange={handleAcademyToggle}
  isLoading={isTransitioning}
/>

// Update RecommendationCard components to pass payment links
<RecommendationCard
  content={recommendationContent[isKidsOverride ? 'kids' : recommendedTrack]}
  type={isKidsOverride ? 'kids' : recommendedTrack}
  isPrimary={true}
  paymentLink={getPaymentLinkForCard(isKidsOverride ? 'kids' : recommendedTrack)}
  isLoading={isTransitioning}
  onSelect={() => handleTrackSelect(isKidsOverride ? 'kids' : recommendedTrack)}
/>
```

## 5. CSS Custom Properties for Animations

### Add to `src/index.css` or component-specific styles

```css
/* Academy toggle animations */
.academy-toggle-gradient {
  transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.academy-toggle-switch {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.academy-toggle-switch:hover {
  transform: scale(1.05);
}

.academy-toggle-switch:active {
  transform: scale(0.95);
}

/* Loading state animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.academy-toggle-loading {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Touch-friendly targets for mobile */
@media (max-width: 768px) {
  .academy-toggle-switch {
    min-height: 48px;
    min-width: 48px;
  }
  
  .academy-toggle-card {
    padding: 1.5rem;
  }
}
```

## 6. Accessibility Implementation

### ARIA attributes and keyboard navigation

```typescript
// Enhanced AcademyToggle with accessibility
<div
  role="switch"
  aria-checked={isChecked}
  aria-label="Include SpanishVIP Academy premium add-on"
  aria-describedby="academy-description academy-price"
  tabIndex={isLoading ? -1 : 0}
  onKeyDown={(e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggleChange(!isChecked);
    }
  }}
  className="sr-only-focusable"
>
  <Switch
    checked={isChecked}
    onCheckedChange={handleToggleChange}
    disabled={isLoading}
    aria-hidden="true"
  />
</div>

// Screen reader announcements
const announceToggleChange = (checked: boolean) => {
  const announcement = checked 
    ? "SpanishVIP Academy added to your plan" 
    : "SpanishVIP Academy removed from your plan";
  
  const announcementElement = document.createElement('div');
  announcementElement.setAttribute('role', 'status');
  announcementElement.setAttribute('aria-live', 'polite');
  announcementElement.className = 'sr-only';
  announcementElement.textContent = announcement;
  
  document.body.appendChild(announcementElement);
  setTimeout(() => document.body.removeChild(announcementElement), 1000);
};
```

This specification provides detailed implementation guidance for all components needed for the Academy toggle feature, including responsive design, accessibility, animations, and state management.
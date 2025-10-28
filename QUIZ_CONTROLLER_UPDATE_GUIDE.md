# QuizController Update Guide for Interstitial Steps

## Overview
This guide details the changes needed in `QuizController.tsx` to implement the two interstitial steps after Q1 and Q3.

## State Management Updates

### New QuizStage Type
```typescript
// Update the QuizStage type to include interstitial steps
type QuizStage = "intro" | "questions" | "interstitial-a" | "interstitial-b" | "email-gate" | "results" | "thank-you";
```

### New State Variables
```typescript
const [currentInterstitial, setCurrentInterstitial] = useState<'a' | 'b' | null>(null);
const [isInterstitialTransitioning, setIsInterstitialTransitioning] = useState(false);
```

### Updated State Interface
```typescript
interface QuizState {
  stage: QuizStage;
  currentQuestionId: string | null;
  questionHistory: string[];
  isTransitioning: boolean;
  isInterstitialTransitioning: boolean;
  currentInterstitial: 'a' | 'b' | null;
  participant: QuizParticipant;
  isLoading: boolean;
  emailGateOpen: boolean;
  interstitialData: {...}; // Keep existing for email gate
}
```

## Flow Logic Implementation

### Interstitial Trigger Logic
```typescript
// Add this function to determine when to show interstitials
const shouldShowInterstitial = (fromQuestionId: string, toQuestionId: string): 'a' | 'b' | null => {
  // After Q1 → Q2, show Interstitial A
  if (fromQuestionId === 'q1' && toQuestionId === 'q2') {
    return 'a';
  }
  
  // After Q3 → Q4, show Interstitial B
  if (fromQuestionId === 'q3' && toQuestionId === 'q4') {
    return 'b';
  }
  
  return null;
};
```

### Updated handleNext Function
```typescript
const handleNext = () => {
  if (!currentQuestionId) {
    console.log("No current question ID, cannot proceed to next question");
    return;
  }
  
  console.log("Moving from question:", currentQuestionId);
  
  // Find next question ID
  const nextQuestionId = getNextQuestionId(
    currentQuestionId,
    participant.answers,
    config.questions
  );
  
  console.log("Next question ID determined:", nextQuestionId);
  
  if (nextQuestionId) {
    // Check if we should show an interstitial
    const interstitialType = shouldShowInterstitial(currentQuestionId, nextQuestionId);
    
    if (interstitialType) {
      // Show interstitial instead of next question
      setIsInterstitialTransitioning(true);
      
      setTimeout(() => {
        setStage(`interstitial-${interstitialType}` as QuizStage);
        setCurrentInterstitial(interstitialType);
        setIsInterstitialTransitioning(false);
      }, 300); // Question fade-out duration
    } else {
      // Regular question transition
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentQuestionId(nextQuestionId);
        setQuestionHistory(prev => [...prev, nextQuestionId]);
        setIsTransitioning(false);
      }, 50);
    }
  } else {
    // End of questions
    console.log("No more questions. Proceeding to user info form.");
    setCurrentQuestionId(null);
  }
};
```

### New Interstitial Handlers
```typescript
const handleInterstitialContinue = () => {
  if (!currentInterstitial || isInterstitialTransitioning) return;
  
  setIsInterstitialTransitioning(true);
  
  // Determine which question to go to after interstitial
  let nextQuestionId: string | null = null;
  
  if (currentInterstitial === 'a') {
    // After Interstitial A, go to Q2
    nextQuestionId = 'q2';
  } else if (currentInterstitial === 'b') {
    // After Interstitial B, go to Q4
    nextQuestionId = 'q4';
  }
  
  setTimeout(() => {
    if (nextQuestionId) {
      setStage("questions");
      setCurrentQuestionId(nextQuestionId);
      setQuestionHistory(prev => [...prev, nextQuestionId]);
      setCurrentInterstitial(null);
    }
    setIsInterstitialTransitioning(false);
  }, 500); // Interstitial fade-out duration
};

const handleInterstitialBack = () => {
  if (!currentInterstitial || isInterstitialTransitioning) return;
  
  setIsInterstitialTransitioning(true);
  
  // Determine which question to go back to
  let previousQuestionId: string | null = null;
  
  if (currentInterstitial === 'a') {
    // Before Interstitial A, go back to Q1
    previousQuestionId = 'q1';
  } else if (currentInterstitial === 'b') {
    // Before Interstitial B, go back to Q3
    previousQuestionId = 'q3';
  }
  
  setTimeout(() => {
    if (previousQuestionId) {
      setStage("questions");
      setCurrentQuestionId(previousQuestionId);
      setCurrentInterstitial(null);
    }
    setIsInterstitialTransitioning(false);
  }, 500);
};
```

### Updated handlePrevious Function
```typescript
const handlePrevious = () => {
  if (questionHistory.length <= 1) {
    console.log("Already at first question, cannot go back");
    return;
  }
  
  console.log("Going back from question:", currentQuestionId);
  
  // Check if we're coming from an interstitial
  if (currentInterstitial) {
    handleInterstitialBack();
    return;
  }
  
  // Regular question back navigation
  setIsTransitioning(true);
  
  const newHistory = [...questionHistory];
  newHistory.pop();
  const previousQuestionId = newHistory[newHistory.length - 1];
  
  setTimeout(() => {
    setCurrentQuestionId(previousQuestionId);
    setQuestionHistory(newHistory);
    setIsTransitioning(false);
  }, 50);
};
```

## Render Logic Updates

### Updated renderStage Function
```typescript
const renderStage = () => {
  switch (stage) {
    case "questions":
      return currentQuestion ? (
        <QuestionCard
          question={currentQuestion}
          currentAnswer={currentAnswer}
          canGoBack={canGoBack}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isTransitioning={isTransitioning}
        />
      ) : (
        <div className="w-full max-w-2xl bg-svip-card rounded-xl shadow-svip p-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-svip-accent border-r-transparent border-b-svip-accent border-l-transparent"></div>
            <p className="mt-4 text-svip-muted text-lg">Preparing your results...</p>
          </div>
        </div>
      );
    
    case "interstitial-a":
      return (
        <InterstitialStep
          type="a"
          onContinue={handleInterstitialContinue}
          isTransitioning={isInterstitialTransitioning}
        />
      );
    
    case "interstitial-b":
      return (
        <InterstitialStep
          type="b"
          onContinue={handleInterstitialContinue}
          isTransitioning={isInterstitialTransitioning}
        />
      );
    
    case "interstitial":
      // Keep existing for email gate
      return interstitialData ? (
        <InterstitialCard
          title={interstitialData.title}
          features={interstitialData.features}
          onCtaClick={handleInterstitialContinue}
        />
      ) : null;
    
    // ... keep existing cases for email-gate, results, thank-you
  }
};
```

## Chrome Visibility Logic

### Updated Main Return JSX
```typescript
return (
  <div className="min-h-screen bg-svip-bg flex items-center justify-center p-4">
    <div className="w-full max-w-2xl">
      {/* SpanishVIP Logo - hide during interstitials */}
      {!stage.startsWith('interstitial') && (
        <div className="flex justify-center mb-6">
          <img
            src="/images/SpanishVIP Logo.png"
            alt="SpanishVIP Logo"
            className="h-8 md:h-11 w-auto"
          />
        </div>
      )}
      
      {/* Progress Bar - hide during interstitials */}
      {stage === "questions" && currentQuestion && (
        <ProgressBar
          progress={calculateProgress()}
          currentQuestion={getCurrentQuestionNumber()}
          totalQuestions={config.questions.length}
          className="mb-6"
        />
      )}
      
      {renderStage()}
    </div>
    
    {/* Email Gate Modal */}
    <EmailGateModal
      isOpen={emailGateOpen}
      onSubmit={handleEmailSubmit}
      onSkip={handleEmailSkip}
      isLoading={isLoading}
    />
  </div>
);
```

## Progress Calculation Updates

### Updated calculateProgress Function
```typescript
const calculateProgress = () => {
  if (!currentQuestionId || config.questions.length === 0) return 0;
  
  const currentIndex = config.questions.findIndex(q => q.id === currentQuestionId);
  if (currentIndex === -1) return 0;
  
  // Adjust progress calculation to account for interstitials
  // We still base it on question count, but interstitials don't affect the percentage
  return Math.round(((currentIndex + 1) / config.questions.length) * 100);
};
```

## Import Updates

### Add New Import
```typescript
import InterstitialStep from "./InterstitialStep";
```

## Testing Considerations

### Test Cases
1. **Q1 → Interstitial A → Q2 Flow**
   - Verify interstitial appears after Q1
   - Verify continue button leads to Q2
   - Verify back navigation works correctly

2. **Q3 → Interstitial B → Q4 Flow**
   - Verify interstitial appears after Q3
   - Verify continue button leads to Q4
   - Verify back navigation works correctly

3. **State Preservation**
   - Verify answers are preserved during interstitial transitions
   - Verify question history is maintained correctly

4. **Animation Timing**
   - Verify 500ms fade for interstitials
   - Verify 300ms fade for questions
   - Verify no animation conflicts

5. **Chrome Visibility**
   - Verify logo and progress bar are hidden during interstitials
   - Verify they reappear for questions

6. **Edge Cases**
   - Test rapid clicking during transitions
   - Test browser back/forward navigation
   - Test reduced motion preferences

## Debug Logging

### Enhanced Console Logging
```typescript
console.log("=== INTERSTITIAL FLOW DEBUG ===");
console.log("Current stage:", stage);
console.log("Current question ID:", currentQuestionId);
console.log("Current interstitial:", currentInterstitial);
console.log("Question history:", questionHistory);
console.log("Is transitioning:", isTransitioning);
console.log("Is interstitial transitioning:", isInterstitialTransitioning);
console.log("=== END DEBUG ===");
```

## Performance Considerations

### Optimization Tips
1. Use `useCallback` for event handlers to prevent unnecessary re-renders
2. Memoize complex calculations in progress functions
3. Use CSS transforms instead of layout changes for animations
4. Clean up timeouts properly to prevent memory leaks

### Example with useCallback
```typescript
const handleInterstitialContinue = useCallback(() => {
  // Implementation
}, [currentInterstitial, isInterstitialTransitioning]);

const handleNext = useCallback(() => {
  // Implementation
}, [currentQuestionId, participant.answers, config.questions]);
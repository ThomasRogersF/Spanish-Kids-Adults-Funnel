# Quiz Recommendation Engine Implementation Plan

## Overview
Add a recommendation engine that analyzes Q1-Q4 answers and recommends one of three tracks: Group, Private, or Kids. The engine runs after Q4 and displays results with comparison options.

## Key Requirements

### Scoring Logic
- **Group Score**: Calculated from learning style, motivation, and time commitment
- **Private Score**: Calculated from learning style, motivation, and time commitment  
- **Kids Override**: Toggle to show Kids recommendation regardless of scores

### Recommendation Rules
- **Learning Style** is the strongest signal (Group vs Private)
- **Motivation** and **Level** modify the base recommendation
- **Time Commitment** affects final score
- **Tie-breaking**: Clear hierarchy for equal scores

## Implementation Plan

### Phase 1: Scoring System
1. Create scoring functions in QuizController
2. Add state for groupScore, privateScore, recommendedTrack
3. Implement scoring rules for each answer combination

### Phase 2: Results UI
1. Update ResultsPage to show recommendation cards
2. Add comparison functionality between tracks
3. Implement Kids override toggle
4. Add detail view for each recommendation

### Phase 3: Analytics Integration
1. Add tracking events for recommendations
2. Store recommendation data for downstream use
3. Create analytics events for user interactions

## Detailed Scoring Rules

### Base Scores by Learning Style
```
Q3 Learning Style → Base Score:
- Group classes → Group +3, Private +0
- One-on-one instruction → Group +1, Private +3  
- Self-paced online lessons → Group +1, Private +0
- Combination approach → Group +2, Private +2
```

### Motivation Modifiers
```
Q1 Motivation → Score Adjustment:
- Travel with confidence → Group +2, Private +1
- Connect with family and friends → Group +2, Private +2
- Keep my mind active → Group +1
- Personal enrichment → Group +1, Private +1
```

### Level Modifiers
```
Q2 Level → Score Adjustment:
- Complete beginner → Private +2, Group +1
- Very rusty → Private +1, Group +1
- Know some basics → Group +2
- Can have simple conversations → Group +2
```

### Time Commitment Modifiers
```
Q4 Time → Score Adjustment:
- 1-2 hours (casual pace) → Group +2
- 3-4 hours (steady progress) → Group +1, Private +1
- 5+ hours (accelerated) → Private +2
- I'm flexible → Group +1, Private +1
```

### Kids Override Logic
- When Kids toggle is ON: Always recommend "Kids" track
- When Kids toggle is OFF: Use normal scoring logic
- Toggle should be persistent during session

## UI/UX Design

### Results Screen Layout
```
┌─────────────────────────────────────────┐
│  RECOMMENDED: GROUP CLASSES        │
│  Best fit: Group classes for steady    │
│  speaking practice                    │
│                                     │
│  • Live conversation with peers          │
│  • Flexible scheduling options           │
│  • Structured curriculum               │
│                                     │
│  [See Group details] [See Private details] │
│                                     │
│  [☐ This plan is for a child (4-17)] │
│                                     │
│  [Continue →]                         │
└─────────────────────────────────────────┘
```

### Comparison View
- Secondary cards show other two options
- Users can click to compare details
- Smooth transitions between views
- Maintains selected recommendation as primary

### Kids Mode
- Toggle switch at top of results screen
- Different copy and imagery for Kids track
- Age-appropriate language and benefits
- Same underlying scoring but different presentation

## Technical Implementation

### State Management
```typescript
interface RecommendationState {
  groupScore: number;
  privateScore: number;
  recommendedTrack: 'group' | 'private' | 'kids';
  isKidsOverride: boolean;
}

// Add to QuizController state
const [recommendation, setRecommendation] = useState<RecommendationState>({
  groupScore: 0,
  privateScore: 0,
  recommendedTrack: 'group',
  isKidsOverride: false
});
```

### Scoring Functions
```typescript
const calculateScores = (answers: QuizAnswer[]) => {
  let groupScore = 0;
  let privateScore = 0;
  
  answers.forEach(answer => {
    switch (answer.questionId) {
      case 'q1': // Motivation
        if (answer.value === 'travel') {
          groupScore += 2; privateScore += 1;
        } else if (answer.value === 'family') {
          groupScore += 2; privateScore += 2;
        } else if (answer.value === 'mental_health') {
          groupScore += 1;
        } else if (answer.value === 'personal_growth') {
          groupScore += 1; privateScore += 1;
        }
        break;
        
      case 'q2': // Level
        if (answer.value === 'complete_beginner') {
          groupScore += 1; privateScore += 2;
        } else if (answer.value === 'rusty') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'basic') {
          groupScore += 2;
        } else if (answer.value === 'conversational') {
          groupScore += 2;
        }
        break;
        
      case 'q3': // Learning Style
        if (answer.value === 'group_classes') {
          groupScore += 3;
        } else if (answer.value === 'private_lessons') {
          privateScore += 3;
        } else if (answer.value === 'self_paced') {
          groupScore += 1;
        } else if (answer.value === 'combination') {
          groupScore += 2; privateScore += 2;
        }
        break;
        
      case 'q4': // Time Commitment
        if (answer.value === 'casual') {
          groupScore += 2;
        } else if (answer.value === 'steady') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'accelerated') {
          privateScore += 2;
        } else if (answer.value === 'flexible') {
          groupScore += 1; privateScore += 1;
        }
        break;
    }
  });
  
  return { groupScore, privateScore };
};

const determineRecommendation = (groupScore: number, privateScore: number, isKidsOverride: boolean) => {
  if (isKidsOverride) {
    return { track: 'kids', groupScore, privateScore };
  }
  
  if (groupScore > privateScore) {
    return { track: 'group', groupScore, privateScore };
  } else if (privateScore > groupScore) {
    return { track: 'private', groupScore, privateScore };
  } else {
    // Tie-breaking: favor user's Q3 learning style
    const q3Answer = answers.find(a => a.questionId === 'q3');
    if (q3Answer?.value === 'group_classes' || q3Answer?.value === 'combination') {
      return { track: 'group', groupScore, privateScore };
    } else {
      return { track: 'private', groupScore, privateScore };
    }
  }
};
```

### Component Updates

#### QuizController Changes
```typescript
// Add scoring calculation after Q4
useEffect(() => {
  if (currentQuestionId === null && participant.answers.length >= 4) {
    const { groupScore, privateScore } = calculateScores(participant.answers);
    const recommendation = determineRecommendation(groupScore, privateScore, recommendation.isKidsOverride);
    
    setRecommendation({
      groupScore,
      privateScore,
      recommendedTrack: recommendation.track,
      isKidsOverride: recommendation.isKidsOverride
    });
    
    // Transition to results
    setStage("results");
  }
}, [currentQuestionId, participant.answers, recommendation.isKidsOverride]);

// Add Kids toggle handler
const handleKidsToggle = (isKids: boolean) => {
  setRecommendation(prev => ({ ...prev, isKidsOverride: isKids }));
};
```

#### ResultsPage Updates
```typescript
interface ResultsPageProps {
  config: QuizConfig;
  participant: QuizParticipant;
  personalizedResult: ResultTemplate;
  recommendation?: RecommendationState;
  onKidsToggle: (isKids: boolean) => void;
  onContinue: () => void;
}

// Add recommendation cards
const RecommendationCard = ({ track, isPrimary, onCompare, onKidsToggle, isKidsOverride }: RecommendationCardProps) => {
  const content = recommendationContent[track];
  
  return (
    <div className={`recommendation-card ${isPrimary ? 'primary' : 'secondary'}`}>
      <div className="recommendation-header">
        <h3>{content.title}</h3>
        <p>{content.subtitle}</p>
      </div>
      <div className="recommendation-features">
        {content.features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="feature-icon">{feature.icon}</span>
            <div className="feature-text">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="recommendation-actions">
        <button className="primary-button" onClick={onSelect}>
          {isPrimary ? 'Get Started' : 'Learn More'}
        </button>
        {!isPrimary && (
          <button className="secondary-button" onClick={onCompare}>
            Compare Details
          </button>
        )}
      </div>
    </div>
  );
};
```

## Content Strategy

### Group Classes Content
- **Title**: "Group Classes"
- **Subtitle**: "Best fit: Group classes for steady speaking practice"
- **Features**: Live conversation, Flexible scheduling, Structured curriculum
- **Benefits**: Peer learning, Motivation through group dynamics, Cost-effective

### Private Tutoring Content
- **Title**: "Private Tutoring" 
- **Subtitle**: "Best fit: 1-on-1 tutoring for fast, personalized progress"
- **Features**: Personalized attention, Custom pacing, Flexible scheduling
- **Benefits**: Tailored curriculum, Faster progress, Individual focus

### Kids Content
- **Title**: "Spanish for Kids"
- **Subtitle**: "Best fit: Spanish for Kids (4-17)"
- **Features**: Age-appropriate, Fun learning, Parent involvement
- **Benefits**: Engaging methods, Kid-friendly pace, Family learning

## Testing Strategy

### Unit Tests
1. Test all scoring combinations (4x4x4x4x4 = 256 scenarios)
2. Verify tie-breaking logic
3. Test Kids override functionality
4. Test edge cases and error handling

### Integration Tests
1. Test full quiz flow with all answer combinations
2. Verify recommendation persistence
3. Test analytics tracking
4. Test responsive design

### User Testing
1. A/B test recommendation clarity
2. Test user understanding of scoring
3. Validate recommendation accuracy
4. Test Kids mode usability

## Success Metrics

### Technical Metrics
- Recommendation calculation accuracy
- Performance impact (load time, animations)
- Error rate in scoring logic
- Analytics event firing rate

### User Metrics
- Recommendation acceptance rate
- Comparison view usage
- Kids toggle usage
- Overall quiz completion rate

## Implementation Timeline

### Week 1: Core Logic
- Implement scoring functions
- Add state management
- Create basic recommendation UI

### Week 2: UI Polish
- Add comparison functionality
- Implement Kids toggle
- Add animations and transitions

### Week 3: Testing & Analytics
- Comprehensive testing
- Analytics integration
- Performance optimization
- Bug fixes and refinement

## Files to Modify

### New Files
- `src/components/quiz/RecommendationCard.tsx`
- `src/components/quiz/RecommendationComparison.tsx`
- `src/lib/recommendationEngine.ts`

### Modified Files
- `src/components/quiz/QuizController.tsx`
- `src/components/quiz/ResultsPage.tsx`
- `src/types/quiz.ts` (add recommendation types)
- `src/index.css` (add recommendation styles)

This plan provides a comprehensive recommendation engine that maintains the existing quiz flow while adding intelligent personalization based on user responses.
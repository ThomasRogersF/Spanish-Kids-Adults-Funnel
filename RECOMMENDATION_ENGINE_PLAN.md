# Quiz Recommendation Engine Implementation Plan

## Overview
This plan defines a three-track recommendation engine for adults: Group, Private, and Bundled. The engine analyzes answers to a 9-question quiz and recommends the most suitable plan. Kids track has been removed from logic, UI, payment links, and documentation.

## Scope and goals
- Replace questions with the approved Q1–Q9 content in [src/data/spanishQuiz.ts](src/data/spanishQuiz.ts)
- Implement scoring and recommendation in [calculateScores()](src/lib/recommendationEngine.ts:202), [determineRecommendation()](src/lib/recommendationEngine.ts:273), [applyTiebreakers()](src/lib/recommendationEngine.ts:309), and [generateRecommendationReasons()](src/lib/recommendationEngine.ts:376)
- Render three tracks in results UI via [RecommendationResults.tsx](src/components/quiz/RecommendationResults.tsx)
- Keep pricing and webhook unchanged

## Data inputs (Q1–Q9)
The quiz asks:
- Q1 — Main reason for learning
- Q2 — Current level
- Q3 — Preferred learning experience
- Q4 — Time per week
- Q5 — Best schedule
- Q6 — Frequency preference
- Q7 — Focus area
- Q8 — Success definition after one month
- Q9 — Main obstacles

## Canonical option values and weights
Scoring only adjusts Group and Private scores. Bundled eligibility is derived from Q3 and Q4.

- Q1 — Main reason
  - reason_travel → group +2, private +1
  - reason_work → private +2
  - reason_family → private +1
  - reason_study → private +2
  - reason_fun → group +2

- Q2 — Level
  - level_beginner → private +1
  - level_upper_beginner → group +1, private +1
  - level_intermediate → group +1
  - level_advanced → group +1

- Q3 — Experience
  - experience_private → private +2
  - experience_group → group +2
  - experience_mix → group +1, private +1, sets bundledEligible = true

- Q4 — Time per week
  - time_1_2 → group +1
  - time_3_4 → group +1, private +1
  - time_5_6 → private +1
  - time_7_plus → private +2

- Q5 — Schedule
  - schedule_mornings | schedule_afternoons | schedule_evenings | schedule_weekends → no scoring (display only)

- Q6 — Frequency
  - freq_private_3x | freq_private_5x | freq_group_unlimited → no scoring (per spec, no mapping needed)

- Q7 — Focus area
  - focus_speaking → group +1
  - focus_grammar → private +1
  - focus_listening → group +1
  - focus_vocabulary → group +1
  - focus_business → private +2

- Q8 — Success metric
  - success_basic_conversations → group +1
  - success_understanding → private +1
  - success_grammar_progress → private +1
  - success_consistency → group +1

- Q9 — Obstacles
  - obstacle_busy_schedule → private +1
  - obstacle_motivation → group +1
  - obstacle_unclear_study → private +1
  - obstacle_nervous_speaking → private +1
  - obstacle_find_program → no scoring

## Recommendation logic
Implemented in [determineRecommendation()](src/lib/recommendationEngine.ts:273) and [applyTiebreakers()](src/lib/recommendationEngine.ts:309).

1) Strong signal selection
- If (groupScore - privateScore) ≥ 2 → recommend Group
- If (groupScore - privateScore) ≤ -2 → recommend Private

2) Bundled default rule
- If abs(diff) ≤ 1 AND Q3=experience_mix AND Q4 ∈ {time_3_4, time_5_6, time_7_plus} → recommend Bundled

3) Tiebreakers (when not caught by bundled default)
- Prefer experience choice (Q3)
  - experience_group → Group
  - experience_private → Private
- Then prefer time intensity (Q4)
  - time_7_plus or time_5_6 → Private
  - time_1_2 → Group
- Default fallback → Group

## Reasons generation
[generateRecommendationReasons()](src/lib/recommendationEngine.ts:376) composes rationale lines using Q1, Q3, Q4, Q7, Q8, Q9 so the user understands why their track was recommended.

Examples:
- Group: “You prefer friendly group classes → live practice with peers”
- Private: “Professional or academic goals → structured 1-on-1 accelerates progress”
- Bundled: “You selected a mix and have ≥3–4 hours weekly → combining formats maximizes results”

## State and UI
- Engine state is computed after finishing questions in [QuizController.tsx](src/components/quiz/QuizController.tsx)
- Results are rendered by [RecommendationResults.tsx](src/components/quiz/RecommendationResults.tsx) using [recommendationContent](src/lib/recommendationEngine.ts:39) and [RecommendationCard.tsx](src/components/quiz/RecommendationCard.tsx)
- Pricing blocks use [PricingSection.tsx](src/components/quiz/PricingSection.tsx) and links from [paymentLinks.ts](src/config/paymentLinks.ts)

RecommendationState interface

```ts
// Note: kids removed from union; isKidsOverride is unused and will be ignored.
export interface RecommendationState {
  groupScore: number;
  privateScore: number;
  recommendedTrack: 'group' | 'private' | 'bundled';
  isKidsOverride: boolean;
}
```

## Files touched
- [src/data/spanishQuiz.ts](src/data/spanishQuiz.ts): replaced with Q1–Q9 and added bundled result template
- [src/lib/recommendationEngine.ts](src/lib/recommendationEngine.ts): scoring, decision, tiebreakers, reasons, and content for three tracks
- [src/components/quiz/RecommendationResults.tsx](src/components/quiz/RecommendationResults.tsx): removed kids fallback, display three-card layout
- [src/components/quiz/PricingSection.tsx](src/components/quiz/PricingSection.tsx): removed kids from type union
- [src/config/paymentLinks.ts](src/config/paymentLinks.ts): removed kids payment links; narrowed PlanType to 'group' | 'private' | 'bundled'

## Items explicitly removed
- Kids track logic, content, and payment links
- Kids fallback routing in results UI

## Not in scope
- Mapping Q6 frequency to pricing or terms (left intentionally unmapped)
- Changing webhook behavior ([sendDataToWebhook()](src/utils/quizUtils.ts:154))

## Pseudocode

```ts
const { groupScore, privateScore } = calculateScores(answers);
const diff = groupScore - privateScore;

if (diff >= 2) return 'group';
if (diff <= -2) return 'private';

if (Q3 === 'experience_mix' && Q4 in {'time_3_4','time_5_6','time_7_plus'}) return 'bundled';

// tiebreakers
if (Q3 === 'experience_group') return 'group';
if (Q3 === 'experience_private') return 'private';
if (Q4 in {'time_7_plus','time_5_6'}) return 'private';
if (Q4 === 'time_1_2') return 'group';
return 'group';
```

## Testing guidance
- Unit test boundaries for diff thresholds (±2) and bundled default trigger
- Validate tiebreaker ordering with mixed signals
- Smoke test result rendering for each track and Academy toggle effects

## Success indicators
- Recommendations align with Q3/Q4 intent and overall goals
- Clear, actionable reasons are shown to users
- Payment links open correct checkout routes for group/private/bundled

## Future extensions
- Optional: expose lightweight knobs for scoring weights via config
- Optional: introduce session-level A/B variants for tie-break ordering
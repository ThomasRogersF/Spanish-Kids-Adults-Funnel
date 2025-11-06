# Email Gate Toggle Notes

Current status: DISABLED

A non-destructive feature flag allows disabling the Email Gate without removing logic or UI code.

Where
- Feature flag constant defined in [QuizController.tsx](src/components/quiz/QuizController.tsx):
  - const EMAIL_GATE_ENABLED = false;
- Email Gate modal component is [EmailGateModal.tsx](src/components/quiz/EmailGateModal.tsx)
- Webhook helper used by both flows is [sendEmailGateWebhook()](src/utils/quizUtils.ts:243)

What it does when ENABLED
- After questions complete and before showing results content, the Email Gate opens (modal).
- Rendering of the modal is gated by the feature flag.
- On submit/skip:
  - Submit triggers [sendEmailGateWebhook()](src/utils/quizUtils.ts:243) with the email the user entered.
  - Skip simply proceeds without sending.

What it does when DISABLED (current behavior)
- The Email Gate modal does not open.
- A single webhook POST is automatically sent when the app first transitions into the "recommendations" stage in [QuizController.tsx](src/components/quiz/QuizController.tsx).
  - Implementation:
    - Uses [sendEmailGateWebhook()](src/utils/quizUtils.ts:243) with a payload override.
    - Guarded by an internal flag (hasSentRecommendationWebhook) to avoid duplicates.
  - Destination:
    - Uses the configured webhook URL in the active quiz config, e.g. [spanishQuiz.webhookUrl](src/data/spanishQuiz.ts:13). If empty, the send is skipped silently.

Payload sent when DISABLED (recommendations-stage auto send)
- Name: "Spanish Learner"
- Email: "Spanishlearner@fallsale.com"
- quizz-id: "fall-sale"
- score: JSON string mapping from question title to the selected option’s human-friendly text
  - Example:
    - {
      "name": "Spanish Learner",
      "email": "Spanishlearner@fallsale.com",
      "quizz-id": "fall-sale",
      "score": "{\"What’s your main reason for learning Spanish?\":\"Travel\",\"How would you describe your current level?\":\"Beginner (I know a few words)\", ...}"
    }
- The human-readable mapping is built with [getQuestionText()](src/utils/quizUtils.ts:124) and [getOptionText()](src/utils/quizUtils.ts:129).

What is NOT changed
- Existing Email Gate handlers and flow remain available:
  - Handlers: handleEmailSubmit and handleEmailSkip in [QuizController.tsx](src/components/quiz/QuizController.tsx)
  - Webhook helper: [sendEmailGateWebhook()](src/utils/quizUtils.ts:243)
- UI/flow structure remains the same aside from the gating toggle and the recommendations-stage automatic webhook when disabled.

How to restore (re-enable)
- Edit the flag in [QuizController.tsx](src/components/quiz/QuizController.tsx):
  - Change:
    - const EMAIL_GATE_ENABLED = false;
  - To:
    - const EMAIL_GATE_ENABLED = true;
- This will:
  - Open the Email Gate after the quiz transitions to recommendations
  - Render the EmailGateModal and allow submit/skip interactions
  - Continue to use the configured webhook URL if present (e.g., [src/data/spanishQuiz.ts](src/data/spanishQuiz.ts:13))

Quick QA checklist when ENABLED
- Complete the quiz; verify the Email Gate modal appears at recommendations.
- Test Submit:
  - Enter a valid email and submit; confirm console logs show the webhook POST and the modal closes.
- Test Skip:
  - Click skip; confirm the modal closes and recommendations remain visible.
- Ensure recommendations still behave as expected (group/private/bundled selection flows).

Quick QA checklist when DISABLED
- Complete the quiz to reach recommendations.
- Confirm a single webhook POST occurs automatically:
  - Console logs should include "RECOMMENDATION WEBHOOK TRIGGER START" and payload preview.
  - The request uses the same endpoint configured in the quiz config.
- Confirm the flow proceeds even if the webhook fails (non-blocking UX).

Notes
- If you need the gate to open at a different step, adjust the conditional around setEmailGateOpen(true) and/or the stage transitions in [QuizController.tsx](src/components/quiz/QuizController.tsx).
- If the Make.com scenario requires auth/signing, add it inside [sendEmailGateWebhook()](src/utils/quizUtils.ts:243).
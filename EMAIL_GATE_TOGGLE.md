# Email Gate Toggle Notes

Current status: DISABLED

A non-destructive feature flag has been added to disable the Email Gate without removing any logic or UI code.

Where
- Feature flag constant defined in [src/components/quiz/QuizController.tsx](src/components/quiz/QuizController.tsx:16) as:
  - const EMAIL_GATE_ENABLED = false;

What it does
- Prevents opening the Email Gate after questions are completed:
  - The call to setEmailGateOpen(true) is now wrapped with the feature flag, see [determine post-questions transition](src/components/quiz/QuizController.tsx:66).
- Prevents rendering the EmailGateModal:
  - The modal JSX is now conditionally rendered via the flag, see [modal rendering](src/components/quiz/QuizController.tsx:497).

What is NOT changed
- All Email Gate logic, handlers, and webhook calls remain intact:
  - Handlers: handleEmailSubmit and handleEmailSkip
  - Webhook call path: [sendEmailGateWebhook](src/utils/quizUtils.ts:242)
- UI and flow structure remain unchanged; only gating is turned off.

How to restore (re-enable)
- Edit the flag in [QuizController.tsx](src/components/quiz/QuizController.tsx:16):
  - Change:
    - const EMAIL_GATE_ENABLED = false;
  - To:
    - const EMAIL_GATE_ENABLED = true;
- This will:
  - Open the Email Gate after the quiz transitions to recommendations
  - Render the EmailGateModal and allow submit/skip interactions
  - Continue to use the configured webhook URL if present (see spanishQuiz.webhookUrl in [src/data/spanishQuiz.ts](src/data/spanishQuiz.ts:13))

Quick QA checklist when re-enabled
- Complete the quiz to transition to recommendations; verify the Email Gate modal appears.
- Test Submit:
  - Enter a valid email and submit; confirm console logs show the webhook POST and modal closes.
- Test Skip:
  - Click skip; confirm modal closes and recommendations remain visible.
- Ensure recommendations still behave as expected (group/private/bundled selection flows).

Notes
- If you need the gate to open at a different step in the future, adjust the conditional around setEmailGateOpen(true) and stage transitions in [QuizController](src/components/quiz/QuizController.tsx:66).
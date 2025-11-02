import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { QuizConfig, QuizParticipant, QuizAnswer, ResultTemplate } from "@/types/quiz";
import { getNextQuestionId, getPersonalizedResult, sendDataToWebhook, sendEmailGateWebhook } from "@/utils/quizUtils";
import { calculateScores, determineRecommendation, RecommendationState } from "@/lib/recommendationEngine";
import IntroductionPage from "./IntroductionPage";
import QuestionCard from "./QuestionCard";
import OfferPage from "./OfferPage";
import UserInfoForm from "./UserInfoForm";
import ResultsPage from "./ResultsPage";
import { RecommendationResults } from "./RecommendationResults";
import EmailGateModal from "./EmailGateModal";
import InterstitialCard from "./InterstitialCard";
import InterstitialStep from "./InterstitialStep";
import ProgressBar from "./ProgressBar";
import { animationClasses, durations } from "@/lib/animations";

interface QuizControllerProps {
  config: QuizConfig;
}

type QuizStage = "intro" | "questions" | "interstitial-a" | "interstitial-b" | "interstitial-c" | "interstitial" | "email-gate" | "recommendations" | "results" | "thank-you";

const QuizController = ({ config }: QuizControllerProps) => {
  const [stage, setStage] = useState<QuizStage>("questions");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    config.questions.length > 0 ? config.questions[0].id : null
  );
  const [questionHistory, setQuestionHistory] = useState<string[]>(
    config.questions.length > 0 ? [config.questions[0].id] : []
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInterstitialTransitioning, setIsInterstitialTransitioning] = useState(false);
  const [currentInterstitial, setCurrentInterstitial] = useState<'a' | 'b' | 'c' | null>(null);
  const [participant, setParticipant] = useState<QuizParticipant>({
    name: "",
    email: "",
    answers: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [interstitialData, setInterstitialData] = useState<{
    title: string;
    features: Array<{ title: string; description: string; icon?: string }>;
  } | null>(null);
  const [recommendationState, setRecommendationState] = useState<RecommendationState | null>(null);
  const { toast } = useToast();

  // Effect to handle completion of questions and transition to recommendations
  useEffect(() => {
    if (stage === "questions" && currentQuestionId === null && participant.answers.length > 0) {
      // Calculate recommendations based on answers
      const scores = calculateScores(participant.answers);
      const recommendation = determineRecommendation(
        scores.groupScore,
        scores.privateScore,
        false, // Default to not kids override
        participant.answers
      );
      
      setRecommendationState({
        ...recommendation,
        isKidsOverride: false
      });
      
      // Go directly to recommendations and open email gate
      setStage("recommendations");
      setEmailGateOpen(true);
    }
  }, [stage, currentQuestionId, participant.answers]);

  const handleStartQuiz = () => {
    console.log("Starting quiz");
    setStage("questions");
    // Add first question to history when starting
    if (config.questions.length > 0) {
      setQuestionHistory([config.questions[0].id]);
    }
  };

  const handleViewResults = () => {
    console.log("Viewing results directly");
    setStage("results");
  };

  // Mock data for direct results viewing
  const mockParticipant: QuizParticipant = {
    name: "Demo User",
    email: "demo@example.com",
    answers: []
  };

  const mockPersonalizedResult: ResultTemplate = {
    id: "demo-result",
    title: "Your Personalized Spanish Learning Path",
    description: "Based on your responses, you're ready to start your Spanish learning journey! Our program is designed specifically for adults 50+ who want to learn Spanish confidently and effectively. You'll benefit from our structured approach that combines conversation practice with grammar fundamentals, all at your own pace.",
    conditions: []
  };

  const handleAnswer = (answer: QuizAnswer) => {
    console.log("Answer received:", answer);
    
    // Update or add the answer
    const existingIndex = participant.answers.findIndex(
      (a) => a.questionId === answer.questionId
    );
    
    if (existingIndex > -1) {
      const updatedAnswers = [...participant.answers];
      updatedAnswers[existingIndex] = answer;
      setParticipant({ ...participant, answers: updatedAnswers });
    } else {
      setParticipant({
        ...participant,
        answers: [...participant.answers, answer]
      });
    }
  };

  // Add this function to determine when to show interstitials
  const shouldShowInterstitial = useCallback((fromQuestionId: string, toQuestionId: string): 'a' | 'b' | 'c' | null => {
    // After Q1 → Q2, show Interstitial A
    if (fromQuestionId === 'q1' && toQuestionId === 'q2') {
      return 'a';
    }
    
    // After Q3 → Q4, show Interstitial B
    if (fromQuestionId === 'q3' && toQuestionId === 'q4') {
      return 'b';
    }
    
    // After Q5 → Q6, show Interstitial C
    if (fromQuestionId === 'q5' && toQuestionId === 'q6') {
      return 'c';
    }
    
    return null;
  }, []);
  
  const handleNext = useCallback(() => {
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
        setIsTransitioning(true);
        
        setTimeout(() => {
          setStage(`interstitial-${interstitialType}` as QuizStage);
          setCurrentInterstitial(interstitialType);
          setIsTransitioning(false);
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
  }, [currentQuestionId, participant.answers, config.questions, shouldShowInterstitial]);

  // New interstitial handlers
  const handleInterstitialContinue = useCallback(() => {
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
    } else if (currentInterstitial === 'c') {
      // After Interstitial C, go to Q6
      nextQuestionId = 'q6';
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
  }, [currentInterstitial, isInterstitialTransitioning]);

  const handleInterstitialBack = useCallback(() => {
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
    } else if (currentInterstitial === 'c') {
      // Before Interstitial C, go back to Q5
      previousQuestionId = 'q5';
    }
    
    setTimeout(() => {
      if (previousQuestionId) {
        setStage("questions");
        setCurrentQuestionId(previousQuestionId);
        setCurrentInterstitial(null);
      }
      setIsInterstitialTransitioning(false);
    }, 500);
  }, [currentInterstitial, isInterstitialTransitioning]);

  const handlePrevious = useCallback(() => {
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
  }, [questionHistory, currentInterstitial, handleInterstitialBack]);

  const handleEmailSubmit = (email: string) => {
    // Update participant info
    const updatedParticipant = {
      ...participant,
      email,
      name: participant.name || "Spanish Learner" // Default name if not provided
    };
    setParticipant(updatedParticipant);
    
    // Send simplified data to email gate webhook if configured
    console.log("=== QUIZ CONTROLLER EMAIL GATE WEBHOOK DEBUG ===");
    console.log("Config webhook URL:", config.webhookUrl);
    console.log("Email submitted:", email);
    
    if (config.webhookUrl && config.webhookUrl.trim() !== "") {
      console.log("Webhook URL found, attempting to send email gate data...");
      sendEmailGateWebhook(config.webhookUrl, email)
        .then((success) => {
          console.log("Email gate webhook send result:", success);
          // Continue to results even if webhook fails
        })
        .catch(error => {
          console.error("Email gate webhook send error:", error);
          // Continue to results even if webhook fails
        });
    } else {
      console.log("No webhook URL configured");
    }
    console.log("=== QUIZ CONTROLLER EMAIL GATE WEBHOOK DEBUG END ===");
    
    setEmailGateOpen(false);
    // Stay on recommendations page after email submission
    // setStage("thank-you");
  };

  const handleEmailSkip = () => {
    setEmailGateOpen(false);
    // Stay on recommendations page after email skip
    // setStage("thank-you");
  };

  const handleTrackSelection = (track: 'group' | 'private' | 'bundled') => {
    console.log("Selected track:", track);
    // Update recommendation state with selected track
    if (recommendationState) {
      setRecommendationState({
        ...recommendationState,
        recommendedTrack: track
      });
    }
    // Email gate is already open, just proceed to results after email submission
  };
  
  const handleContinueToThankYou = () => {
    setStage("thank-you");
  };

  const handleExternalRedirect = () => {
    // Redirect to external URL if provided
    if (config.externalRedirectUrl) {
      window.location.href = config.externalRedirectUrl;
    }
  };
  
  // Add a debug function to jump to results
  const handleDebugOffer = () => {
    setParticipant({
      name: "Debug User",
      email: "debug@example.com",
      answers: []
    });
    setStage("thank-you");
  };

  // Calculate progress and question numbers
  const calculateProgress = () => {
    if (!currentQuestionId || config.questions.length === 0) return 0;
    
    const currentIndex = config.questions.findIndex(q => q.id === currentQuestionId);
    if (currentIndex === -1) return 0;
    
    return Math.round(((currentIndex + 1) / config.questions.length) * 100);
  };

  const getCurrentQuestionNumber = () => {
    if (!currentQuestionId) return 1;
    const currentIndex = config.questions.findIndex(q => q.id === currentQuestionId);
    return currentIndex + 1;
  };
  
  // Find current question
  const currentQuestion = currentQuestionId
    ? config.questions.find(q => q.id === currentQuestionId)
    : null;
  
  // Find current answer if it exists
  const currentAnswer = currentQuestionId
    ? participant.answers.find(a => a.questionId === currentQuestionId)
    : undefined;

  console.log("Current stage:", stage, "Current question ID:", currentQuestionId, "Answers count:", participant.answers.length);

  // Check if we can go back (not on first question)
  const canGoBack = questionHistory.length > 1;

  // Render the appropriate stage
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
      case "interstitial-c":
        return (
          <InterstitialStep
            type="c"
            onContinue={handleInterstitialContinue}
            isTransitioning={isInterstitialTransitioning}
          />
        );
      case "interstitial":
        return interstitialData ? (
          <InterstitialCard
            title={interstitialData.title}
            features={interstitialData.features}
            onCtaClick={() => setStage("recommendations")}
          />
        ) : null;
      case "email-gate":
        // Email gate is handled by modal, so show loading state
        return (
          <div className="w-full max-w-2xl bg-svip-card rounded-xl shadow-svip p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-svip-accent border-r-transparent border-b-svip-accent border-l-transparent"></div>
              <p className="mt-4 text-svip-muted text-lg">Preparing your results...</p>
            </div>
          </div>
        );
      case "recommendations":
        return recommendationState ? (
          <RecommendationResults
            recommendationState={recommendationState}
            answers={participant.answers}
            onSelectTrack={handleTrackSelection}
          />
        ) : null;
      case "results":
        return (
          <ResultsPage
            config={config}
            participant={participant}
            personalizedResult={mockPersonalizedResult}
            onContinue={() => setStage("thank-you")}
          />
        );
      case "thank-you":
        return (
          <OfferPage />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-svip-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* SpanishVIP Logo - hide during interstitials and recommendations */}
        {!stage.startsWith('interstitial') && stage !== "recommendations" && (
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
};

export default QuizController;

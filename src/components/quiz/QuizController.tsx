import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { QuizConfig, QuizParticipant, QuizAnswer, ResultTemplate } from "@/types/quiz";
import { getNextQuestionId, getPersonalizedResult, sendDataToWebhook } from "@/utils/quizUtils";
import IntroductionPage from "./IntroductionPage";
import QuestionCard from "./QuestionCard";
import OfferPage from "./OfferPage";
import UserInfoForm from "./UserInfoForm";

interface QuizControllerProps {
  config: QuizConfig;
}

type QuizStage = "intro" | "questions" | "user-info" | "thank-you";

const QuizController = ({ config }: QuizControllerProps) => {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    config.questions.length > 0 ? config.questions[0].id : null
  );
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [participant, setParticipant] = useState<QuizParticipant>({
    name: "",
    email: "",
    answers: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Effect to handle completion of questions and transition to user info stage
  useEffect(() => {
    if (stage === "questions" && currentQuestionId === null && participant.answers.length > 0) {
      setStage("user-info");
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
  
  const handleNext = () => {
    if (!currentQuestionId) {
      console.log("No current question ID, cannot proceed to next question");
      return;
    }
    
    setIsLoading(true);
    console.log("Moving from question:", currentQuestionId);
    
    // Find next question ID
    const nextQuestionId = getNextQuestionId(
      currentQuestionId,
      participant.answers,
      config.questions
    );
    
    console.log("Next question ID determined:", nextQuestionId);
    
    if (nextQuestionId) {
      // Move to next question and add to history
      setTimeout(() => {
        setCurrentQuestionId(nextQuestionId);
        setQuestionHistory(prev => [...prev, nextQuestionId]);
        setIsLoading(false);
      }, 100); // Small delay for better UX
    } else {
      // End of questions
      console.log("No more questions. Proceeding to user info form.");
      setCurrentQuestionId(null);
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (questionHistory.length <= 1) {
      console.log("Already at first question, cannot go back");
      return;
    }
    
    setIsLoading(true);
    console.log("Going back from question:", currentQuestionId);
    
    // Remove current question from history and go to previous
    const newHistory = [...questionHistory];
    newHistory.pop(); // Remove current question
    const previousQuestionId = newHistory[newHistory.length - 1];
    
    setTimeout(() => {
      setCurrentQuestionId(previousQuestionId);
      setQuestionHistory(newHistory);
      setIsLoading(false);
    }, 100);
  };

  const handleUserInfoSubmit = (name: string, email: string) => {
    // Update participant info
    const updatedParticipant = {
      ...participant,
      name,
      email
    };
    setParticipant(updatedParticipant);
    // Send data to webhook if configured
    console.log("=== QUIZ CONTROLLER WEBHOOK DEBUG ===");
    console.log("Config webhook URL:", config.webhookUrl);
    console.log("Updated participant:", updatedParticipant);
    
    if (config.webhookUrl) {
      console.log("Webhook URL found, attempting to send data...");
      sendDataToWebhook(config.webhookUrl, updatedParticipant, config)
        .then((success) => {
          console.log("Webhook send result:", success);
          if (!success) {
            toast({
              title: "Data submission issue",
              description: "There was an issue sending your responses. Please try again later.",
              variant: "destructive"
            });
          } else {
            console.log("Webhook data sent successfully");
          }
        })
        .catch(error => {
          console.error("Webhook send error:", error);
          toast({
            title: "Data submission error",
            description: "There was an error submitting your data.",
            variant: "destructive"
          });
        });
    } else {
      console.log("No webhook URL configured");
    }
    console.log("=== QUIZ CONTROLLER WEBHOOK DEBUG END ===");
    // Go directly to offer page
    setStage("thank-you");
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
      case "intro":
        return (
          <>
            <IntroductionPage 
              onStart={handleStartQuiz}
              onDebugOffer={handleDebugOffer}
            />
          </>
        );
      case "questions":
        if (isLoading) {
          return (
            <div className="quiz-container flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
                <p className="mt-4 text-gray-600 text-lg">Loading next question...</p>
              </div>
            </div>
          );
        }
        
        return currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            progress={calculateProgress()}
            currentAnswer={currentAnswer}
            canGoBack={canGoBack}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentQuestionNumber={getCurrentQuestionNumber()}
            totalQuestions={config.questions.length}
          />
        ) : (
          <div className="quiz-container">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent"></div>
              <p className="mt-4 text-gray-600 text-lg">Preparing your results...</p>
            </div>
          </div>
        );
      case "user-info":
        return (
          <UserInfoForm 
            onSubmit={handleUserInfoSubmit}
            config={config}
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
    <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE] p-0">
      {renderStage()}
    </div>
  );
};

export default QuizController;

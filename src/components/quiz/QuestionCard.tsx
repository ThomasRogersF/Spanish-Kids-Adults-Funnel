
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import ImageSelection from "./QuestionTypes/ImageSelection";
import AudioQuestion from "./QuestionTypes/AudioQuestion";
import TextInput from "./QuestionTypes/TextInput";
import FillInBlanks from "./QuestionTypes/FillInBlanks";
import { animationClasses, durations } from "@/lib/animations";
// Try to import Framer Motion, fallback to CSS if not available
let motion: any;
let AnimatePresence: any;

try {
  const framerMotion = require("framer-motion");
  motion = framerMotion.motion;
  AnimatePresence = framerMotion.AnimatePresence;
} catch (error) {
  console.log("Framer Motion not available, using CSS transitions");
}

interface QuestionCardProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  canGoBack: boolean;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
  isTransitioning?: boolean;
}

const QuestionCard = ({
  question,
  currentAnswer,
  canGoBack,
  onAnswer,
  onNext,
  onPrevious,
  isTransitioning = false
}: QuestionCardProps) => {
  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation variants for smooth transitions
  const questionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const transitionConfig = {
    duration: 0.7,  // Slower transition duration (in seconds)
    ease: [0.22, 0.84, 0.36, 1] as const
  };

  const renderQuestionType = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <MultipleChoice
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'image-selection':
        return (
          <ImageSelection
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'audio':
        return (
          <AudioQuestion
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'text':
        return (
          <TextInput
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      case 'fill-in-blanks':
        return (
          <FillInBlanks
            question={question}
            currentAnswer={currentAnswer}
            onAnswer={onAnswer}
            onNext={onNext}
          />
        );
      default:
        return null;
    }
  };

  // Use Framer Motion if available, otherwise use CSS transitions
  if (motion && AnimatePresence) {
    return (
      <div className="w-full max-w-2xl">
        {/* Main question container with Framer Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id} // Key triggers animation when question changes
            className="bg-svip-card rounded-xl shadow-svip p-8 md:p-10"
            variants={prefersReducedMotion ? {} : questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={prefersReducedMotion ? { duration: 0 } : transitionConfig}
          >
            {/* Question Title */}
            <h1 className="text-2xl md:text-3xl font-inter font-semibold text-svip-ink mb-4">
              {question.title}
            </h1>
            
            {/* Question Subtitle */}
            {question.subtitle && (
              <p className="text-svip-muted mb-8 text-lg">{question.subtitle}</p>
            )}
            
            {/* Question Content */}
            {renderQuestionType()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center mt-6">
          {canGoBack && (
            <Button
              variant="ghost"
              onClick={onPrevious}
              disabled={isTransitioning}
              className="text-svip-muted hover:text-svip-ink font-medium flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back
            </Button>
          )}
          
          <div className="flex-1" /> {/* Spacer */}
        </div>
      </div>
    );
  }

  // Fallback to CSS transitions if Framer Motion is not available
  return (
    <div className="w-full max-w-2xl">
      {/* Main question container with CSS transitions */}
      <div
        key={question.id}
        className={cn(
          "bg-svip-card rounded-xl shadow-svip p-8 md:p-10",
          "transition-opacity duration-700",  // Slower transition duration (in milliseconds)
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
        style={{
          transitionTimingFunction: prefersReducedMotion ? 'none' : 'cubic-bezier(0.22, 0.84, 0.36, 1)'
        }}
      >
        {/* Question Title */}
        <h1 className="text-2xl md:text-3xl font-inter font-semibold text-svip-ink mb-4">
          {question.title}
        </h1>
        
        {/* Question Subtitle */}
        {question.subtitle && (
          <p className="text-svip-muted mb-8 text-lg">{question.subtitle}</p>
        )}
        
        {/* Question Content */}
        {renderQuestionType()}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-6">
        {canGoBack && (
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={isTransitioning}
            className="text-svip-muted hover:text-svip-ink font-medium flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        )}
        
        <div className="flex-1" /> {/* Spacer */}
      </div>
    </div>
  );
};

export default QuestionCard;

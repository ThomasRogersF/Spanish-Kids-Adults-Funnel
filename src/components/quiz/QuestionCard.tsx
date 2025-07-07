
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProgressBar from "./ProgressBar";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import ImageSelection from "./QuestionTypes/ImageSelection";
import AudioQuestion from "./QuestionTypes/AudioQuestion";
import TextInput from "./QuestionTypes/TextInput";
import FillInBlanks from "./QuestionTypes/FillInBlanks";

interface QuestionCardProps {
  question: QuizQuestion;
  progress: number;
  currentAnswer?: QuizAnswer;
  canGoBack: boolean;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentQuestionNumber?: number;
  totalQuestions?: number;
}

const QuestionCard = ({ 
  question, 
  progress,
  currentAnswer,
  canGoBack,
  onAnswer, 
  onNext,
  onPrevious,
  currentQuestionNumber,
  totalQuestions
}: QuestionCardProps) => {
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

  return (
    <div className="w-full max-w-4xl">
      {/* Previous question button in top corner */}
      <div className="flex justify-start mb-6">
        {canGoBack && (
          <Button
            variant="outline"
            size="lg"
            onClick={onPrevious}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-6 py-3 text-lg rounded-[1.5rem] border-2"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
        )}
      </div>

      {/* Main question container */}
      <div className="quiz-container">
        <ProgressBar 
          progress={progress} 
          currentQuestion={currentQuestionNumber}
          totalQuestions={totalQuestions}
        />
        
        <h1 className="quiz-title mb-4">
          {question.title}
        </h1>
        
        {question.subtitle && (
          <p className="quiz-subtitle">{question.subtitle}</p>
        )}
        
        {renderQuestionType()}
      </div>
    </div>
  );
};

export default QuestionCard;


import { useState, useEffect } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface MultipleChoiceProps {
  question: QuizQuestion;
  currentAnswer?: QuizAnswer;
  onAnswer: (answer: QuizAnswer) => void;
  onNext: () => void;
}

const MultipleChoice = ({ 
  question, 
  currentAnswer,
  onAnswer, 
  onNext 
}: MultipleChoiceProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    currentAnswer?.value as string || null
  );
  
  // Reset selected option when question changes
  useEffect(() => {
    console.log("MultipleChoice: Question or answer changed", question.id);
    setSelectedOption(currentAnswer?.value as string || null);
  }, [question.id, currentAnswer]);

  const handleOptionSelect = (optionValue: string) => {
    console.log("MultipleChoice: Option selected", optionValue);
    setSelectedOption(optionValue);
    
    onAnswer({
      questionId: question.id,
      type: 'mcq',
      value: optionValue
    });

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      console.log("MultipleChoice: Auto-advancing to next question");
      onNext();
    }, 300);
  };

  // Map option values to appropriate emojis
  const getOptionEmoji = (optionValue: string, optionText: string) => {
    // Extract emoji from the beginning of the text if it exists
    const emojiMatch = optionText.match(/^([🌎❤️🧠🎯🌱📚💬🗣️👥👨‍🏫🏠🔄⏰📅🚀🤔])/);
    if (emojiMatch) {
      return emojiMatch[1];
    }
    
    // Fallback emoji mapping based on option value
    const emojiMap: Record<string, string> = {
      travel: "🌎",
      family: "❤️", 
      mental_health: "🧠",
      personal_growth: "🎯",
      complete_beginner: "🌱",
      rusty: "📚",
      basic: "💬",
      conversational: "🗣️",
      group_classes: "👥",
      private_lessons: "👨‍🏫",
      self_paced: "🏠",
      combination: "🔄",
      casual: "⏰",
      steady: "📅",
      accelerated: "🚀",
      flexible: "🤔"
    };
    
    return emojiMap[optionValue] || "✨";
  };

  // Clean option text by removing emoji from the beginning
  const getCleanOptionText = (text: string) => {
    return text.replace(/^[🌎❤️🧠🎯🌱📚💬🗣️👥👨‍🏫🏠🔄⏰📅🚀🤔]\s*/, '');
  };

  // Check if this is question 4 to apply grid layout
  const isGridLayout = question.id === "q4";

  return (
    <div className="space-y-4">
      <div className={isGridLayout ? "quiz-option-grid" : "space-y-3"}>
        {question.options && question.options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleOptionSelect(option.value)}
            className={cn(
              "quiz-option cursor-pointer transition-all duration-200 hover:scale-105",
              selectedOption === option.value && "quiz-option-selected"
            )}
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="text-2xl flex-shrink-0">
                {getOptionEmoji(option.value, option.text)}
              </div>
              <div className="flex-1">
                <span className="text-base font-medium leading-relaxed">
                  {getCleanOptionText(option.text)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;

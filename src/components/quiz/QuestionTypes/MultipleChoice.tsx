
import { useState, useEffect } from "react";
import { QuizQuestion, QuizAnswer } from "@/types/quiz";
import { cn } from "@/lib/utils";
import ChoiceCard from "../ChoiceCard";
import { animationClasses, durations } from "@/lib/animations";

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
    }, 100); // Much shorter delay for faster response
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
      // Question 1 - Main outcome goals
      travel_basics: "✈️",
      steady_habit: "📅",
      rapid_progress: "🚀",
      simple_plan: "📝",
      
      // Question 2 - Current level
      starting_zero: "🌱",
      beginner_elementary: "📚",
      intermediate_plus: "🎓",
      
      // Question 3 - Speaking comfort
      love_group: "👥",
      depends_day: "🤔",
      prefer_private: "👤",
      
      // Question 4 - Schedule preferences
      set_times: "⏰",
      changing_schedule: "🔄",
      either_work: "🤷",
      
      // Question 5 - Feedback preferences
      targeted_corrections: "🎯",
      speaking_turns: "💬",
      light_feedback: "🌟",
      
      // Question 6 - Priority
      best_value: "💰",
      faster_progress: "⚡"
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
      <div className={cn(
        isGridLayout ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3",
        animationClasses.staggerChildren
      )}>
        {question.options && question.options.map((option, index) => (
          <div
            key={option.id}
            style={{ '--stagger-index': index } as React.CSSProperties}
            className={animationClasses.staggerItem}
          >
            <ChoiceCard
              id={option.id}
              value={option.value}
              label={getCleanOptionText(option.text)}
              icon={getOptionEmoji(option.value, option.text)}
              isSelected={selectedOption === option.value}
              onClick={() => handleOptionSelect(option.value)}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MultipleChoice;

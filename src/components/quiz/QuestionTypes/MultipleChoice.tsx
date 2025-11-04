
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
    // Extract emoji from the beginning of the text if it exists (not used for our quiz since text excludes emojis)
    const emojiMatch = optionText.match(/^([🌴💼👨‍👩‍👧‍👦🎓🙂🌱📖🚀🧠👤👥🔄⏰📅📈🔥🌅🌞🌙📆🎯🏆♾🗣✍👂📚💬🎧🧩✅🕒😅❓😬🔍])/);
    if (emojiMatch) {
      return emojiMatch[1];
    }
    
    // Emoji mapping based on canonical option values (replaces previous ✨ fallback)
    const emojiMap: Record<string, string> = {
      // Q1 — Main reason
      reason_travel: "🌴",
      reason_work: "💼",
      reason_family: "👨‍👩‍👧‍👦",
      reason_study: "🎓",
      reason_fun: "🙂",

      // Q2 — Current level
      level_beginner: "🌱",
      level_upper_beginner: "📖",
      level_intermediate: "🚀",
      level_advanced: "🧠",

      // Q3 — Learning experience
      experience_private: "👤",
      experience_group: "👥",
      experience_mix: "🔄",

      // Q4 — Time per week
      time_1_2: "⏰",
      time_3_4: "📅",
      time_5_6: "📈",
      time_7_plus: "🔥",

      // Q5 — Best schedule
      schedule_mornings: "🌅",
      schedule_afternoons: "🌞",
      schedule_evenings: "🌙",
      schedule_weekends: "📆",

      // Q6 — Frequency preference
      freq_private_3x: "🎯",
      freq_private_5x: "🏆",
      freq_group_unlimited: "♾",

      // Q7 — Focus area
      focus_speaking: "🗣",
      focus_grammar: "✍",
      focus_listening: "👂",
      focus_vocabulary: "📚",
      focus_business: "💼",

      // Q8 — Success after one month
      success_basic_conversations: "💬",
      success_understanding: "🎧",
      success_grammar_progress: "🧩",
      success_consistency: "✅",

      // Q9 — Obstacles
      obstacle_busy_schedule: "🕒",
      obstacle_motivation: "😅",
      obstacle_unclear_study: "❓",
      obstacle_nervous_speaking: "😬",
      obstacle_find_program: "🔍"
    };
    
    // Default to a neutral bullet to avoid sparkles if an unmapped value appears
    return emojiMap[optionValue] || "•";
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

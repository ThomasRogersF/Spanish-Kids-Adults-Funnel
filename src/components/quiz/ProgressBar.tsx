
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  currentQuestion?: number;
  totalQuestions?: number;
  className?: string;
}

const ProgressBar = ({ 
  progress, 
  currentQuestion, 
  totalQuestions, 
  className 
}: ProgressBarProps) => {
  // Ensure progress is between 0-100
  const safeProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={cn("w-full mb-8", className)}>
      {/* Progress indicator text */}
      {currentQuestion && totalQuestions && (
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-medium text-gray-600">
            {currentQuestion} of {totalQuestions}
          </div>
        </div>
      )}
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
        <div 
          className="bg-brand-primary h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

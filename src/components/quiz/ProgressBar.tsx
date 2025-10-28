
import { cn } from "@/lib/utils";
import { animationClasses, durations } from "@/lib/animations";

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
  const isComplete = safeProgress >= 100;
  
  return (
    <div className={cn("w-full mb-6", className)}>
      {/* Progress indicator text */}
      {currentQuestion && totalQuestions && (
        <div className="flex justify-between items-center mb-3">
          <div className={cn(
            "text-sm font-medium transition-colors duration-300",
            isComplete ? "text-green-600" : "text-svip-muted"
          )} role="status" aria-live="polite">
            Step {currentQuestion} of {totalQuestions}
          </div>
          <div className={cn(
            "text-sm font-medium transition-all duration-300",
            isComplete ? "text-green-600 font-semibold" : "text-svip-muted"
          )}>
            {Math.round(safeProgress)}%
          </div>
        </div>
      )}
      
      {/* Main progress bar */}
      <div className="w-full bg-svip-line rounded-full h-2 relative overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full relative overflow-hidden transition-all ease-out",
            isComplete ? "bg-green-500" : "bg-svip-accent",
            isComplete && animationClasses.success
          )}
          style={{
            width: `${safeProgress}%`,
            transitionDuration: `${durations.normal}ms`
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              backgroundSize: '200% 100%',
              animation: `progress-update ${durations.slow}ms ease-in-out infinite`
            }}
          />
        </div>
      </div>
      
    </div>
  );
};

export default ProgressBar;

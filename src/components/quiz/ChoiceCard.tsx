import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { animationClasses, durations } from '@/lib/animations';

interface ChoiceCardProps {
  id: string;
  value: string;
  label: string;
  icon?: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ChoiceCard = ({
  id,
  value,
  label,
  icon,
  isSelected,
  onClick,
  disabled = false,
  className
}: ChoiceCardProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsPressed(true);
      onClick();
      setTimeout(() => setIsPressed(false), durations.microInteraction);
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setTimeout(() => setIsPressed(false), 50);
    }
  };

  return (
    <button
      id={id}
      value={value}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled}
      className={cn(
        // Base styles
        'w-full text-left p-4 min-h-[56px] md:min-h-[64px] rounded-xl border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-svip-accent focus:ring-offset-2',
        'hover:border-svip-accent hover:bg-svip-bg/50 hover:shadow-md',
        
        // Default state
        'border-svip-line bg-svip-card',
        
        // Selected state
        isSelected && 'border-svip-accent bg-svip-accent/5 ring-2 ring-svip-accent shadow-sm',
        
        // Pressed state
        isPressed && 'scale-[0.98] shadow-sm',
        
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed hover:border-svip-line hover:bg-svip-card hover:shadow-sm',
        
        // Animation classes removed - now handled at QuestionCard level
        
        // Custom className
        className
      )}
      role="option"
      aria-selected={isSelected}
      style={{
        transitionDuration: `${durations.microInteraction}ms`,
        transitionProperty: 'transform, box-shadow, border-color, background-color'
      }}
    >
      <div className="flex items-center space-x-3">
        {icon && (
          <div className={cn(
            'flex-shrink-0 text-2xl transition-transform duration-200',
            isSelected && 'scale-110'
          )}>
            {icon}
          </div>
        )}
        <span className="text-base md:text-lg font-medium text-svip-ink leading-relaxed">
          {label}
        </span>
        {isSelected && (
          <div className={cn(
            'ml-auto w-5 h-5 rounded-full bg-svip-accent flex items-center justify-center',
            'animate-scale-in'
          )}>
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};

export default ChoiceCard;
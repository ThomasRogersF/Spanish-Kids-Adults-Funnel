import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AcademyToggleProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  isLoading?: boolean;
}

export const AcademyToggle: React.FC<AcademyToggleProps> = ({
  isChecked,
  onChange,
  isLoading = false
}) => {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  // Screen reader announcement for state changes
  const announceToggleChange = (checked: boolean) => {
    const announcement = checked
      ? "Academy added"
      : "Academy removed";
    
    const announcementElement = document.createElement('div');
    announcementElement.setAttribute('role', 'status');
    announcementElement.setAttribute('aria-live', 'polite');
    announcementElement.className = 'sr-only';
    announcementElement.textContent = announcement;
    
    document.body.appendChild(announcementElement);
    setTimeout(() => document.body.removeChild(announcementElement), 1000);
  };

  const handleChange = (checked: boolean) => {
    if (!isLoading) {
      announceToggleChange(checked);
      onChange(checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !isLoading) {
      e.preventDefault();
      handleChange(!isChecked);
    }
  };

  const handleMouseDown = () => {
    if (!isLoading) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div
        className={cn(
          "border rounded-2xl shadow-sm transition-all duration-200",
          "p-4 sm:p-5 lg:p-[18px]",
          // OFF state
          !isChecked && [
            "bg-white",
            "border-[#E6E8EE]",
            "shadow-[0_6px_16px_rgba(16,24,40,0.06)]",
            "hover:bg-[#FFF4EE]"
          ],
          // ON state
          isChecked && [
            "bg-[#FFEDE4]",
            "border-[#FFD5C2]",
            "shadow-[0_6px_16px_rgba(16,24,40,0.05)]",
            "hover:bg-[#FFF4EE]"
          ],
          // Pressed state
          isPressed && !isChecked && "bg-[#F8F8F8]",
          isPressed && isChecked && "bg-[#FFE4D0]"
        )}
      >
        {/* Mobile: Stacked layout */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Left block - Title, helper, benefits */}
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-[#101828]">
              Add Academy
            </h3>
            <p className="text-xs text-gray-500" id="academy-helper">
              50% off · was <span className="line-through">~$98~</span>
            </p>
            <p className="text-xs text-gray-500">
              24/7 self-study · Reinforces live classes
            </p>
          </div>

          {/* Right block - Price, chip, toggle */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-base font-bold text-[#101828]">
              $49/year
            </div>
            
            {/* Status line */}
            <div className={cn(
              "text-xs font-medium",
              isChecked ? "text-[#FF5913]" : "text-[#475467]"
            )}>
              {isChecked ? "Academy will be added at checkout" : "Academy is not in your plan"}
            </div>
            
            <div className="flex items-center gap-3">
              {/* State chip */}
              <div
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200",
                  isChecked
                    ? "bg-[rgba(255,89,19,0.12)] text-[#FF5913]"
                    : "bg-[#F2F4F7] text-[#475467]"
                )}
              >
                {isChecked ? "Included" : "Not added"}
              </div>

              {/* Custom toggle switch */}
              <button
                ref={toggleRef}
                type="button"
                role="switch"
                aria-checked={isChecked}
                aria-describedby="academy-helper"
                onClick={() => handleChange(!isChecked)}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                disabled={isLoading}
                className={cn(
                  "relative inline-flex h-[26px] w-[44px] items-center rounded-full transition-colors duration-200 focus:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#FF5913] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  isChecked ? "bg-[#FF5913]" : "bg-[#E4E7EC]",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="sr-only">Toggle Academy</span>
                <span
                  className={cn(
                    "inline-block h-[22px] w-[22px] transform rounded-full bg-white transition-transform duration-200",
                    isChecked ? "translate-x-[18px]" : "translate-x-[2px]",
                    "shadow-sm"
                  )}
                >
                  {isChecked && (
                    <svg
                      className="h-3 w-3 text-[#FF5913] mt-[3px] ml-[3px]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Single row layout */}
        <div className="hidden lg:flex lg:items-center lg:justify-between">
          {/* Left block - Title, helper, benefits */}
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-[#101828]">
              Add Academy
            </h3>
            <p className="text-xs text-gray-500" id="academy-helper-desktop">
              50% off · was <span className="line-through">~$98~</span>
            </p>
            <p className="text-xs text-gray-500">
              24/7 self-study · Reinforces live classes
            </p>
          </div>

          {/* Right block - Price, chip, toggle */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-base font-bold text-[#101828]">
              $49/year
            </div>
            
            {/* Status line */}
            <div className={cn(
              "text-xs font-medium",
              isChecked ? "text-[#FF5913]" : "text-[#475467]"
            )}>
              {isChecked ? "Academy will be added at checkout" : "Academy is not in your plan"}
            </div>
            
            <div className="flex items-center gap-4">
              {/* State chip */}
              <div
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200",
                  isChecked
                    ? "bg-[rgba(255,89,19,0.12)] text-[#FF5913]"
                    : "bg-[#F2F4F7] text-[#475467]"
                )}
              >
                {isChecked ? "Included" : "Not added"}
              </div>

              {/* Custom toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                aria-describedby="academy-helper-desktop"
                onClick={() => handleChange(!isChecked)}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                disabled={isLoading}
                className={cn(
                  "relative inline-flex h-[28px] w-[48px] items-center rounded-full transition-colors duration-200 focus:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#FF5913] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                  isChecked ? "bg-[#FF5913]" : "bg-[#E4E7EC]",
                  isLoading && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className="sr-only">Toggle Academy</span>
                <span
                  className={cn(
                    "inline-block h-[24px] w-[24px] transform rounded-full bg-white transition-transform duration-200",
                    isChecked ? "translate-x-[20px]" : "translate-x-[2px]",
                    "shadow-sm"
                  )}
                >
                  {isChecked && (
                    <svg
                      className="h-3 w-3 text-[#FF5913] mt-[3.5px] ml-[3.5px]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
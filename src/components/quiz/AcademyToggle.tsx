import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Star, Zap } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleChange = (checked: boolean) => {
    if (!isLoading) {
      onChange(checked);
    }
  };

  // Screen reader announcement for state changes
  const announceToggleChange = (checked: boolean) => {
    const announcement = checked 
      ? "SpanishVIP Academy added to your plan" 
      : "SpanishVIP Academy removed from your plan";
    
    const announcementElement = document.createElement('div');
    announcementElement.setAttribute('role', 'status');
    announcementElement.setAttribute('aria-live', 'polite');
    announcementElement.className = 'sr-only';
    announcementElement.textContent = announcement;
    
    document.body.appendChild(announcementElement);
    setTimeout(() => document.body.removeChild(announcementElement), 1000);
  };

  const handleChange = (checked: boolean) => {
    announceToggleChange(checked);
    handleToggleChange(checked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mb-2"
    >
      <Card 
        className={cn(
          "relative overflow-hidden transition-all duration-500",
          "border-2 shadow-xl",
          isChecked 
            ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-400" 
            : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background elements */}
        <AnimatePresence>
          {isChecked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </AnimatePresence>

        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                <GraduationCap className={cn(
                  "w-8 h-8 transition-colors duration-300",
                  isChecked ? "text-white" : "text-orange-500"
                )} />
                <h3 className={cn(
                  "text-xl sm:text-2xl font-bold transition-colors duration-300",
                  isChecked ? "text-white" : "text-gray-900"
                )}>
                  SpanishVIP Academy
                </h3>
                {isChecked && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    INCLUDED
                  </Badge>
                )}
              </div>
              
              <p className={cn(
                "text-base sm:text-lg mb-4 transition-colors duration-300",
                isChecked ? "text-white/90" : "text-gray-600"
              )}>
                Get 24/7 access to interactive lessons, videos, and exercises—learn anytime, anywhere!
              </p>

              {/* Features list */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  { icon: Star, text: "Interactive Lessons" },
                  { icon: Zap, text: "Self-Paced Learning" },
                  { icon: GraduationCap, text: "Progress Tracking" }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors duration-300",
                      isChecked 
                        ? "bg-white/20 text-white" 
                        : "bg-orange-100 text-orange-700"
                    )}
                  >
                    <feature.icon className="w-3 h-3" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Toggle */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <div className={cn(
                  "text-3xl sm:text-4xl font-bold mb-1 transition-colors duration-300",
                  isChecked ? "text-white" : "text-gray-900"
                )}>
                  {isChecked ? "FREE" : "+$0"}
                </div>
                <p className={cn(
                  "text-sm transition-colors duration-300",
                  isChecked ? "text-white/80" : "text-gray-500"
                )}>
                  Limited time offer
                </p>
              </div>

              {/* Enhanced Switch */}
              <div className="relative">
                <Switch
                  checked={isChecked}
                  onCheckedChange={handleChange}
                  disabled={isLoading}
                  aria-label="Include SpanishVIP Academy premium add-on"
                  aria-describedby="academy-description"
                  className={cn(
                    "scale-125 transition-all duration-300",
                    isChecked && "data-[state=checked]:bg-white",
                    !isChecked && "data-[state=unchecked]:bg-orange-500"
                  )}
                />
                
                {/* Loading overlay */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full"
                  >
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
              </div>

              <p 
                id="academy-description"
                className={cn(
                  "text-xs sm:text-sm max-w-32 text-center transition-colors duration-300",
                  isChecked ? "text-white/80" : "text-gray-500"
                )}
              >
                {isChecked ? "Academy included" : "Add Academy to your plan"}
              </p>
            </div>
          </div>

          {/* Hover effect overlay */}
          <AnimatePresence>
            {isHovered && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isChecked 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)"
                    : "linear-gradient(135deg, rgba(251,146,60,0.1) 0%, rgba(251,146,60,0.05) 100%)"
                }}
              />
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};
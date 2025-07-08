import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  initialTime?: number; // in seconds
  onExpire?: () => void;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'urgent' | 'warning';
}

const CountdownTimer = ({ 
  initialTime = 15 * 60, // 15 minutes default
  onExpire,
  className = "",
  showIcon = true,
  variant = 'urgent'
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onExpire]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'urgent':
        return {
          container: "bg-red-50 border-2 border-red-200",
          text: "text-red-600",
          icon: "text-red-600"
        };
      case 'warning':
        return {
          container: "bg-yellow-50 border-2 border-yellow-200",
          text: "text-yellow-600",
          icon: "text-yellow-600"
        };
      default:
        return {
          container: "bg-gray-50 border-2 border-gray-200",
          text: "text-gray-600",
          icon: "text-gray-600"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} rounded-2xl p-6 text-center ${className}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        {showIcon && <Clock className={`w-6 h-6 ${styles.icon}`} />}
        <span className={`text-lg font-semibold ${styles.text}`}>
          Limited Time Offer Expires In:
        </span>
      </div>
      <div className={`text-4xl font-bold font-mono ${styles.text}`}>
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default CountdownTimer; 
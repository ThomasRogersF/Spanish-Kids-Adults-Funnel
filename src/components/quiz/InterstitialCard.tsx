import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterstitialCardProps {
  title: string;
  description?: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  ctaText?: string;
  onCtaClick: () => void;
  className?: string;
}

const InterstitialCard = ({ 
  title, 
  description, 
  features, 
  ctaText = "Show me options →", 
  onCtaClick,
  className 
}: InterstitialCardProps) => {
  return (
    <div className={cn(
      'w-full max-w-2xl mx-auto p-8 md:p-10 bg-svip-card rounded-xl shadow-svip',
      className
    )}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-inter font-semibold text-svip-ink mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-base md:text-lg text-svip-muted max-w-lg mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-svip-bg rounded-xl p-6 border border-svip-line"
          >
            {feature.icon && (
              <div className="text-3xl mb-3">{feature.icon}</div>
            )}
            <h3 className="text-lg font-semibold text-svip-ink mb-2 font-inter">
              {feature.title}
            </h3>
            <p className="text-sm text-svip-muted leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onCtaClick}
          className="text-svip-accent hover:text-svip-accent/80 hover:bg-svip-accent/5 
                     font-medium text-base px-6 py-3 rounded-full border border-svip-accent/20
                     transition-all duration-200"
        >
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InterstitialCard;
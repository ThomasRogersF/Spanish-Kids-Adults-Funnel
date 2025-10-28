import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  title: string;
  subtitle?: string;
  benefits: string[];
  price?: string;
  originalPrice?: string;
  badge?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

const PlanCard = ({ 
  title, 
  subtitle, 
  benefits, 
  price, 
  originalPrice, 
  badge, 
  ctaText = "Start Free Trial",
  onCtaClick,
  className 
}: PlanCardProps) => {
  return (
    <div className={cn(
      'w-full bg-svip-card rounded-xl shadow-svip p-8 border border-svip-line',
      className
    )}>
      {/* Badge */}
      {badge && (
        <div className="inline-block bg-svip-accent/10 text-svip-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
          {badge}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-inter font-semibold text-svip-ink mb-2">
          {title}
        </h3>
        {subtitle && (
          <p className="text-svip-muted">{subtitle}</p>
        )}
      </div>

      {/* Price */}
      {price && (
        <div className="mb-6">
          {originalPrice && (
            <div className="text-svip-muted line-through text-sm mb-1">
              {originalPrice}
            </div>
          )}
          <div className="text-3xl font-bold text-svip-ink">
            {price}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-svip-ink mb-4 font-inter">
          Why this fits you
        </h4>
        <div className="space-y-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-svip-accent flex-shrink-0 mt-0.5" />
              <span className="text-svip-ink leading-relaxed">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      {onCtaClick && (
        <button
          onClick={onCtaClick}
          className="w-full bg-svip-accent hover:bg-svip-accent/90 text-white font-medium py-3 px-6 rounded-full transition-colors duration-200"
        >
          {ctaText}
        </button>
      )}
    </div>
  );
};

export default PlanCard;
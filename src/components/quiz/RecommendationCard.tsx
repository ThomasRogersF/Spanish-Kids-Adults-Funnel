import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, GraduationCap, Gamepad2 } from 'lucide-react';
import { RecommendationContent } from '@/lib/recommendationEngine';
import { PricingSection } from './PricingSection';
import { cn } from '@/lib/utils';
import { getPaymentLink, Term } from '@/config/paymentLinks';

interface RecommendationCardProps {
  content: RecommendationContent;
  type: 'group' | 'private' | 'kids' | 'bundled';
  isPrimary?: boolean;
  onSelect?: () => void;
  onViewDetails?: () => void;
  paymentLink?: string;
  includeAcademy?: boolean;
  isLoading?: boolean;
}

const iconMap = {
  group: Users,
  private: GraduationCap,
  kids: Gamepad2,
  bundled: Users
};

export const RecommendationCard = ({
  content,
  type,
  isPrimary = false,
  onSelect,
  onViewDetails,
  paymentLink,
  includeAcademy = false,
  isLoading = false
}: RecommendationCardProps) => {
  const Icon = iconMap[type];
  const [term, setTerm] = useState<Term>('monthly');

  const handleGetStarted = () => {
    const checkoutUrl =
      term === 'monthly'
        ? paymentLink
        : getPaymentLink(type, includeAcademy, 'quarterly');

    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
    onSelect?.();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative rounded-2xl p-6 cursor-pointer transition-all duration-300
        ${isPrimary 
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-105' 
          : 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg'
        }
      `}
      onClick={onSelect}
    >
      {isPrimary && (
        <div className="absolute -top-3 -right-3 bg-yellow-400 text-gray-900 rounded-full p-2">
          <Star className="w-5 h-5 fill-current" />
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className={`
          p-3 rounded-full mr-4
          ${isPrimary ? 'bg-white/20' : 'bg-blue-100'}
        `}>
          <Icon className={`w-6 h-6 ${isPrimary ? 'text-white' : 'text-blue-600'}`} />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
            {content.title}
          </h3>
          <p className={`text-sm ${isPrimary ? 'text-blue-100' : 'text-gray-600'}`}>
            {content.subtitle}
          </p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {content.features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className={`
              p-1 rounded-full mr-3 mt-0.5
              ${isPrimary ? 'bg-white/20' : 'bg-green-100'}
            `}>
              <Check className={`w-4 h-4 ${isPrimary ? 'text-white' : 'text-green-600'}`} />
            </div>
            <div>
              <h4 className={`font-semibold text-sm ${isPrimary ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h4>
              <p className={`text-xs ${isPrimary ? 'text-blue-100' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {content.benefits.map((benefit, index) => (
          <span 
            key={index}
            className={`
              text-xs px-2 py-1 rounded-full
              ${isPrimary 
                ? 'bg-white/20 text-white' 
                : 'bg-blue-50 text-blue-700'
              }
            `}
          >
            {benefit}
          </span>
        ))}
      </div>
      
      {/* Term Toggle for eligible plans */}
      {(type === 'group' || type === 'bundled') && (
        <div className="mb-3" role="group" aria-label="Select plan term" onClick={(e) => e.stopPropagation()}>
          <div className={cn(
            "inline-flex rounded-full border",
            isPrimary ? "border-white/40" : "border-gray-300"
          )}>
            <button
              type="button"
              className={cn(
                "px-3 py-1.5 text-sm rounded-l-full transition-colors focus:outline-none focus-visible:ring-2",
                term === 'monthly'
                  ? (isPrimary ? "bg-white text-blue-700" : "bg-blue-600 text-white")
                  : (isPrimary ? "bg-transparent text-white/90 hover:bg-white/10" : "bg-transparent text-gray-700 hover:bg-gray-100")
              )}
              aria-pressed={term === 'monthly'}
              onClick={() => setTerm('monthly')}
            >
              1 month
            </button>
            <button
              type="button"
              className={cn(
                "px-3 py-1.5 text-sm rounded-r-full transition-colors focus:outline-none focus-visible:ring-2",
                term === 'quarterly'
                  ? (isPrimary ? "bg-white text-blue-700" : "bg-blue-600 text-white")
                  : (isPrimary ? "bg-transparent text-white/90 hover:bg-white/10" : "bg-transparent text-gray-700 hover:bg-gray-100")
              )}
              aria-pressed={term === 'quarterly'}
              onClick={() => setTerm('quarterly')}
            >
              3 months
            </button>
          </div>
        </div>
      )}

      {/* Pricing Section */}
      {content.pricing && (
        <PricingSection
          pricingData={content.pricing}
          isPrimary={isPrimary}
          type={type}
        />
      )}
      
      <div className="flex gap-2">
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          aria-label={`Get started with ${content.title} ${content.pricing ? `— ${content.pricing.discountPercent}% off first month applied` : ''} ${paymentLink ? 'and proceed to checkout' : ''}`}
          className={cn(
            "flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300",
            "relative overflow-hidden",
            isPrimary
              ? 'bg-white text-blue-600 hover:bg-blue-50'
              : 'bg-blue-600 text-white hover:bg-blue-700',
            isLoading && "opacity-75 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </div>
          ) : (
            <>
              {isPrimary ? 'Get Started — 50% OFF Applied →' : 'Choose This'}
              {paymentLink && <span className="ml-1">→</span>}
            </>
          )}
        </button>
        
        {onViewDetails && (
          <button
            className={`
              py-2 px-4 rounded-lg font-medium transition-colors
              ${isPrimary 
                ? 'bg-white/20 text-white hover:bg-white/30' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            Details
          </button>
        )}
      </div>
    </motion.div>
  );
};
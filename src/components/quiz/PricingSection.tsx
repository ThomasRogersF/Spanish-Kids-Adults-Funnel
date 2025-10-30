import React from 'react';
import { cn } from '@/lib/utils';

interface PricingData {
  listPrice: number;
  listPriceFormatted: string;
  salePrice: number;
  salePriceFormatted: string;
  discountPercent: number;
  saleBadgeText: string;
  saleNote: string;
  finePrint: string;
}

interface PricingSectionProps {
  pricingData: PricingData;
  isPrimary?: boolean;
  type: 'group' | 'private' | 'kids' | 'bundled';
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingData,
  isPrimary = false,
  type
}) => {
  const savingsAmount = pricingData.listPrice - pricingData.salePrice;
  
  return (
    <div className="my-4">
      {/* Pricing Panel - White Sub-card */}
      <div
        className="
          w-full p-5 sm:p-6
          bg-white border border-gray-200
          rounded-2xl sm:rounded-3xl
          shadow-lg
        "
        style={{
          boxShadow: '0 10px 24px rgba(16,24,40,0.08)',
          borderColor: '#E6E8EE'
        }}
      >
        <div className="space-y-4">
          {/* Badges Row */}
          <div className="flex items-center gap-2">
            <span
              className="
                inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                bg-orange-500 text-white
              "
            >
              <span aria-hidden="true" className="mr-1">⭐</span>
              {pricingData.saleBadgeText}
            </span>
            <span
              className="
                inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                bg-orange-500 text-white
              "
            >
              {pricingData.discountPercent}% OFF
            </span>
          </div>

          {/* Price Stack */}
          <div className="space-y-2">
            {/* Original Price */}
            <div className="text-sm text-gray-500">
              <s aria-label={`Was ${pricingData.listPriceFormatted}`}>
                Was {pricingData.listPriceFormatted}
              </s>
            </div>
            
            {/* Sale Price */}
            <div className="flex items-baseline gap-2">
              <span
                className="
                  font-bold leading-tight text-gray-900
                  text-2xl sm:text-3xl lg:text-4xl
                "
                aria-label={`Now ${pricingData.salePriceFormatted} for the first month`}
              >
                {pricingData.salePriceFormatted}
              </span>
              <span className="text-sm text-gray-600">
                / first month
              </span>
            </div>
            
            {/* Savings Helper */}
            <div className="text-sm font-medium text-gray-700">
              You save ${savingsAmount} ({pricingData.discountPercent}%) today
            </div>
          </div>

          {/* Fine Print */}
          <div className="text-xs text-gray-500">
            {pricingData.finePrint}
          </div>
        </div>
      </div>
    </div>
  );
};
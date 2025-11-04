import React from 'react';
import type { Term } from '@/config/paymentLinks';

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
  type: 'group' | 'private' | 'bundled';
  includeAcademy?: boolean;
  academyFee?: number;
  term?: Term;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingData,
  isPrimary = false,
  type,
  includeAcademy = false,
  academyFee = 49,
  term = 'monthly'
}) => {
  const adjustedSalePrice = pricingData.salePrice + (includeAcademy ? academyFee : 0);
  const adjustedSalePriceFormatted = `$${adjustedSalePrice.toFixed(2)}`;
  const savingsAmount = pricingData.listPrice - adjustedSalePrice;
  const discountPercentDerived = Math.max(
    0,
    Math.round(((pricingData.listPrice - adjustedSalePrice) / pricingData.listPrice) * 100)
  );
  const periodLabel = term === 'quarterly' ? '/ first 3 months' : '/ first month';
  
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
                inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
                bg-orange-500 text-white
              "
            >
              {discountPercentDerived}% OFF
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
                aria-label={`Now ${adjustedSalePriceFormatted} for the first month`}
              >
                {adjustedSalePriceFormatted}
              </span>
              <span className="text-sm text-gray-600">
                {periodLabel}
              </span>
            </div>
            
            {/* Savings Helper */}
            <div className="text-sm font-medium text-gray-700">
              You save ${savingsAmount.toFixed(2)} ({discountPercentDerived}%) today
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
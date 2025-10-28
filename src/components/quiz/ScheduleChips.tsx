import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ScheduleChip {
  id: string;
  label: string;
  time: string;
  available?: boolean;
}

interface ScheduleChipsProps {
  chips: ScheduleChip[];
  selectedChip?: string;
  onChipSelect: (chipId: string) => void;
  className?: string;
}

const ScheduleChips = ({ 
  chips, 
  selectedChip, 
  onChipSelect, 
  className 
}: ScheduleChipsProps) => {
  return (
    <div className={cn('space-y-3', className)}>
      <h4 className="text-lg font-semibold text-svip-ink font-inter mb-4">
        Choose your schedule
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {chips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => chip.available !== false && onChipSelect(chip.id)}
            disabled={chip.available === false}
            className={cn(
              // Base styles
              'p-3 rounded-xl border-2 transition-all duration-200 text-left',
              'focus:outline-none focus:ring-2 focus:ring-svip-accent focus:ring-offset-2',
              
              // Default state
              'border-svip-line bg-svip-card hover:border-svip-accent/50',
              
              // Selected state
              selectedChip === chip.id && 'border-svip-accent bg-svip-accent/5 ring-2 ring-svip-accent',
              
              // Disabled state
              chip.available === false && 'opacity-40 cursor-not-allowed hover:border-svip-line',
              
              // Text sizing
              'text-sm md:text-base'
            )}
          >
            <div className="font-medium text-svip-ink">
              {chip.label}
            </div>
            <div className="text-svip-muted text-xs md:text-sm">
              {chip.time}
            </div>
            {chip.available === false && (
              <div className="text-xs text-red-500 mt-1">
                Not available
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScheduleChips;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { cn } from '@/lib/utils';

interface EmailGateModalProps {
  isOpen: boolean;
  onSubmit: (email: string) => void;
  onSkip?: () => void;
  isLoading?: boolean;
  className?: string;
}

// Email validation schema
const emailSchema = z.string().email('Please enter a valid email address');

const EmailGateModal = ({ 
  isOpen, 
  onSubmit, 
  onSkip, 
  isLoading = false,
  className 
}: EmailGateModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showNudge, setShowNudge] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    try {
      emailSchema.parse(email);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        return err.errors[0]?.message || 'Invalid email';
      }
      return 'Invalid email';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    if (validationError !== true) {
      setError(validationError);
      return;
    }
    
    setError('');
    onSubmit(email);
  };

  const handleSkip = () => {
    setShowNudge(true);
  };

  const handleNudgeConfirm = () => {
    setShowNudge(false);
    onSkip?.();
  };

  const handleNudgeCancel = () => {
    setShowNudge(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Main Modal */}
      <div className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        className
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-md bg-svip-card rounded-xl shadow-svip p-8">
          {/* Close Button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-svip-muted hover:text-svip-ink transition-colors"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl font-inter font-semibold text-svip-ink mb-4">
              Enter your email to see your personalized plan
            </h2>
            
            <p className="text-svip-muted mb-6">
              We'll send your results and exclusive offers to help you start your Spanish journey.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <Label htmlFor="email" className="text-sm font-medium text-svip-ink">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={cn(
                    'mt-1',
                    error && 'border-red-500 focus:ring-red-500'
                  )}
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-svip-accent hover:bg-svip-accent/90 text-white font-medium py-3 rounded-full"
                disabled={!email || isLoading}
              >
                {isLoading ? 'Sending...' : 'Send my plan & show results'}
              </Button>
            </form>

            {/* Fine Print */}
            <div className="mt-6 text-xs text-svip-muted">
              <p>
                We respect your privacy. Unsubscribe anytime. View our{' '}
                <a href="/privacy" className="underline hover:text-svip-ink">Privacy Policy</a>
                {' '}and{' '}
                <a href="/terms" className="underline hover:text-svip-ink">Terms</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Nudge Modal */}
      {showNudge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleNudgeCancel}
          />
          
          <div className="relative w-full max-w-sm bg-svip-card rounded-xl shadow-svip p-6">
            <h3 className="text-lg font-inter font-semibold text-svip-ink mb-3">
              We built your plan based on your answers—save it?
            </h3>
            
            <p className="text-svip-muted mb-6">
              Enter your email to keep your personalized Spanish learning plan.
            </p>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleNudgeCancel}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNudgeConfirm}
                className="flex-1 bg-svip-accent hover:bg-svip-accent/90 text-white"
              >
                See plan
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailGateModal;
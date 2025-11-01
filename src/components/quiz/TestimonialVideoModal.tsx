import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Testimonial {
  name: string;
  quote: string;
  video: string;
  image: string;
}

interface TestimonialVideoModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TestimonialVideoModal: React.FC<TestimonialVideoModalProps> = ({
  testimonial,
  isOpen,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!testimonial || !isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Semi-transparent backdrop with blur */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          
          {/* Modal content container */}
          <div
            ref={modalRef}
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                onClose();
              }
            }}
          >
            {/* External close button (outside video box) */}
            <button
              onClick={onClose}
              className="
                absolute top-6 right-6 z-50
                bg-white/20 backdrop-blur-sm
                rounded-full p-3
                hover:bg-white/30 hover:scale-110
                transition-all duration-200
                group
              "
              aria-label="Close video modal"
            >
              <X
                className="w-6 h-6 text-white transition-transform group-hover:rotate-90"
              />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: 0.1
              }}
              className="relative w-full max-w-4xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphism container */}
              <div 
                className="
                  relative bg-white/10 backdrop-blur-lg 
                  border border-white/20 rounded-2xl shadow-2xl
                  overflow-hidden
                "
                style={{
                  backdropFilter: 'blur(16px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Video container */}
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    src={testimonial.video}
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                    aria-label={`Testimonial video from ${testimonial.name}: ${testimonial.quote}`}
                  />
                  
                </div>
                
                {/* Testimonial info */}
                <div className="p-6 bg-black/20 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} testimonial thumbnail`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                    />
                    <div>
                      <h3 
                        id="modal-title"
                        className="text-lg font-semibold text-white"
                      >
                        {testimonial.name}
                      </h3>
                      <div className="flex text-yellow-400">
                        {"★".repeat(5)}
                      </div>
                    </div>
                  </div>
                  <p 
                    id="modal-description"
                    className="text-white/90 text-base leading-relaxed"
                  >
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
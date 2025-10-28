import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  avatar?: string;
  rating?: number;
}

interface ProofCarouselProps {
  testimonials: Testimonial[];
  className?: string;
}

const ProofCarousel = ({ testimonials, className }: ProofCarouselProps) => {
  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <h3 className="text-xl font-inter font-semibold text-svip-ink mb-6 text-center">
        What our students say
      </h3>
      
      <Carousel
        opts={{
          align: 'start',
          slidesToScroll: 1,
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/3 basis-full">
              <div className="bg-svip-card rounded-xl p-6 border border-svip-line h-full">
                {/* Rating */}
                {testimonial.rating && (
                  <div className="flex text-yellow-400 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                )}
                
                {/* Quote */}
                <blockquote className="text-svip-ink mb-4 text-sm md:text-base leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center space-x-3">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-medium text-svip-ink text-sm">
                      {testimonial.name}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProofCarousel;
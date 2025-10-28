
import { Button } from "@/components/ui/button";
import { QuizConfig, QuizParticipant, ResultTemplate } from "@/types/quiz";
import { ArrowRight, CheckCircle } from "lucide-react";
import PlanCard from "./PlanCard";
import ScheduleChips from "./ScheduleChips";
import ProofCarousel from "./ProofCarousel";

interface ResultsPageProps {
  config: QuizConfig;
  participant: QuizParticipant;
  personalizedResult: ResultTemplate | null;
  onContinue: () => void;
}

const ResultsPage = ({
  config,
  participant,
  personalizedResult,
  onContinue
}: ResultsPageProps) => {
  // Sample schedule chips
  const scheduleChips = [
    { id: '1', label: 'Tuesday', time: '7:30 PM' },
    { id: '2', label: 'Thursday', time: '7:30 PM' },
    { id: '3', label: 'Saturday', time: '10:00 AM' },
    { id: '4', label: 'Monday', time: '6:00 PM' },
    { id: '5', label: 'Wednesday', time: '8:00 PM' },
    { id: '6', label: 'Friday', time: '5:30 PM' },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: '1',
      name: 'Dale Givens',
      quote: 'Classes were structured to meet my needs... the best experience I have had with online language instruction.',
      avatar: '/images/testimonials-preview/boris-testimonial.png',
      rating: 5
    },
    {
      id: '2',
      name: 'Matthew Heredia',
      quote: 'Each class is tailored to my individual needs and abilities. My one-on-one instructor is very passionate.',
      avatar: '/images/testimonials-preview/chris-testimonial.png',
      rating: 5
    },
    {
      id: '3',
      name: 'Milton Lindsay',
      quote: 'Spanish VIP is the best program I\'ve worked with. My instructor stays flexible while providing a structured curriculum.',
      avatar: '/images/testimonials-preview/kholman-testimonial.png',
      rating: 5
    },
    {
      id: '4',
      name: 'Suzanne',
      quote: 'My confidence has skyrocketed!',
      avatar: '/images/testimonials-preview/suzanne-testimonial.png',
      rating: 5
    },
    {
      id: '5',
      name: 'Koji',
      quote: 'I can finally talk to my grandchildren in Spanish!',
      avatar: '/images/testimonials-preview/koji-testimonial.png',
      rating: 5
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-inter font-semibold text-svip-ink mb-4">
          Your Personalized Spanish Plan 🎉
        </h1>
        {personalizedResult && (
          <p className="text-lg text-svip-muted max-w-2xl mx-auto">
            {personalizedResult.description}
          </p>
        )}
      </div>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        <PlanCard
          title="Private Tutoring"
          subtitle="Perfect for focused learning"
          benefits={[
            "Matched teacher for your learning style",
            "Personalized curriculum based on your goals",
            "Flexible scheduling that fits your life"
          ]}
          price="$99/month"
          originalPrice="$149/month"
          badge="RECOMMENDED"
          onCtaClick={onContinue}
        />
        
        <PlanCard
          title="Group Classes"
          subtitle="Learn with others"
          benefits={[
            "Interactive sessions with fellow learners",
            "Broad timetable with unlimited classes",
            "More affordable option"
          ]}
          price="$49.50/month"
          originalPrice="$99/month"
          badge="50% OFF"
          onCtaClick={onContinue}
        />
      </div>

      {/* Schedule Selection */}
      <div className="bg-svip-card rounded-xl shadow-svip p-8 border border-svip-line">
        <ScheduleChips
          chips={scheduleChips}
          selectedChip="1"
          onChipSelect={(chipId) => console.log('Selected chip:', chipId)}
        />
      </div>

      {/* Support Card */}
      <div className="bg-svip-card rounded-xl shadow-svip p-8 border border-svip-line">
        <div className="text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-svip-accent" />
              <span className="text-svip-ink font-medium">Real teacher</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-svip-accent" />
              <span className="text-svip-ink font-medium">Flexible schedule</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-svip-accent" />
              <span className="text-svip-ink font-medium">Adjust anytime</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-svip-accent text-svip-accent hover:bg-svip-accent hover:text-white"
              onClick={() => console.log('See group calendar')}
            >
              See group calendar
            </Button>
            <Button
              variant="outline"
              className="border-svip-accent text-svip-accent hover:bg-svip-accent hover:text-white"
              onClick={() => console.log('Book 1-on-1')}
            >
              Book 1-on-1
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <ProofCarousel testimonials={testimonials} />

      {/* Fine Print */}
      <div className="text-center">
        <p className="text-sm text-svip-muted max-w-2xl mx-auto">
          This isn't a formal test to evaluate your Spanish skills — it's just a fun way to get to know you better so we can send you personalized recommendations, resources, and exclusive deals from SpanishVIP. 🎁✨
          <br />
          So no pressure — just enjoy it!
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationCard } from './RecommendationCard';
import { recommendationContent, RecommendationState } from '@/lib/recommendationEngine';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VideoPlayer } from '@/components/ui/video-player';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, Gamepad2, Star, ArrowRight, Play, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';

interface RecommendationResultsProps {
  recommendationState: RecommendationState;
  answers: any[];
  onSelectTrack: (track: 'group' | 'private' | 'kids') => void;
}

export const RecommendationResults = ({ 
  recommendationState, 
  answers, 
  onSelectTrack 
}: RecommendationResultsProps) => {
  const [isKidsOverride, setIsKidsOverride] = useState(recommendationState.isKidsOverride);
  const [selectedTrack, setSelectedTrack] = useState<'group' | 'private' | 'kids' | null>(null);
  
  const { recommendedTrack, groupScore, privateScore } = recommendationState;
  const maxScore = Math.max(groupScore, privateScore);
  const groupPercentage = maxScore > 0 ? (groupScore / maxScore) * 100 : 50;
  const privatePercentage = maxScore > 0 ? (privateScore / maxScore) * 100 : 50;
  
  const getScoreColor = (score: number, isMax: boolean) => {
    if (isMax) return 'bg-green-500';
    if (score > 0) return 'bg-blue-500';
    return 'bg-gray-300';
  };
  
  const handleKidsToggle = (checked: boolean) => {
    setIsKidsOverride(checked);
    if (checked) {
      setSelectedTrack('kids');
    } else {
      setSelectedTrack(recommendedTrack);
    }
  };
  
  const handleTrackSelect = (track: 'group' | 'private' | 'kids') => {
    setSelectedTrack(track);
    onSelectTrack(track);
  };
  
  return (
    <>
      {/* Logo */}
      <div className="w-full flex justify-center pt-4 pb-2">
        <img
          src="/images/SpanishVIP Logo.png"
          alt="SpanishVIP Logo"
          className="h-12 sm:h-16"
        />
      </div>
      
      {/* Header */}
      <section
        aria-labelledby="results-header-title"
        className="w-full"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-4 text-center">
          {/* Micro-proof row */}
          <div className="flex flex-row items-center justify-center gap-3 mb-4">
            <img
              src="/images/Students.png"
              alt="Happy SpanishVIP students"
              className="h-10 sm:h-12 rounded-lg shadow-sm"
            />
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-left">
                Join Hundreds of
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-left">
                Happy Spanish Students
              </span>
            </div>
          </div>
          
          {/* Main headline block */}
          <h1
            id="results-header-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight"
          >
            Your Personalized
            <br /><span style={{ color: '#FF5913' }}>Spanish Learning Path</span>
          </h1>
          
          {/* Subhead */}
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Based on your answers, we've found the 
            <br />perfect learning approach for you.
          </p>
        </div>
      </section>
      
      {/* Group Classes Section - Only show when recommendedTrack is 'group' */}
      {recommendedTrack === 'group' && !isKidsOverride && (
        <section
          aria-labelledby="gc-title"
          className="w-full rounded-3xl"
          style={{ backgroundColor: 'rgba(255, 89, 19, 0.06)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="lg:col-span-7">
                <div className="space-y-3 lg:space-y-4">
                  {/* Eyebrow */}
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: '#FF5913' }}>
                    Group Classes
                  </p>
                  
                  {/* Headline */}
                  <h2
                    id="gc-title"
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                    style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
                  >
                    Spanish classes, <span style={{ color: '#FF5913' }}>built for the real world</span>
                  </h2>
                  
                  {/* Body Copy */}
                  <p className="text-base lg:text-lg text-gray-700 max-w-2xl leading-relaxed">
                    Our highly practical and engaging classes are just what you need to learn Spanish, fast. They're also unlimited, for true immersion without leaving home.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Main Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-full max-w-md"
                >
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src="/images/Learn together with SpanishVIP.png"
                      alt="SpanishVIP teacher leading an online class"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Private Classes Section - Only show when recommendedTrack is 'private' */}
      {recommendedTrack === 'private' && !isKidsOverride && (
        <section
          aria-labelledby="pt-title"
          className="w-full rounded-3xl"
          style={{ backgroundColor: 'rgba(49, 255, 203, 0.06)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="lg:col-span-7">
                <div className="space-y-3 lg:space-y-4">
                  {/* Eyebrow */}
                  <p className="text-sm font-bold uppercase tracking-wide" style={{ color: '#1DD3B0' }}>
                    Private Classes
                  </p>
                  
                  {/* Headline */}
                  <h2
                    id="pt-title"
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
                    style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}
                  >
                    World-class Online <span style={{ color: '#1DD3B0' }}>Spanish Tutoring</span>
                  </h2>
                  
                  {/* Body Copy */}
                  <p className="text-base lg:text-lg text-gray-700 max-w-2xl leading-relaxed">
                    Fast-track your language learning using private Spanish tutoring with a dedicated teacher. Get a curriculum that's custom built for your specific goals and interests.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Main Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-full max-w-md"
                >
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src="/images/Learn Spanish Online with SpanishVIP.png"
                      alt="One-to-one online Spanish tutoring with a dedicated SpanishVIP teacher"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <div className="max-w-4xl mx-auto px-6 pt-2 pb-6 space-y-6">
      
      {/* Video Section - DEACTIVATED */}
      {/*
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-4"
      >
        <VideoPlayer
          src="/videos/Spanish-Private-Tutoring.mp4"
          autoplay={true}
          showControls={true}
          ambientMode={false}
          rounded={true}
          className="w-full max-w-3xl mx-auto shadow-2xl"
        />
      </motion.div>
      */}
      
      {/* Kids Override Toggle */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Gamepad2 className="w-5 h-5 text-purple-600" />
                <div>
                  <Label htmlFor="kids-toggle" className="font-medium text-gray-900">
                    Learning for a child (4-17 years)?
                  </Label>
                  <p className="text-sm text-gray-600">
                    Get age-appropriate content and activities
                  </p>
                </div>
              </div>
              <Switch
                id="kids-toggle"
                checked={isKidsOverride}
                onCheckedChange={handleKidsToggle}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Score Breakdown */}
      {!isKidsOverride && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                How We Made This Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Group Classes</span>
                    <Badge variant="outline">{groupScore} points</Badge>
                  </div>
                  <span className="text-sm text-gray-600">{groupPercentage.toFixed(0)}%</span>
                </div>
                <Progress 
                  value={groupPercentage} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">Private Tutoring</span>
                    <Badge variant="outline">{privateScore} points</Badge>
                  </div>
                  <span className="text-sm text-gray-600">{privatePercentage.toFixed(0)}%</span>
                </div>
                <Progress 
                  value={privatePercentage} 
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* Recommendation Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <AnimatePresence mode="wait">
          {/* Primary Recommendation */}
          <motion.div
            key={isKidsOverride ? 'kids' : recommendedTrack}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2"
          >
            <RecommendationCard
              content={recommendationContent[isKidsOverride ? 'kids' : recommendedTrack]}
              type={isKidsOverride ? 'kids' : recommendedTrack}
              isPrimary={true}
              onSelect={() => handleTrackSelect(isKidsOverride ? 'kids' : recommendedTrack)}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Alternative Options */}
        {!isKidsOverride && (
          <>
            {recommendedTrack !== 'group' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RecommendationCard
                  content={recommendationContent.group}
                  type="group"
                  onSelect={() => handleTrackSelect('group')}
                />
              </motion.div>
            )}
            
            {recommendedTrack !== 'private' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <RecommendationCard
                  content={recommendationContent.private}
                  type="private"
                  onSelect={() => handleTrackSelect('private')}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <span>Ready to start your Spanish journey?</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>
      </div>
      
      {/* SpanishVIP Academy Section */}
      <section
        aria-labelledby="academy-title"
        className="py-14 sm:py-16 lg:py-18 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: '#172033' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-12 lg:p-16">
              {/* Left Column - Text Content */}
              <div className="lg:col-span-7 space-y-6">
                <motion.h2
                  id="academy-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white"
                  style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
                >
                  Master Spanish at Your Own Pace with{' '}
                  <span style={{ color: '#50C1A3' }}>SpanishVIP</span>{' '}
                  <span style={{ color: '#FF5913' }}>Academy</span>
                  <span aria-hidden="true" className="inline-block ml-2">✨</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed"
                >
                  Get 24/7 access to interactive lessons, videos, and exercises—learn anytime, anywhere, and watch your fluency flourish!
                </motion.p>
              </div>
              
              {/* Right Column - Image */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="w-full max-w-md"
                >
                  <img
                    src="/images/Academy.png"
                    alt="SpanishVIP Academy on laptop, tablet and phone"
                    className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Video Testimonials Section */}
      <section className="py-8 sm:py-12 lg:py-16 w-full min-w-full p-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Real stories from our Spanish learners
          </h2>
          
          <div className="w-full max-w-5xl mx-auto">
            <Carousel opts={{ align: 'start', slidesToScroll: 1 }} plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}>
              <CarouselContent className="-ml-4">
                {[
                  {
                    name: "Koji",
                    quote: "I can finally talk to my grandchildren in Spanish!",
                    video: "/videos/koji-testimonial.mp4",
                    image: "/images/testimonials-preview/koji-testimonial.png"
                  },
                  {
                    name: "Suzanne",
                    quote: "My confidence has skyrocketed! I love it!",
                    video: "/videos/suzanne-testimonial.mp4",
                    image: "/images/testimonials-preview/suzanne-testimonial.png"
                  },
                  {
                    name: "Catie",
                    quote: "Learning Spanish opened new doors!",
                    video: "/videos/catie-testimonial.mp4",
                    image: "/images/testimonials-preview/catie-testimonial.png"
                  },
                  {
                    name: "Boris",
                    quote: "Classes were structured to meet my needs...",
                    video: "/videos/boris-testimonial.mp4",
                    image: "/images/testimonials-preview/boris-testimonial.png"
                  },
                  {
                    name: "Chris",
                    quote: "Each class is tailored to my individual needs and abilities.",
                    video: "/videos/chris-testimonial.mp4",
                    image: "/images/testimonials-preview/chris-testimonial.png"
                  },
                  {
                    name: "Kholman",
                    quote: "Spanish VIP is the best program I've worked with.",
                    video: "/videos/kholman-testimonial.mp4",
                    image: "/images/testimonials-preview/kholman-testimonial.png"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/3 basis-full">
                    <div className="relative overflow-hidden shadow-lg rounded-2xl group cursor-pointer" onClick={() => window.open(testimonial.video, '_blank')}>
                      <div className="aspect-video relative">
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name} testimonial preview`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800 ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex text-yellow-400 mb-2">
                          {"★".repeat(5)}
                        </div>
                        <p className="text-gray-700 mb-2 text-sm sm:text-base">"{testimonial.quote}"</p>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4" />
              <CarouselNext className="-right-4" />
            </Carousel>
          </div>
          
          <div className="text-center">
            <br/>
            <p className="text-base sm:text-lg text-gray-600">Join 2,147 successful Spanish learners</p>
          </div>
        </div>
      </section>
    </>
  );
};
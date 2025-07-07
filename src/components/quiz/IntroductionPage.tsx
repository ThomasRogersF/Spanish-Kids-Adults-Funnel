
import { Button } from "@/components/ui/button";
import { QuizConfig } from "@/types/quiz";
import { ArrowRight, Check } from "lucide-react";

interface IntroductionPageProps {
  config: QuizConfig;
  onStart: () => void;
}

const IntroductionPage = ({ config, onStart }: IntroductionPageProps) => {
  const benefits = [
    "Start learning at your own comfortable pace",
    "Connect with new friends globally",
    "Boost your brain health and memory",
    "Travel with confidence and cultural immersion",
    "Achieve your lifelong dream of speaking Spanish",
    "Enjoy flexible classes that fit your schedule"
  ];

  // Images for the marquee - depicting happy older adults learning
  const marqueeImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop&crop=faces"
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-100 opacity-30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-100 opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-green-100 opacity-30 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 bg-yellow-100 opacity-30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-100 opacity-20 rounded-full"></div>
      </div>

      <div className="w-full px-6 py-8 relative z-10">
        {/* Stats header */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-lg font-medium">47,858 Students Worldwide</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start w-full">
          {/* Left Column - Content */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <img 
                src="https://spanishvip.com/wp-content/uploads/2025/06/SpanishVIP-Original-Logo.png" 
                alt="SpanishVIP Logo" 
                className="h-12 max-w-[200px] object-contain"
              />
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                It's Never Too Late to{" "}
                <span className="text-[#FF5913]">Master Spanish!</span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Take our quick quiz to discover your perfect learning style and 
                unlock a special offer to start your journey today.
              </p>
            </div>

            {/* Benefits List - Two Column Grid */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Why Spanish Learning After 50 is Perfect:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 bg-[#1DD3B0] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={onStart}
                className="bg-[#FF5913] hover:bg-[#e84c09] text-white px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start My Quiz Now!
              </Button>
              <Button 
                onClick={onStart}
                variant="outline"
                className="border-2 border-[#FF5913] text-[#FF5913] hover:bg-[#FF5913] hover:text-white px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300"
              >
                Find My Learning Path <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Credibility */}
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">Trusted by Thousands</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                  <span className="font-medium">4.8/5 Rating</span>
                </div>
                <span>•</span>
                <span className="font-medium">47,858+ Students</span>
                <span>•</span>
                <span className="font-medium">As Featured On TrustPilot</span>
              </div>
              
              {/* Quiz duration */}
              <div className="inline-flex items-center bg-gray-50 rounded-full px-3 py-1 shadow-sm mt-2">
                <div className="w-2 h-2 bg-[#1DD3B0] rounded-full mr-2"></div>
                <span className="text-gray-700 font-medium text-sm">Quiz takes less than 2 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Marquee */}
          <div className="relative h-[600px] overflow-hidden rounded-2xl">
            {/* Marquee Container */}
            <div className="marquee-container h-full">
              <div className="marquee-content">
                {/* First set of images */}
                {marqueeImages.map((image, index) => (
                  <div key={`first-${index}`} className="marquee-item mb-4">
                    <img
                      src={image}
                      alt={`Happy learner ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {marqueeImages.map((image, index) => (
                  <div key={`second-${index}`} className="marquee-item mb-4">
                    <img
                      src={image}
                      alt={`Happy learner ${index + 1} duplicate`}
                      className="w-full h-48 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gradient overlays for smooth fade effect */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10"></div>
          </div>
        </div>
      </div>

      <style>{`
        .marquee-container {
          position: relative;
        }
        
        .marquee-content {
          display: flex;
          flex-direction: column;
          animation: marquee 20s linear infinite;
        }
        
        .marquee-item {
          flex-shrink: 0;
        }
        
        @keyframes marquee {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        .marquee-content:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default IntroductionPage;

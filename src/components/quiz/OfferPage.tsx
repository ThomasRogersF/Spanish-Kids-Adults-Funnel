import React, { useState } from 'react';
import { CheckCircle, Users, BookOpen, Clock, Star, Globe, Heart, Brain, Shield, Smartphone, Award, MessageCircle, Play } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import MobileFeaturesSection from './MobileFeaturesSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const OfferPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Branding and Headline */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4 sm:mb-6">
                <img
                  src="https://spanishvip.com/wp-content/uploads/2025/06/SpanishVIP-Original-Logo.png"
                  alt="SpanishVIP Logo"
                  className="h-10 sm:h-12 w-auto"
                  style={{ maxWidth: 160 }}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
                See how SpanishVIP will transform your Spanish journey
              </h1>
              <div className="bg-orange-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-2 sm:mb-0 sm:mr-4">87%</span>
                  <span className="text-gray-700 text-sm sm:text-base lg:text-lg text-center sm:text-left">
                    of learners in our program reported confident conversations within 90 days of starting their Spanish classes.
                  </span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center text-lg sm:text-xl shadow-lg w-full sm:w-auto">
                Claim Your Offer
                <span className="ml-2">→</span>
              </button>
            </div>
            {/* Hero Image */}
            <div className="relative order-first lg:order-last">
              <img 
                src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Happy mature woman learning Spanish" 
                className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Unified Results Section (2x2 grid of cards) */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Based on your answers, your Spanish learning journey is...
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: Progress Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Your Spanish can flourish</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Now</span>
                  <span className="text-gray-600 text-sm sm:text-base">3 months</span>
                </div>
                <div className="relative">
                  <div className="h-24 sm:h-32 bg-gray-100 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-orange-200 to-orange-100 rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-full">
                      <svg viewBox="0 0 300 100" className="w-full h-24 sm:h-32">
                        <path
                          d="M 0 80 Q 75 60 150 40 T 300 20"
                          stroke="#ea580c"
                          strokeWidth="3"
                          fill="none"
                          className="drop-shadow-sm"
                        />
                        <circle cx="50" cy="70" r="4" fill="#ea580c" />
                        <circle cx="150" cy="40" r="4" fill="#ea580c" />
                        <circle cx="250" cy="25" r="4" fill="#ea580c" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Basic phrases</span>
                  <span>Simple conversations</span>
                  <span>Confident fluency</span>
                </div>
              </div>
            </div>
            
            {/* Card 2: Confidence Boost */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Confidence / 3 months</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Increased quality of travel experiences</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Deeper family connections</span>
                </div>
                <div className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg inline-block font-semibold text-sm sm:text-base">
                  +73.4%
                </div>
                <div className="mt-4 sm:mt-6">
                  <div className="bg-gray-200 rounded-full h-3 sm:h-4">
                    <div className="bg-orange-500 h-3 sm:h-4 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 3: Spanish Skill Improvement */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Spanish Skill Improvement</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base">Current Level</span>
                  <span className="text-gray-600 text-sm sm:text-base">TODAY</span>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 text-xs sm:text-sm">PROBLEMATIC</span>
                    <span className="text-xs sm:text-sm text-gray-500 text-right">IMPROVED SPEAKING & COMPREHENSION</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="text-center text-xs sm:text-sm text-gray-600 mt-2">IN 3 MONTHS</div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 text-xs sm:text-sm">PROBLEMATIC</span>
                    <span className="text-xs sm:text-sm text-gray-500 text-right">IMPROVED SPEAKING & COMPREHENSION</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-center">
                    <span className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      With SpanishVIP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 4: Boost of Learning Success */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Boost of Learning Success</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#ea580c"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="50.24"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">80%</div>
                      <div className="text-xs sm:text-sm text-gray-600">success rate in our study comparing 20 participants</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>MONTH 1</span>
                <span>MONTH 2</span>
                <span>MONTH 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Replace the old mobile learning section with the new one */}
      <MobileFeaturesSection />

      {/* Social Proof Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                80% of our students report more confident Spanish conversations within 90 days
              </h2>
              
              <div className="grid gap-4 sm:gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">85%</div>
                      <div className="text-white/90 text-sm sm:text-base">faster acquisition</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">70%</div>
                      <div className="text-white/90 text-sm sm:text-base">deeper family connections</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-white">Enhanced</div>
                      <div className="text-white/90 text-sm sm:text-base">travel experiences</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center order-first md:order-last">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&crop=faces"
                alt="Happy mature couple enjoying conversation"
                className="rounded-2xl shadow-xl max-w-sm w-full h-48 sm:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Real stories from our Spanish learners
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {[
              {
                name: "Koji",
                quote: "I can finally talk to my grandchildren in Spanish!",
                video: "https://spanishvip.com/wp-content/uploads/2025/07/Koji-Testimonial-Video.mp4"
              },
              {
                name: "Suzanne", 
                quote: "My confidence has skyrocketed!",
                video: "https://spanishvip.com/wp-content/uploads/2025/07/Suzanne-Testimonial-Video.mp4"
              },
              {
                name: "Catie",
                quote: "Learning Spanish opened new doors!",
                video: "https://spanishvip.com/wp-content/uploads/2024/02/catie-reel.mp4"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative overflow-hidden shadow-lg rounded-2xl group cursor-pointer" onClick={() => openVideoModal(testimonial.video)}>
                <div className="aspect-video relative">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
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
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-base sm:text-lg text-gray-600">Join 2,147 successful Spanish learners</p>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <CountdownTimer 
            initialTime={15*60}
            className="mb-8 sm:mb-12"
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Your Exclusive SpanishVIP Offer
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="bg-white p-6 sm:p-8 shadow-lg rounded-2xl border-2 border-orange-200">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Group Classes</h3>
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-400 line-through">$99/month</div>
                  <div className="text-3xl sm:text-4xl font-bold text-orange-600">$49.50/month</div>
                  <div className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full inline-block font-semibold text-sm sm:text-base">
                    50% OFF
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 shadow-lg rounded-2xl border-2 border-green-200">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Academy Course</h3>
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-400 line-through">$149</div>
                  <div className="text-3xl sm:text-4xl font-bold text-green-600">FREE</div>
                  <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full inline-block font-semibold text-sm sm:text-base">
                    BONUS GIFT
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6 rounded-2xl">
              <div className="text-lg sm:text-xl font-semibold mb-2">
                Total Value: $248 | Your Price: $49.50 | You Save: $198.50!
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-full shadow-xl w-full sm:w-auto"
            >
              Claim Your Special Offer Now
            </button>
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-r from-green-400 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            We're so confident you'll love learning Spanish with us that we offer a full 30-day money-back guarantee. 
            Start your journey risk-free today!
          </p>
        </div>
      </section>

      {/* Final Testimonials Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
            People love SpanishVIP
          </h2>
          <Carousel opts={{ align: 'start', slidesToScroll: 1 }}>
            <CarouselContent className="-ml-4">
              {[
                { name: 'Dale Givens', quote: 'Classes were structured to meet my needs... the best experience I have had with online language instruction.' },
                { name: 'Matthew Heredia', quote: 'Each class is tailored to my individual needs and abilities. My one-on-one instructor is very passionate.' },
                { name: 'Milton Lindsay', quote: 'Spanish VIP is the best program I\'ve worked with. My instructor stays flexible while providing a structured curriculum.' },
                { name: 'Todd Pereira', quote: 'Duolingo can only take you so far... I\'ve been doing 1-to-1 classes for almost 2 months and still use Duolingo to top up.' },
                { name: 'Sameera Hemmat', quote: 'The one-on-one teaching style tailored to the student makes Spanish VIP\'s approach unique and beneficial.' },
                { name: 'Steve Anderson', quote: 'I\'ve used online programs before, but I wanted something more structured and challenging.' },
                { name: 'Steve Worhlrab', quote: 'I can\'t say enough good things about SpanishVIP and my private teacher.' },
                { name: 'Gabriel Pretto', quote: 'My experience has been great so far. Very professional and easy to communicate with.' },
                { name: 'Alexander Yaroshevich', quote: 'I\'ve been taking group classes for 2 years. It\'s a fun and affordable way of learning.' },
              ].map((review, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/3 basis-full">
                  <div className="bg-white/80 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center h-full">
                    <div className="flex text-yellow-400 mb-2">
                      {"★".repeat(5)}
                    </div>
                    <p className="text-gray-800 mb-2 text-center text-sm sm:text-base">"{review.quote}"</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{review.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeVideoModal}>
          <div className="relative max-w-4xl w-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 z-10"
            >
              ✕
            </button>
            <video
              src={selectedVideo}
              className="w-full h-full rounded-lg"
              controls
              autoPlay
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://spanishvip.com/wp-content/uploads/2025/06/SpanishVIP-Original-Logo.png"
              alt="SpanishVIP Logo"
              className="h-8 w-auto"
              style={{ maxWidth: 120 }}
            />
          </div>
          <p className="text-gray-400">2024 © SpanishVIP.com</p>
        </div>
      </footer>
    </div>
  );
};

export default OfferPage; 
import React from 'react';
import { CheckCircle, Users, BookOpen, Clock, Star, Globe, Heart, Brain, Shield, Smartphone, Award, MessageCircle, Play } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import MobileFeaturesSection from './MobileFeaturesSection';

const OfferPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Branding and Headline */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-gray-800">SpanishVIP</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                See how SpanishVIP will transform your Spanish journey
              </h1>
              <div className="bg-orange-50 rounded-lg p-6 mb-8">
                <div className="flex items-center mb-2">
                  <span className="text-5xl font-bold text-orange-600">87%</span>
                  <span className="text-gray-700 ml-4 text-lg">
                    of learners in our program reported confident conversations within 90 days of starting their Spanish classes.
                  </span>
                </div>
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-colors flex items-center text-xl shadow-lg">
                Claim Your Offer
                <span className="ml-2">→</span>
              </button>
            </div>
            {/* Hero Image */}
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Happy mature woman learning Spanish" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Unified Results Section (2x2 grid of cards) */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Based on your answers, your Spanish learning journey is...
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Card 1: Progress Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Spanish can flourish</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Now</span>
                  <span className="text-gray-600">3 months</span>
                </div>
                <div className="relative">
                  <div className="h-32 bg-gray-100 rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-orange-200 to-orange-100 rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 w-full">
                      <svg viewBox="0 0 300 100" className="w-full h-32">
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
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Basic phrases</span>
                  <span>Simple conversations</span>
                  <span>Confident fluency</span>
                </div>
              </div>
            </div>
            
            {/* Card 2: Confidence Boost */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Confidence / 3 months</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Increased quality of travel experiences</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Deeper family connections</span>
                </div>
                <div className="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block font-semibold">
                  +73.4%
                </div>
                <div className="mt-6">
                  <div className="bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-500 h-4 rounded-full" style={{ width: '73%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 3: Spanish Skill Improvement */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Spanish Skill Improvement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Level</span>
                  <span className="text-gray-600">TODAY</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">PROBLEMATIC</span>
                    <span className="text-sm text-gray-500">IMPROVED SPEAKING & COMPREHENSION</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">IN 3 MONTHS</div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">PROBLEMATIC</span>
                    <span className="text-sm text-gray-500">IMPROVED SPEAKING & COMPREHENSION</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-center">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      With SpanishVIP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 4: Boost of Learning Success */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Boost of Learning Success</h3>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
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
                      <div className="text-4xl font-bold text-gray-800">80%</div>
                      <div className="text-sm text-gray-600">success rate in our study comparing 20 participants</div>
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
      <section className="py-16 px-4 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                80% of our students report more confident Spanish conversations within 90 days
              </h2>
              
              <div className="grid gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">85%</div>
                      <div className="text-white/90">faster acquisition</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">70%</div>
                      <div className="text-white/90">deeper family connections</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">Enhanced</div>
                      <div className="text-white/90">travel experiences</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&crop=faces"
                alt="Happy mature couple enjoying conversation"
                className="rounded-2xl shadow-xl max-w-sm w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Real stories from our Spanish learners
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                name: "Maria, 62",
                quote: "I can finally talk to my grandchildren in Spanish!",
                image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop&crop=face"
              },
              {
                name: "Robert, 58", 
                quote: "My confidence has skyrocketed!",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              },
              {
                name: "Linda, 65",
                quote: "Learning Spanish opened new doors!",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative overflow-hidden shadow-lg rounded-2xl group cursor-pointer">
                <div className="aspect-video relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex text-yellow-400 mb-2">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-gray-700 mb-2">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-600">Join 2,147 successful Spanish learners</p>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <CountdownTimer 
            initialMinutes={15}
          />

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Your Exclusive SpanishVIP Offer
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 shadow-lg rounded-2xl border-2 border-orange-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Group Classes</h3>
                <div className="space-y-2 mb-6">
                  <div className="text-3xl font-bold text-gray-400 line-through">$99/month</div>
                  <div className="text-4xl font-bold text-orange-600">$49.50/month</div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block font-semibold">
                    50% OFF
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 shadow-lg rounded-2xl border-2 border-green-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Academy Course</h3>
                <div className="space-y-2 mb-6">
                  <div className="text-3xl font-bold text-gray-400 line-through">$149</div>
                  <div className="text-4xl font-bold text-green-600">FREE</div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block font-semibold">
                    BONUS GIFT
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl">
              <div className="text-xl font-semibold mb-2">
                Total Value: $248 | Your Price: $49.50 | You Save: $198.50!
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-xl"
            >
              Claim Your Special Offer Now
            </button>
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-400 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            We're so confident you'll love learning Spanish with us that we offer a full 30-day money-back guarantee. 
            Start your journey risk-free today!
          </p>
        </div>
      </section>

      {/* Final Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            People love SpanishVIP
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { initial: "S", name: "Sarah M.", quote: "The best Spanish learning experience I've ever had!" },
              { initial: "M", name: "Michael R.", quote: "Finally, a program that works for people my age." },
              { initial: "J", name: "Jennifer L.", quote: "I'm amazed at how quickly I'm improving!" }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 shadow-lg rounded-2xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-orange-600">{testimonial.initial}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">SpanishVIP</span>
          </div>
          <p className="text-gray-400">2024 © SpanishVIP.com</p>
        </div>
      </footer>
    </div>
  );
};

export default OfferPage; 
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizConfig } from "@/types/quiz";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Brain, 
  Heart, 
  Star,
  Play,
  Shield,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";

interface ThankYouPageProps {
  config: QuizConfig;
  onExternalRedirect?: () => void;
}

const ThankYouPage = ({ config, onExternalRedirect }: ThankYouPageProps) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 px-4 w-full">
        <div className="w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-8 h-8 text-orange-600" />
                <span className="text-2xl font-bold text-gray-900">SpanishVIP</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                See how SpanishVIP will transform your Spanish journey
              </h1>
              
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">87%</div>
                <p className="text-gray-700">of learners reported confident conversations within 90 days</p>
              </div>
              
              <Button 
                onClick={onExternalRedirect}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg inline-flex items-center"
              >
                Claim Your Offer <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=400&fit=crop&crop=faces"
                alt="Professional mature woman learning Spanish"
                className="rounded-2xl shadow-xl max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 px-4 w-full">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Based on your answers, your Spanish learning journey is...
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Your Spanish Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Basic phrases</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-full h-full bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conversations</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/4 h-full bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confident fluency</span>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div className="w-1/2 h-full bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Confidence Boost</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Speak with confidence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Connect with native speakers</span>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">+73.4%</div>
                    <div className="text-sm text-gray-600">Confidence increase</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                      <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Spanish Skill Improvement</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-600 mb-2">85%</div>
                  <p className="text-gray-600">Faster skill acquisition</p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Success Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">80%</div>
                  <p className="text-gray-600">Learning success rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Learning Process Section */}
      <section className="py-16 px-4 bg-gray-50 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Spanish learning is easier than you think
            </h2>
            <p className="text-xl text-gray-600">
              Our proven 3-step method makes learning Spanish simple and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Day 1: Engage</h3>
                <p className="text-gray-600">Interactive conversations</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Day 2: Practice</h3>
                <p className="text-gray-600">Academy platform</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Day 3: Connect</h3>
                <p className="text-gray-600">Real conversations</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Master 1000+ Spanish words effortlessly",
              "Discover Spanish culture and traditions",
              "Learn with AI-powered tools",
              "Build lasting confidence in Spanish"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-400 to-orange-500 w-full">
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
      <section className="py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
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
              <Card key={index} className="relative overflow-hidden shadow-lg rounded-2xl group cursor-pointer">
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
                <CardContent className="p-6">
                  <div className="flex text-yellow-400 mb-2">
                    {"★".repeat(5)}
                  </div>
                  <p className="text-gray-700 mb-2">"{testimonial.quote}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-600">Join 2,147 successful Spanish learners</p>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-16 px-4 bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Countdown Timer */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-red-600" />
              <span className="text-lg font-semibold text-red-600">Limited Time Offer Expires In:</span>
            </div>
            <div className="text-4xl font-bold text-red-600 font-mono">
              {formatTime(timeLeft)}
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Your Exclusive SpanishVIP Offer
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="p-8 shadow-lg rounded-2xl border-2 border-orange-200">
              <CardContent className="p-0 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Group Classes</h3>
                <div className="space-y-2 mb-6">
                  <div className="text-3xl font-bold text-gray-400 line-through">$99/month</div>
                  <div className="text-4xl font-bold text-orange-600">$49.50/month</div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block font-semibold">
                    50% OFF
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 shadow-lg rounded-2xl border-2 border-green-200">
              <CardContent className="p-0 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Academy Course</h3>
                <div className="space-y-2 mb-6">
                  <div className="text-3xl font-bold text-gray-400 line-through">$149</div>
                  <div className="text-4xl font-bold text-green-600">FREE</div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block font-semibold">
                    BONUS GIFT
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl">
              <div className="text-xl font-semibold mb-2">
                Total Value: $248 | Your Price: $49.50 | You Save: $198.50!
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={onExternalRedirect}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-xl"
            >
              Claim Your Special Offer Now
            </Button>
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-400 to-green-600 w-full">
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

      {/* Mobile Learning Experience Section */}
      <section className="py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Learn Spanish anywhere, anytime
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  "Live classes on your mobile device",
                  "Academy course with offline access",
                  "Practice conversations anywhere", 
                  "Track your progress on the go"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <div className="bg-gray-900 p-2 rounded-3xl">
                <div className="w-48 h-96 bg-white rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-600">Live Classes</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 p-2 rounded-3xl">
                <div className="w-48 h-96 bg-white rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Academy Course</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Mobile Optimized", desc: "Perfect for all devices" },
              { title: "Flexible Schedule", desc: "Learn at your own pace" },
              { title: "Offline Access", desc: "Download and study offline" },
              { title: "Secure & Private", desc: "Your data is protected" }
            ].map((feature, index) => (
              <Card key={index} className="p-6 text-center shadow-lg rounded-2xl">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-400 to-orange-500 w-full">
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
              <Card key={index} className="p-6 shadow-lg rounded-2xl">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-orange-600">{testimonial.initial}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="flex text-yellow-400">
                        {"★".repeat(5)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 w-full">
        <div className="w-full text-center">
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

export default ThankYouPage;

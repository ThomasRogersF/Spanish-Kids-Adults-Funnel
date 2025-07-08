import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizConfig } from "@/types/quiz";
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Award,
  Globe
} from "lucide-react";

interface WelcomePageProps {
  config: QuizConfig;
  onStart: () => void;
}

const WelcomePage = ({ config, onStart }: WelcomePageProps) => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Globe className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">SpanishVIP</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your Perfect Spanish Learning Path
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Take our quick 6-question quiz to get a personalized Spanish learning plan designed specifically for adults 50+ who want to learn Spanish confidently and effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Age-Appropriate Classes</h3>
                <p className="text-gray-600">Learn with peers who understand your learning style and pace</p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Flexible Learning</h3>
                <p className="text-gray-600">Study at your own pace with our comprehensive online platform</p>
              </CardContent>
            </Card>

            <Card className="p-8 text-center shadow-lg rounded-2xl">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Proven Results</h3>
                <p className="text-gray-600">Join thousands who have successfully learned Spanish with us</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Preview */}
      <section className="py-16 px-4 bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-lg rounded-2xl">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Get Your Personalized Learning Plan
                </h2>
                <p className="text-lg text-gray-600">
                  Our quick quiz takes just 2-3 minutes and covers:
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  "Your motivation for learning Spanish",
                  "Your current experience level",
                  "Your available study time",
                  "Your learning goals and preferences",
                  "Your preferred learning style",
                  "Your biggest concerns about learning"
                ].map((question, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-orange-600">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{question}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={onStart}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-xl"
                >
                  Start Your Quiz Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Takes only 2-3 minutes • Get instant results • No commitment required
                </p>
              </div>
            </CardContent>
          </Card>
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

export default WelcomePage; 
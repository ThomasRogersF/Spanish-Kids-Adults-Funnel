import { QuizConfig } from "@/types/quiz";

export const spanishQuiz: QuizConfig = {
  id: "spanish-learning-quiz",
  title: "Spanish Learning Quiz",
  description: "Discover your perfect Spanish learning path",
  logoUrl: "https://spanishvip.com/wp-content/uploads/2025/06/SpanishVIP-Original-Logo.png",
  introImageUrl: "https://spanishvip.com/wp-content/uploads/2025/04/private-tutoring.jpg",
  introText: "Welcome to your personalized Spanish learning journey! This quick quiz will help us create the perfect learning experience tailored just for you.",
  estimatedTime: "2-3 minutes",
  primaryColor: "#FF5913",
  secondaryColor: "#F7F4EE",
  webhookUrl: "https://hook.us1.make.com/your-webhook-url",
  questions: [
    {
      id: "q1",
      type: "mcq",
      title: "What's your main motivation for learning Spanish?",
      subtitle: "This helps us create the perfect learning experience for you.",
      required: true,
      options: [
        {
          id: "a1",
          text: "Travel with confidence",
          value: "travel"
        },
        {
          id: "a2", 
          text: "Connect with family and friends",
          value: "family"
        },
        {
          id: "a3",
          text: "Keep my mind active", 
          value: "mental_health"
        },
        {
          id: "a4",
          text: "Personal enrichment",
          value: "personal_growth"
        }
      ]
    },
    {
      id: "q2",
      type: "mcq", 
      title: "What's your current Spanish level?",
      subtitle: "Don't worry - we welcome all levels!",
      required: true,
      options: [
        {
          id: "a1",
          text: "Complete beginner",
          value: "complete_beginner"
        },
        {
          id: "a2",
          text: "Very rusty", 
          value: "rusty"
        },
        {
          id: "a3",
          text: "Know some basics",
          value: "basic"
        },
        {
          id: "a4",
          text: "Can have simple conversations",
          value: "conversational"
        }
      ]
    },
    {
      id: "q3",
      type: "mcq",
      title: "What's your preferred learning style?",
      subtitle: "We want to match you with the approach that works best.",
      required: true,
      options: [
        {
          id: "a1",
          text: "Group classes",
          value: "group_classes"
        },
        {
          id: "a2",
          text: "One-on-one instruction",
          value: "private_lessons"
        },
        {
          id: "a3", 
          text: "Self-paced online lessons",
          value: "self_paced"
        },
        {
          id: "a4",
          text: "Combination approach",
          value: "combination"
        }
      ]
    },
    {
      id: "q4",
      type: "mcq",
      title: "How much time can you dedicate each week?",
      subtitle: "This helps us recommend the right program intensity.",
      required: true,
      options: [
        {
          id: "a1",
          text: "1-2 hours (casual pace)",
          value: "casual"
        },
        {
          id: "a2",
          text: "3-4 hours (steady progress)", 
          value: "steady"
        },
        {
          id: "a3",
          text: "5+ hours (accelerated)",
          value: "accelerated"
        },
        {
          id: "a4",
          text: "I'm flexible",
          value: "flexible"
        }
      ]
    }
  ],
  resultTemplates: [
    {
      id: "beginner_traveler",
      title: "Perfect Spanish Learning Package for You!",
      description: "Based on your responses, we've created a personalized Spanish learning experience that focuses on travel confidence and practical conversation skills. You'll love our supportive community of fellow learners!",
      conditions: [
        { questionId: "q1", value: "travel" },
        { questionId: "q2", value: "complete_beginner" }
      ]
    },
    {
      id: "family_connection",
      title: "Connect with Your Loved Ones in Spanish!", 
      description: "Your desire to connect with Spanish-speaking family and friends is beautiful! Our program will help you build the conversational skills you need to strengthen those precious relationships.",
      conditions: [
        { questionId: "q1", value: "family" }
      ]
    },
    {
      id: "brain_health",
      title: "Keep Your Mind Sharp with Spanish!",
      description: "Learning Spanish is one of the best gifts you can give your brain! Our structured approach will challenge you in the most enjoyable way while building practical language skills.",
      conditions: [
        { questionId: "q1", value: "mental_health" }
      ]
    },
    {
      id: "personal_growth",
      title: "Your Lifelong Learning Journey Starts Here!",
      description: "We admire your commitment to personal growth! Our Spanish program is designed for adult learners who want to expand their horizons and embrace new challenges.",
      conditions: [
        { questionId: "q1", value: "personal_growth" }
      ]
    }
  ],
  incentiveEnabled: true,
  incentiveTitle: "50% OFF Your First Month + FREE Beginner Spanish Academy Course",
  incentiveUrl: "https://spanishvip.com/special-offer",
  externalRedirectUrl: "https://spanishvip.com"
};

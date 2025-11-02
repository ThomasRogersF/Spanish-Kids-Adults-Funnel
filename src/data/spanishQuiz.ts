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
  webhookUrl: "https://hook.us2.make.com/x9laeetkiiumljb0qi3yo2c7rx3oxafr",
  questions: [
    {
      id: "q1",
      type: "mcq",
      title: "What's the main outcome you want in the next 60–90 days?",
      required: true,
      options: [
        {
          id: "a1",
          text: "Travel basics & confidence",
          value: "travel_basics"
        },
        {
          id: "a2",
          text: "Keep a steady habit with peers",
          value: "steady_habit"
        },
        {
          id: "a3",
          text: "Rapid, personalized progress for work/family",
          value: "rapid_progress"
        },
        {
          id: "a4",
          text: "I'm not sure—want a simple starting plan",
          value: "simple_plan"
        }
      ]
    },
    {
      id: "q2",
      type: "mcq",
      title: "Where would you place yourself today?",
      required: true,
      options: [
        {
          id: "a1",
          text: "Starting from zero",
          value: "starting_zero"
        },
        {
          id: "a2",
          text: "Beginner/Elementary",
          value: "beginner_elementary"
        },
        {
          id: "a3",
          text: "Intermediate or higher",
          value: "intermediate_plus"
        }
      ]
    },
    {
      id: "q3",
      type: "mcq",
      title: "How comfortable are you speaking out loud in front of others?",
      required: true,
      options: [
        {
          id: "a1",
          text: "Love it—group energy helps me",
          value: "love_group"
        },
        {
          id: "a2",
          text: "Okay with it—depends on the day",
          value: "depends_day"
        },
        {
          id: "a3",
          text: "Prefer private practice first",
          value: "prefer_private"
        }
      ]
    },
    {
      id: "q4",
      type: "mcq",
      title: "Which sounds more like your week?",
      required: true,
      options: [
        {
          id: "a1",
          text: "I can attend at set times most weekdays",
          value: "set_times"
        },
        {
          id: "a2",
          text: "My schedule changes weekly; I need flexible 1:1 slots",
          value: "changing_schedule"
        },
        {
          id: "a3",
          text: "Either could work",
          value: "either_work"
        }
      ]
    },
    {
      id: "q5",
      type: "mcq",
      title: "What kind of feedback do you want?",
      required: true,
      options: [
        {
          id: "a1",
          text: "Targeted corrections, goal-based drills",
          value: "targeted_corrections"
        },
        {
          id: "a2",
          text: "Lots of speaking turns + teacher guidance",
          value: "speaking_turns"
        },
        {
          id: "a3",
          text: "Light feedback—keep me consistent",
          value: "light_feedback"
        }
      ]
    },
    {
      id: "q6",
      type: "mcq",
      title: "Pick one—what matters more right now?",
      required: true,
      options: [
        {
          id: "a1",
          text: "Best value per month",
          value: "best_value"
        },
        {
          id: "a2",
          text: "Faster progress, fully personalized",
          value: "faster_progress"
        }
      ]
    }
  ],
  resultTemplates: [
    {
      id: "group_classes",
      title: "Group Classes - Perfect for You!",
      description: "Based on your responses, Group Classes are your ideal match. You'll enjoy unlimited sessions Monday-Friday at your CEFR level, learning with a global peer group led by native teachers. Perfect for steady progress and great value!",
      conditions: []
    },
    {
      id: "private_tutoring",
      title: "Private Tutoring - Your Best Path Forward!",
      description: "Based on your responses, Private Tutoring is your ideal match. You'll get a dedicated native teacher who creates a custom plan around your goals, with flexible scheduling and personalized feedback for faster progress.",
      conditions: []
    }
  ],
  incentiveEnabled: true,
  incentiveTitle: "50% OFF Your First Month + FREE Beginner Spanish Academy Course",
  incentiveUrl: "https://spanishvip.com/special-offer",
  externalRedirectUrl: "https://spanishvip.com"
};

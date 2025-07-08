import { QuizQuestion } from "@/hooks/useQuiz";

export const questions: QuizQuestion[] = [
  {
    id: 0,
    question: "What's your main motivation for learning Spanish?",
    options: [
      "Travel with confidence",
      "Connect with family and friends", 
      "Keep my mind active",
      "Personal enrichment",
      "Career advancement"
    ],
    type: 'single'
  },
  {
    id: 1,
    question: "What's your current Spanish level?",
    options: [
      "Complete beginner",
      "Very rusty",
      "Know some basics",
      "Can have simple conversations",
      "Intermediate level"
    ],
    type: 'single'
  },
  {
    id: 2,
    question: "How much time can you dedicate each week?",
    options: [
      "1-2 hours (casual pace)",
      "3-4 hours (steady progress)",
      "5+ hours (accelerated)",
      "I'm flexible",
      "Less than 1 hour"
    ],
    type: 'single'
  },
  {
    id: 3,
    question: "What are your learning goals? (Select all that apply)",
    options: [
      "Travel confidently",
      "Watch Spanish media",
      "Read Spanish books",
      "Connect with community",
      "Improve cognitive health",
      "Professional development"
    ],
    type: 'multiple'
  },
  {
    id: 4,
    question: "What's your preferred learning style?",
    options: [
      "Group classes",
      "Self-paced online lessons",
      "One-on-one instruction",
      "Combination approach",
      "Conversation practice"
    ],
    type: 'single'
  },
  {
    id: 5,
    question: "What's your biggest concern about learning Spanish?",
    options: [
      "I'm too old to learn",
      "I have a poor memory",
      "I don't have enough time",
      "I'm afraid of making mistakes",
      "I don't know where to start"
    ],
    type: 'single'
  }
]; 
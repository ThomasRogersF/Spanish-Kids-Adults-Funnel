import { QuizAnswer } from '@/types/quiz';

export interface RecommendationScores {
  groupScore: number;
  privateScore: number;
}

export interface RecommendationState {
  groupScore: number;
  privateScore: number;
  recommendedTrack: 'group' | 'private' | 'kids';
  isKidsOverride: boolean;
}

export interface RecommendationContent {
  title: string;
  subtitle: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  benefits: string[];
}

export const recommendationContent: Record<'group' | 'private' | 'kids', RecommendationContent> = {
  group: {
    title: "Group Classes",
    subtitle: "Best fit: Group classes for steady speaking practice",
    features: [
      {
        icon: "👥",
        title: "Live Conversation Practice",
        description: "Practice speaking with peers in structured, guided sessions"
      },
      {
        icon: "📅",
        title: "Flexible Scheduling",
        description: "Choose from multiple time slots that fit your schedule"
      },
      {
        icon: "📚",
        title: "Structured Curriculum",
        description: "Follow a proven learning path with clear milestones"
      }
    ],
    benefits: [
      "Learn from others in a supportive environment",
      "Cost-effective option with personalized attention",
      "Regular practice sessions build confidence quickly"
    ]
  },
  private: {
    title: "Private Tutoring",
    subtitle: "Best fit: 1-on-1 tutoring for fast, personalized progress",
    features: [
      {
        icon: "👨‍🏫",
        title: "Personalized Attention",
        description: "Get customized feedback and focus on your specific needs"
      },
      {
        icon: "⚡",
        title: "Faster Progress",
        description: "Move at your own pace with tailored curriculum"
      },
      {
        icon: "🕐",
        title: "Flexible Scheduling",
        description: "Schedule sessions that work perfectly with your routine"
      }
    ],
    benefits: [
      "Individualized learning plan for your specific goals",
      "Direct feedback accelerates improvement",
      "Maximum flexibility for busy schedules"
    ]
  },
  kids: {
    title: "Spanish for Kids",
    subtitle: "Best fit: Spanish for Kids (4-17)",
    features: [
      {
        icon: "🎮",
        title: "Fun Learning Games",
        description: "Engaging activities designed specifically for young learners"
      },
      {
        icon: "🎨",
        title: "Visual Learning",
        description: "Colorful materials and visual aids for better retention"
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Family Involvement",
        description: "Parents can track progress and join in the learning"
      }
    ],
    benefits: [
      "Age-appropriate content for better engagement",
      "Kid-friendly pacing that builds confidence",
      "Family learning activities for shared progress"
    ]
  }
};

export const calculateScores = (answers: QuizAnswer[]): RecommendationScores => {
  let groupScore = 0;
  let privateScore = 0;
  
  answers.forEach(answer => {
    switch (answer.questionId) {
      case 'q1': // Motivation
        if (answer.value === 'travel') {
          groupScore += 2; privateScore += 1;
        } else if (answer.value === 'family') {
          groupScore += 2; privateScore += 2;
        } else if (answer.value === 'mental_health') {
          groupScore += 1;
        } else if (answer.value === 'personal_growth') {
          groupScore += 1; privateScore += 1;
        }
        break;
        
      case 'q2': // Level
        if (answer.value === 'complete_beginner') {
          groupScore += 1; privateScore += 2;
        } else if (answer.value === 'rusty') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'basic') {
          groupScore += 2;
        } else if (answer.value === 'conversational') {
          groupScore += 2;
        }
        break;
        
      case 'q3': // Learning Style
        if (answer.value === 'group_classes') {
          groupScore += 3;
        } else if (answer.value === 'private_lessons') {
          privateScore += 3;
        } else if (answer.value === 'self_paced') {
          groupScore += 1;
        } else if (answer.value === 'combination') {
          groupScore += 2; privateScore += 2;
        }
        break;
        
      case 'q4': // Time Commitment
        if (answer.value === 'casual') {
          groupScore += 2;
        } else if (answer.value === 'steady') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'accelerated') {
          privateScore += 2;
        } else if (answer.value === 'flexible') {
          groupScore += 1; privateScore += 1;
        }
        break;
    }
  });
  
  return { groupScore, privateScore };
};

export const determineRecommendation = (
  groupScore: number,
  privateScore: number,
  isKidsOverride: boolean
): Omit<RecommendationState, 'isKidsOverride'> => {
  if (isKidsOverride) {
    return {
      recommendedTrack: 'kids' as const,
      groupScore,
      privateScore
    };
  }
  
  if (groupScore > privateScore) {
    return {
      recommendedTrack: 'group' as const,
      groupScore,
      privateScore
    };
  } else if (privateScore > groupScore) {
    return {
      recommendedTrack: 'private' as const,
      groupScore,
      privateScore
    };
  } else {
    // Tie-breaking: favor group classes for steady practice
    return {
      recommendedTrack: 'group' as const,
      groupScore,
      privateScore
    };
  }
};

export const generateRecommendationReasons = (
  answers: QuizAnswer[], 
  recommendedTrack: 'group' | 'private'
): string[] => {
  const reasons: string[] = [];
  
  // Learning style reasons
  const q3Answer = answers.find(a => a.questionId === 'q3');
  if (q3Answer) {
    if (recommendedTrack === 'group') {
      reasons.push("You chose Group classes → you'll get live conversation with peers");
    } else {
      reasons.push("You chose 1-on-1 tutoring → you'll get personalized attention");
    }
  }
  
  // Level reasons
  const q2Answer = answers.find(a => a.questionId === 'q2');
  if (q2Answer) {
    if (q2Answer.value === 'complete_beginner' || q2Answer.value === 'rusty') {
      if (recommendedTrack === 'group') {
        reasons.push("Beginner level → Group classes provide great foundation");
      } else {
        reasons.push("Beginner level → 1-on-1 helps you start strong");
      }
    } else if (q2Answer.value === 'basic' || q2Answer.value === 'conversational') {
      if (recommendedTrack === 'group') {
        reasons.push("Some experience → Group classes offer steady progression");
      } else {
        reasons.push("Some experience → Private tutoring accelerates progress");
      }
    }
  }
  
  // Time commitment reasons
  const q4Answer = answers.find(a => a.questionId === 'q4');
  if (q4Answer) {
    if (q4Answer.value === 'casual') {
      reasons.push("1-2 hrs/week → Group classes keep things flexible");
    } else if (q4Answer.value === 'steady') {
      if (recommendedTrack === 'group') {
        reasons.push("3-4 hrs/week → Group classes provide consistent practice");
      } else {
        reasons.push("3-4 hrs/week → Private tutoring fits your schedule");
      }
    } else if (q4Answer.value === 'accelerated') {
      reasons.push("5+ hrs/week → Private tutoring maximizes your investment");
    } else if (q4Answer.value === 'flexible') {
      reasons.push("Flexible schedule → Both options adapt to your routine");
    }
  }
  
  return reasons;
};
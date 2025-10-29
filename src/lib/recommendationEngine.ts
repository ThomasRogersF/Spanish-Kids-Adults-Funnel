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
    subtitle: "Best fit: Unlimited sessions for one monthly price",
    features: [
      {
        icon: "👥",
        title: "Unlimited Sessions",
        description: "Join as many classes as you want Monday-Friday at your CEFR level"
      },
      {
        icon: "🌍",
        title: "Global Peer Group",
        description: "Learn with students from around the world, led by native teachers"
      },
      {
        icon: "💰",
        title: "Great Value",
        description: "Fixed monthly price with unlimited access to all sessions"
      }
    ],
    benefits: [
      "Perfect for adults 18+ who want steady practice",
      "Build momentum with regular conversation practice",
      "Learn from others in a supportive community environment"
    ]
  },
  private: {
    title: "Private Tutoring",
    subtitle: "Best fit: Dedicated teacher with custom plan",
    features: [
      {
        icon: "👨‍🏫",
        title: "Dedicated Native Teacher",
        description: "Your own teacher plans every session around your specific goals"
      },
      {
        icon: "🎯",
        title: "Custom Learning Plan",
        description: "Personalized curriculum designed just for you"
      },
      {
        icon: "🆓",
        title: "Free Trial Class",
        description: "Try a 1:1 class before you decide"
      }
    ],
    benefits: [
      "Faster progress with personalized attention",
      "Flexible scheduling that adapts to your routine",
      "Direct feedback and targeted corrections"
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
      case 'q1': // Primary Goal
        if (answer.value === 'travel_basics') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'steady_habit') {
          groupScore += 2;
        } else if (answer.value === 'rapid_progress') {
          privateScore += 2;
        } else if (answer.value === 'simple_plan') {
          groupScore += 1;
        }
        break;
        
      case 'q2': // Current Level
        if (answer.value === 'starting_zero') {
          privateScore += 1;
        } else if (answer.value === 'beginner_elementary') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'intermediate_plus') {
          groupScore += 1;
        }
        break;
        
      case 'q3': // Comfort Speaking
        if (answer.value === 'love_group') {
          groupScore += 2;
        } else if (answer.value === 'depends_day') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'prefer_private') {
          privateScore += 2;
        }
        break;
        
      case 'q4': // Schedule Reality
        if (answer.value === 'set_times') {
          groupScore += 2;
        } else if (answer.value === 'changing_schedule') {
          privateScore += 2;
        } else if (answer.value === 'either_work') {
          groupScore += 1; privateScore += 1;
        }
        break;
        
      case 'q5': // Feedback Style
        if (answer.value === 'targeted_corrections') {
          privateScore += 2;
        } else if (answer.value === 'speaking_turns') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'light_feedback') {
          groupScore += 2;
        }
        break;
        
      case 'q6': // Budget vs Speed
        if (answer.value === 'best_value') {
          groupScore += 2;
        } else if (answer.value === 'faster_progress') {
          privateScore += 2;
        }
        break;
    }
  });
  
  return { groupScore, privateScore };
};

export const determineRecommendation = (
  groupScore: number,
  privateScore: number,
  isKidsOverride: boolean,
  answers?: QuizAnswer[]
): Omit<RecommendationState, 'isKidsOverride'> => {
  if (isKidsOverride) {
    return {
      recommendedTrack: 'kids' as const,
      groupScore,
      privateScore
    };
  }
  
  const scoreDifference = groupScore - privateScore;
  
  // Primary decision logic
  if (scoreDifference >= 2) {
    return {
      recommendedTrack: 'group' as const,
      groupScore,
      privateScore
    };
  } else if (scoreDifference <= -2) {
    return {
      recommendedTrack: 'private' as const,
      groupScore,
      privateScore
    };
  } else {
    // Tie / ±1 case - apply tiebreakers
    return applyTiebreakers(groupScore, privateScore, answers || []);
  }
};

// Helper function for tiebreaker logic
const applyTiebreakers = (
  groupScore: number,
  privateScore: number,
  answers: QuizAnswer[]
): Omit<RecommendationState, 'isKidsOverride'> => {
  // Tiebreaker 1: Q4 Schedule
  const q4Answer = answers.find(a => a.questionId === 'q4');
  if (q4Answer) {
    if (q4Answer.value === 'set_times') {
      return {
        recommendedTrack: 'group' as const,
        groupScore,
        privateScore
      };
    } else if (q4Answer.value === 'changing_schedule') {
      return {
        recommendedTrack: 'private' as const,
        groupScore,
        privateScore
      };
    }
  }
  
  // Tiebreaker 2: Q3 Comfort Speaking
  const q3Answer = answers.find(a => a.questionId === 'q3');
  if (q3Answer) {
    if (q3Answer.value === 'love_group') {
      return {
        recommendedTrack: 'group' as const,
        groupScore,
        privateScore
      };
    } else if (q3Answer.value === 'prefer_private') {
      return {
        recommendedTrack: 'private' as const,
        groupScore,
        privateScore
      };
    }
  }
  
  // Tiebreaker 3: Q6 Budget vs Speed
  const q6Answer = answers.find(a => a.questionId === 'q6');
  if (q6Answer) {
    if (q6Answer.value === 'best_value') {
      return {
        recommendedTrack: 'group' as const,
        groupScore,
        privateScore
      };
    } else if (q6Answer.value === 'faster_progress') {
      return {
        recommendedTrack: 'private' as const,
        groupScore,
        privateScore
      };
    }
  }
  
  // Default tiebreaker - favor group
  return {
    recommendedTrack: 'group' as const,
    groupScore,
    privateScore
  };
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
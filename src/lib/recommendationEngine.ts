import { QuizAnswer } from '@/types/quiz';

export interface RecommendationScores {
  groupScore: number;
  privateScore: number;
}

export interface RecommendationState {
  groupScore: number;
  privateScore: number;
  recommendedTrack: 'group' | 'private' | 'bundled';
  isKidsOverride: boolean;
}

export interface PricingData {
  listPrice: number;
  listPriceFormatted: string;
  salePrice: number;
  salePriceFormatted: string;
  discountPercent: number;
  saleBadgeText: string;
  saleNote: string;
  finePrint: string;
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
  pricing?: PricingData;
  pricingQuarterly?: PricingData;
  pricingSixMonths?: PricingData;
}

export const recommendationContent: Record<'group' | 'private' | 'bundled', RecommendationContent> = {
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
    ],
    pricing: {
      listPrice: 149,
      listPriceFormatted: "$149/mo",
      salePrice: 74.5,
      salePriceFormatted: "$74.50",
      discountPercent: 50,
      saleBadgeText: "Incredible deal",
      saleNote: "Limited-time offer",
      finePrint: "First month $74.50, then $149/mo. Cancel anytime."
    },
    pricingQuarterly: {
      listPrice: 349,
      listPriceFormatted: "$349",
      salePrice: 174.5,
      salePriceFormatted: "$174.50",
      discountPercent: 50,
      saleBadgeText: "Incredible deal",
      saleNote: "Limited-time offer",
      finePrint: "First 3 months $174.50, then $149/mo. Cancel anytime."
    },
    pricingSixMonths: {
      listPrice: 599,
      listPriceFormatted: "$599",
      salePrice: 299.5,
      salePriceFormatted: "$299.50",
      discountPercent: 50,
      saleBadgeText: "Incredible deal",
      saleNote: "Limited-time offer",
      finePrint: "First 6 months $299.50, then $599/mo. Cancel anytime."
    }
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
      }
    ],
    benefits: [
      "Faster progress with personalized attention",
      "Flexible scheduling that adapts to your routine",
      "Direct feedback and targeted corrections"
    ],
    pricing: {
      listPrice: 199,
      listPriceFormatted: "$199/mo",
      salePrice: 99.5,
      salePriceFormatted: "$99.50",
      discountPercent: 50,
      saleBadgeText: "Incredible deal",
      saleNote: "Limited-time offer",
      finePrint: "First month $99.50, then $199/mo. Cancel anytime."
    }
  },
  bundled: {
    title: "Bundled Option",
    subtitle: "Best fit: 1 private class + unlimited group classes",
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
        icon: "👥",
        title: "Unlimited Group Classes",
        description: "Join as many classes as you want Monday-Friday at your CEFR level"
      }
    ],
    benefits: [
      "Perfect balance of personalized attention and group practice",
      "Get the best of both worlds with dedicated support and community learning"
    ],
    pricing: {
      listPrice: 215.4,
      listPriceFormatted: "$215.40/mo",
      salePrice: 114.99,
      salePriceFormatted: "$114.99",
      discountPercent: 47,
      saleBadgeText: "Incredible deal",
      saleNote: "Limited-time offer",
      finePrint: "First month $114.99, then ~$215.40/mo. Cancel anytime."
    },
    pricingQuarterly: {
      listPrice: 515.32,
      listPriceFormatted: "$515.32",
      salePrice: 257.66,
      salePriceFormatted: "$257.66",
      discountPercent: 50,
      saleBadgeText: "Incredible deal",
      saleNote: "Limited-time offer",
      finePrint: "First 3 months $257.66, then ~$215.40/mo. Cancel anytime."
    }
  }
};

export const calculateScores = (answers: QuizAnswer[]): RecommendationScores => {
  let groupScore = 0;
  let privateScore = 0;

  answers.forEach(answer => {
    switch (answer.questionId) {
      // Q1 — Main reason
      case 'q1':
        if (answer.value === 'reason_travel') {
          groupScore += 2; privateScore += 1;
        } else if (answer.value === 'reason_work') {
          privateScore += 2;
        } else if (answer.value === 'reason_family') {
          privateScore += 1;
        } else if (answer.value === 'reason_study') {
          privateScore += 2;
        } else if (answer.value === 'reason_fun') {
          groupScore += 2;
        }
        break;

      // Q2 — Current level
      case 'q2':
        if (answer.value === 'level_beginner') {
          privateScore += 1;
        } else if (answer.value === 'level_upper_beginner') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'level_intermediate') {
          groupScore += 1;
        } else if (answer.value === 'level_advanced') {
          groupScore += 1;
        }
        break;

      // Q3 — Experience preference
      case 'q3':
        if (answer.value === 'experience_private') {
          privateScore += 2;
        } else if (answer.value === 'experience_group') {
          groupScore += 2;
        } else if (answer.value === 'experience_mix') {
          groupScore += 1; privateScore += 1;
        }
        break;

      // Q4 — Time per week
      case 'q4':
        if (answer.value === 'time_1_2') {
          groupScore += 1;
        } else if (answer.value === 'time_3_4') {
          groupScore += 1; privateScore += 1;
        } else if (answer.value === 'time_5_6') {
          privateScore += 1;
        } else if (answer.value === 'time_7_plus') {
          privateScore += 2;
        }
        break;

      // Q5 — Schedule (no scoring, display only)
      case 'q5':
        break;

      // Q6 — Frequency (no scoring per spec)
      case 'q6':
        break;

      // Q7 — Focus area
      case 'q7':
        if (answer.value === 'focus_speaking') {
          groupScore += 1;
        } else if (answer.value === 'focus_grammar') {
          privateScore += 1;
        } else if (answer.value === 'focus_listening') {
          groupScore += 1;
        } else if (answer.value === 'focus_vocabulary') {
          groupScore += 1;
        } else if (answer.value === 'focus_business') {
          privateScore += 2;
        }
        break;

      // Q8 — Success metric
      case 'q8':
        if (answer.value === 'success_basic_conversations') {
          groupScore += 1;
        } else if (answer.value === 'success_understanding') {
          privateScore += 1;
        } else if (answer.value === 'success_grammar_progress') {
          privateScore += 1;
        } else if (answer.value === 'success_consistency') {
          groupScore += 1;
        }
        break;

      // Q9 — Obstacles
      case 'q9':
        if (answer.value === 'obstacle_busy_schedule') {
          privateScore += 1;
        } else if (answer.value === 'obstacle_motivation') {
          groupScore += 1;
        } else if (answer.value === 'obstacle_unclear_study') {
          privateScore += 1;
        } else if (answer.value === 'obstacle_nervous_speaking') {
          privateScore += 1;
        } else if (answer.value === 'obstacle_find_program') {
          // no direct scoring
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
  // Kids override removed per spec — ignore isKidsOverride

  const scoreDifference = groupScore - privateScore;

  // Strong signal: pure track when difference ≥ 2
  if (scoreDifference >= 2) {
    return { recommendedTrack: 'group', groupScore, privateScore };
  }
  if (scoreDifference <= -2) {
    return { recommendedTrack: 'private', groupScore, privateScore };
  }

  // Bundled default when Q3=mix and Q4≥3–4 hours
  const q3 = answers?.find(a => a.questionId === 'q3');
  const q4 = answers?.find(a => a.questionId === 'q4');
  const isMix = q3?.value === 'experience_mix';
  const hasTimeForMix =
    q4?.value === 'time_3_4' ||
    q4?.value === 'time_5_6' ||
    q4?.value === 'time_7_plus';

  if (isMix && hasTimeForMix) {
    return { recommendedTrack: 'bundled', groupScore, privateScore };
  }

  // Tie / ±1 case - apply tiebreakers
  return applyTiebreakers(groupScore, privateScore, answers || []);
};

// Helper function for tiebreaker logic (no kids, include bundled when eligible)
const applyTiebreakers = (
  groupScore: number,
  privateScore: number,
  answers: QuizAnswer[]
): Omit<RecommendationState, 'isKidsOverride'> => {
  const q3 = answers.find(a => a.questionId === 'q3');
  const q4 = answers.find(a => a.questionId === 'q4');

  const isMix = q3?.value === 'experience_mix';
  const hasTimeForMix =
    q4?.value === 'time_3_4' ||
    q4?.value === 'time_5_6' ||
    q4?.value === 'time_7_plus';

  // Prefer bundled when eligible
  if (isMix && hasTimeForMix) {
    return { recommendedTrack: 'bundled', groupScore, privateScore };
  }

  // Otherwise prefer experience choice
  if (q3?.value === 'experience_group') {
    return { recommendedTrack: 'group', groupScore, privateScore };
  }
  if (q3?.value === 'experience_private') {
    return { recommendedTrack: 'private', groupScore, privateScore };
  }

  // Then prefer time intensity
  if (q4?.value === 'time_7_plus' || q4?.value === 'time_5_6') {
    return { recommendedTrack: 'private', groupScore, privateScore };
  }
  if (q4?.value === 'time_1_2') {
    return { recommendedTrack: 'group', groupScore, privateScore };
  }

  // Default tiebreaker - favor group
  return { recommendedTrack: 'group', groupScore, privateScore };
};

export const generateRecommendationReasons = (
  answers: QuizAnswer[],
  recommendedTrack: 'group' | 'private' | 'bundled'
): string[] => {
  const reasons: string[] = [];

  // Q3 — experience preference
  const q3 = answers.find(a => a.questionId === 'q3');
  if (q3) {
    if (recommendedTrack === 'group' && q3.value === 'experience_group') {
      reasons.push("You prefer friendly group classes → live practice with peers");
    }
    if (recommendedTrack === 'private' && q3.value === 'experience_private') {
      reasons.push("You prefer 1-on-1 tutoring → personalized attention from a dedicated teacher");
    }
    if (recommendedTrack === 'bundled' && q3.value === 'experience_mix') {
      reasons.push("You selected a mix of formats → bundled plan gives you both 1-on-1 and group sessions");
    }
  }

  // Q1 — main reason
  const q1 = answers.find(a => a.questionId === 'q1');
  if (q1) {
    if (recommendedTrack === 'group' && (q1.value === 'reason_travel' || q1.value === 'reason_fun')) {
      reasons.push("Your goal emphasizes practical, enjoyable practice → group cadence fits well");
    }
    if (recommendedTrack === 'private' && (q1.value === 'reason_work' || q1.value === 'reason_study')) {
      reasons.push("Professional or academic goals → structured 1-on-1 accelerates progress");
    }
  }

  // Q4 — time commitment
  const q4 = answers.find(a => a.questionId === 'q4');
  if (q4) {
    if (recommendedTrack === 'bundled' && (q4.value === 'time_3_4' || q4.value === 'time_5_6' || q4.value === 'time_7_plus')) {
      reasons.push("You have enough weekly time → combining formats maximizes results");
    } else if (recommendedTrack === 'group' && q4.value === 'time_1_2') {
      reasons.push("Limited weekly time → group classes provide consistent, flexible practice");
    } else if (recommendedTrack === 'private' && (q4.value === 'time_5_6' || q4.value === 'time_7_plus')) {
      reasons.push("Higher time investment → 1-on-1 maximizes each session toward your goals");
    }
  }

  // Q7 — focus area
  const q7 = answers.find(a => a.questionId === 'q7');
  if (q7) {
    if (recommendedTrack === 'group' && (q7.value === 'focus_speaking' || q7.value === 'focus_listening' || q7.value === 'focus_vocabulary')) {
      reasons.push("Conversation, listening, or everyday vocabulary → group practice builds confidence");
    }
    if (recommendedTrack === 'private' && (q7.value === 'focus_grammar' || q7.value === 'focus_business')) {
      reasons.push("Grammar structure or business Spanish → targeted 1-on-1 feedback is most effective");
    }
  }

  // Q8 — success metric
  const q8 = answers.find(a => a.questionId === 'q8');
  if (q8) {
    if (recommendedTrack === 'group' && (q8.value === 'success_basic_conversations' || q8.value === 'success_consistency')) {
      reasons.push("You value consistent practice and basic conversations → group cadence supports this");
    }
    if (recommendedTrack === 'private' && (q8.value === 'success_understanding' || q8.value === 'success_grammar_progress')) {
      reasons.push("You want deeper understanding or grammar progress → 1-on-1 focuses each session");
    }
  }

  // Q9 — obstacles
  const q9 = answers.find(a => a.questionId === 'q9');
  if (q9) {
    if (recommendedTrack === 'group' && q9.value === 'obstacle_motivation') {
      reasons.push("Motivation is tough → group rhythm and peers help you stay consistent");
    }
    if (recommendedTrack === 'private' && (q9.value === 'obstacle_busy_schedule' || q9.value === 'obstacle_unclear_study' || q9.value === 'obstacle_nervous_speaking')) {
      reasons.push("Private lessons adapt to your schedule and provide clear next steps with supportive coaching");
    }
  }

  return reasons;
};
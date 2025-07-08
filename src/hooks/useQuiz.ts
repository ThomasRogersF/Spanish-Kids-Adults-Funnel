import { useState, useEffect } from "react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  type: 'single' | 'multiple';
}

export interface QuizAnswer {
  questionId: number;
  answer: string | string[];
}

export interface UserProfile {
  motivation: string;
  experience: string;
  schedule: string;
  goals: string[];
  learningStyle: string;
  concerns: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: QuizAnswer[];
  isComplete: boolean;
  userProfile: UserProfile | null;
}

export const useQuiz = (questions: QuizQuestion[]) => {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false,
    userProfile: null
  });

  const answerQuestion = (answer: string | string[]) => {
    const newAnswers = [...state.answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === state.currentQuestion);
    
    if (existingIndex > -1) {
      newAnswers[existingIndex] = { questionId: state.currentQuestion, answer };
    } else {
      newAnswers.push({ questionId: state.currentQuestion, answer });
    }

    setState(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const nextQuestion = () => {
    if (state.currentQuestion < questions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      setState(prev => ({
        ...prev,
        isComplete: true,
        userProfile: generateUserProfile(prev.answers, questions)
      }));
    }
  };

  const previousQuestion = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    }
  };

  const canProceed = () => {
    const currentAnswer = state.answers.find(a => a.questionId === state.currentQuestion);
    return currentAnswer && (
      Array.isArray(currentAnswer.answer) 
        ? currentAnswer.answer.length > 0 
        : currentAnswer.answer.length > 0
    );
  };

  const getCurrentAnswer = () => {
    return state.answers.find(a => a.questionId === state.currentQuestion);
  };

  const getProgress = () => {
    return Math.round(((state.currentQuestion + 1) / questions.length) * 100);
  };

  const resetQuiz = () => {
    setState({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
      userProfile: null
    });
  };

  return {
    ...state,
    currentQuestionData: questions[state.currentQuestion],
    totalQuestions: questions.length,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    canProceed,
    getCurrentAnswer,
    getProgress,
    resetQuiz
  };
};

// Helper function to generate user profile from answers
const generateUserProfile = (answers: QuizAnswer[], questions: QuizQuestion[]): UserProfile => {
  const profile: UserProfile = {
    motivation: '',
    experience: '',
    schedule: '',
    goals: [],
    learningStyle: '',
    concerns: ''
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    switch (question.id) {
      case 0: // Motivation
        profile.motivation = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer;
        break;
      case 1: // Experience
        profile.experience = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer;
        break;
      case 2: // Schedule
        profile.schedule = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer;
        break;
      case 3: // Goals
        profile.goals = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
        break;
      case 4: // Learning Style
        profile.learningStyle = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer;
        break;
      case 5: // Concerns
        profile.concerns = Array.isArray(answer.answer) ? answer.answer[0] : answer.answer;
        break;
    }
  });

  return profile;
}; 

import QuizController from "@/components/quiz/QuizController";
import { spanishQuiz } from "@/data/spanishQuiz";

const Index = () => {
  return <QuizController config={spanishQuiz} />;
};

export default Index;

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctAnswerId: string;
}

export interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  percentageScore: number;
  questionsWithAnswers: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

export interface UserAnswer {
  questionId: number;
  selectedOptionId: string;
}

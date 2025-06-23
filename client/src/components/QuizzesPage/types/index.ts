export interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsCount: number;
  timeLimit: number;
  createdAt: string;
  imageUrl?: string;
}

export interface QuizCardProps {
  quiz: Quiz;
  isBlocked?: boolean;
  onStartQuiz?: (quizId: number) => void;
}

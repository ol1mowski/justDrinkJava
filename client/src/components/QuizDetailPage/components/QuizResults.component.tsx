import { memo } from "react";
import { useQuizRanking } from "../hooks/useQuizRanking.hook";
import { useAuth } from "../../../hooks/auth/useAuth.hook";
import { useNavigate } from "react-router-dom";
import {
  QuizResultsHeader,
  RankingUpdateNotification,
  ScoreDisplay,
  StatisticsGrid,
  ActionButtons,
  LoginPromptCard,
} from "./index";

interface QuizResultsProps {
  quiz: {
    id: number;
    title: string;
    description: string;
  };
  userAnswers: Record<number, string[]>;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  onRestart: () => void;
}

export const QuizResults = memo<QuizResultsProps>(
  ({ quiz, score, totalQuestions, correctAnswers, timeSpent, onRestart }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { userRanking, showRankingUpdate } = useQuizRanking({
      score,
      correctAnswers,
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isAuthenticated && userRanking && (
          <RankingUpdateNotification 
            userRanking={userRanking} 
            show={showRankingUpdate} 
          />
        )}

        <QuizResultsHeader quizTitle={quiz.title} />

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8">
          <ScoreDisplay 
            score={score}
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
          />

          <StatisticsGrid 
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            timeSpent={timeSpent}
          />
        </div>

        {!isAuthenticated && (
          <LoginPromptCard
            score={score}
            correctAnswers={correctAnswers}
            onNavigateToLogin={() => navigate('/login')}
          />
        )}

        <ActionButtons onRestart={onRestart} />
      </div>
      </div>
    );
  }
);

QuizResults.displayName = "QuizResults";

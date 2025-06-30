import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { server } from '../../../../test/mocks/server';
import { useQuizDetailLogic } from '../useQuizDetailLogic.hook';
import type {
  QuizData,
  QuizContentData,
  QuizResultData,
} from '../../../../api/types.api';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' }),
  useNavigate: () => mockNavigate,
}));

const mockUseAuth = vi.fn();
vi.mock('../../../../hooks/auth/useAuth.hook', () => ({
  useAuth: () => mockUseAuth(),
}));

const mockUseQuizData = vi.fn();
vi.mock('../useQuizData.hook', () => ({
  useQuizData: () => mockUseQuizData(),
}));

const mockUseQuizState = vi.fn();
vi.mock('../useQuizState.hook', () => ({
  useQuizState: (props: any) => mockUseQuizState(props),
}));

describe('useQuizDetailLogic', () => {
  const mockQuiz: QuizData = {
    id: 1,
    userId: 1,
    title: 'Test Quiz',
    description: 'Test Description',
    category: 'Programming',
    difficulty: 'EASY',
    timeLimit: 15,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const mockQuestions: QuizContentData[] = [
    {
      id: 1,
      quizId: 1,
      question: 'Question 1',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: 'Option 1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
  ];

  const mockResult: QuizResultData = {
    quizId: 1,
    quizTitle: 'Test Quiz',
    score: 80,
    totalQuestions: 1,
    correctAnswers: 1,
    timeSpent: 120,
    results: [
      {
        questionId: 1,
        question: 'Question 1',
        userAnswers: ['Option 1'],
        correctAnswer: 'Option 1',
        isCorrect: true,
        explanation: 'Correct answer',
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    server.resetHandlers();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  it('should initialize with quiz data and state', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    expect(result.current.quiz).toEqual(mockQuiz);
    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.loading).toBe(false);
    expect(result.current.questionsLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.questionsError).toBeNull();
    expect(result.current.hasAccess).toBe(true);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.selectedAnswers).toEqual({});
    expect(result.current.timeRemaining).toBe(900);
    expect(result.current.progress).toBe(33.33);
  });

  it('should handle premium quiz access for authenticated user', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: null,
      questions: [],
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 0,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    expect(result.current.hasAccess).toBe(true);
  });

  it('should handle answer selection', () => {
    const mockSelectAnswer = vi.fn();

    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: mockSelectAnswer,
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    result.current.handleAnswerSelect(1, 'Option 1', false);

    expect(mockSelectAnswer).toHaveBeenCalledWith(1, 'Option 1', false);
  });

  it('should handle navigation', () => {
    const mockNextQuestion = vi.fn();
    const mockPreviousQuestion = vi.fn();

    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: mockNextQuestion,
      previousQuestion: mockPreviousQuestion,
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    result.current.handleNextQuestion();
    expect(mockNextQuestion).toHaveBeenCalled();

    result.current.handlePreviousQuestion();
    expect(mockPreviousQuestion).toHaveBeenCalled();
  });

  it('should handle quiz submission', async () => {
    const mockSubmitAnswers = vi.fn().mockResolvedValue(mockResult);
    const mockCompleteQuiz = vi.fn();
    const mockGetTimeSpent = vi.fn().mockReturnValue(120);

    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: mockSubmitAnswers,
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: { 1: ['Option 1'] },
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: mockCompleteQuiz,
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: mockGetTimeSpent,
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    await result.current.handleSubmitQuiz();

    expect(mockSubmitAnswers).toHaveBeenCalledWith({
      quizId: 1,
      answers: { 1: ['Option 1'] },
      timeSpent: 120,
    });
    expect(mockCompleteQuiz).toHaveBeenCalledWith(mockResult);
  });

  it('should handle quiz restart', () => {
    const mockResetQuiz = vi.fn();

    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: mockResetQuiz,
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    result.current.handleRestartQuiz();

    expect(mockResetQuiz).toHaveBeenCalled();
  });

  it('should handle navigation to quizzes', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    result.current.navigateToQuizzes();

    expect(mockNavigate).toHaveBeenCalledWith('/quizzes');
  });

  it('should handle navigation to login', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: vi.fn(),
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    result.current.navigateToLogin();

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should handle hasAnswered function', () => {
    const mockHasAnswered = vi.fn().mockReturnValue(true);

    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    mockUseQuizData.mockReturnValue({
      quiz: mockQuiz,
      questions: mockQuestions,
      loading: false,
      questionsLoading: false,
      error: null,
      questionsError: null,
      loadQuiz: vi.fn(),
      loadQuestions: vi.fn(),
      submitAnswers: vi.fn(),
    });
    mockUseQuizState.mockReturnValue({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      isCompleted: false,
      timeRemaining: 900,
      results: null,
      selectAnswer: vi.fn(),
      nextQuestion: vi.fn(),
      previousQuestion: vi.fn(),
      completeQuiz: vi.fn(),
      resetQuiz: vi.fn(),
      progress: 33.33,
      hasAnswered: mockHasAnswered,
      getTimeSpent: vi.fn(),
    });

    const { result } = renderHook(() => useQuizDetailLogic());

    const hasAnswered = result.current.hasAnswered(0);

    expect(hasAnswered).toBe(true);
    expect(mockHasAnswered).toHaveBeenCalledWith(0);
  });
});

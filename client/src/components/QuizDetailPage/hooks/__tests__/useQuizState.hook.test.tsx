import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useQuizState } from '../useQuizState.hook';
import type {
  QuizContentData,
  QuizResultData,
} from '../../../../api/types.api';

describe('useQuizState', () => {
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
    {
      id: 2,
      quizId: 1,
      question: 'Question 2',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
    {
      id: 3,
      quizId: 1,
      question: 'Question 3',
      options: ['Yes', 'No'],
      correctAnswer: 'Yes',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    },
  ];

  const mockResult: QuizResultData = {
    quizId: 1,
    quizTitle: 'Test Quiz',
    score: 80,
    totalQuestions: 3,
    correctAnswers: 2,
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
    vi.useFakeTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.selectedAnswers).toEqual({});
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.timeRemaining).toBe(15 * 60);
    expect(result.current.results).toBeNull();
    expect(result.current.progress).toBe(33.33333333333333);
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrevious).toBe(false);
  });

  it('should select answer for single choice question', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.selectAnswer(1, 'Option 1', false);
    });

    expect(result.current.selectedAnswers).toEqual({
      1: ['Option 1'],
    });
  });

  it('should select multiple answers for multiple choice question', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.selectAnswer(1, 'Option 1', true);
      result.current.selectAnswer(1, 'Option 2', true);
    });

    expect(result.current.selectedAnswers).toEqual({
      1: ['Option 1', 'Option 2'],
    });
  });

  it('should deselect answer for multiple choice question', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.selectAnswer(1, 'Option 1', true);
      result.current.selectAnswer(1, 'Option 2', true);
      result.current.selectAnswer(1, 'Option 1', true);
    });

    expect(result.current.selectedAnswers).toEqual({
      1: ['Option 2'],
    });
  });

  it('should navigate to next question', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.canGoNext).toBe(true);

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrevious).toBe(true);
  });

  it('should navigate to previous question', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrevious).toBe(true);

    act(() => {
      result.current.previousQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoPrevious).toBe(false);
  });

  it('should not go beyond question limits', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.previousQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(0);

    act(() => {
      result.current.nextQuestion();
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(2);
    expect(result.current.canGoNext).toBe(false);

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(2);
  });

  it('should set current question directly', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.setCurrentQuestion(2);
    });

    expect(result.current.currentQuestionIndex).toBe(2);
  });

  it('should not set invalid question index', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.setCurrentQuestion(-1);
    });

    expect(result.current.currentQuestionIndex).toBe(0);

    act(() => {
      result.current.setCurrentQuestion(10);
    });

    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it('should complete quiz with results', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.completeQuiz(mockResult);
    });

    expect(result.current.isCompleted).toBe(true);
    expect(result.current.results).toEqual(mockResult);
  });

  it('should reset quiz state', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    act(() => {
      result.current.selectAnswer(1, 'Option 1', false);
      result.current.nextQuestion();
      result.current.completeQuiz(mockResult);
    });

    expect(result.current.selectedAnswers).toEqual({ 1: ['Option 1'] });
    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.isCompleted).toBe(true);

    act(() => {
      result.current.resetQuiz();
    });

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.selectedAnswers).toEqual({});
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.results).toBeNull();
    expect(result.current.timeRemaining).toBe(15 * 60);
  });

  it('should calculate progress correctly', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 15 })
    );

    expect(result.current.progress).toBe(33.33333333333333); // 1/3 * 100

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.progress).toBe(66.66666666666666); // 2/3 * 100

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.progress).toBe(100); // 3/3 * 100
  });

  it('should countdown timer correctly', () => {
    const { result } = renderHook(() =>
      useQuizState({ questions: mockQuestions, timeLimit: 1 })
    ); // 1 minute

    expect(result.current.timeRemaining).toBe(60);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.timeRemaining).toBe(50);

    act(() => {
      vi.advanceTimersByTime(50000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isCompleted).toBe(true);
  });
});

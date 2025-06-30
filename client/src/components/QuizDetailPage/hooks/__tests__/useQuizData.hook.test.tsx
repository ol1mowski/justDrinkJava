import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useQuizData } from '../useQuizData.hook';
import type { QuizResultData } from '../../../../api/types.api';

vi.mock('../../../../api', () => ({
  quizService: {
    getById: vi.fn(),
    getQuestions: vi.fn(),
    checkAnswers: vi.fn(),
  },
}));

import { quizService } from '../../../../api';

describe('useQuizData', () => {
  const mockResult: QuizResultData = {
    quizId: 1,
    quizTitle: 'Test Quiz',
    score: 80,
    totalQuestions: 2,
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
    (quizService.getById as any).mockReset();
    (quizService.getQuestions as any).mockReset();
    (quizService.checkAnswers as any).mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useQuizData());

    expect(result.current.quiz).toBeNull();
    expect(result.current.questions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.questionsLoading).toBe(false);
    expect(result.current.submitting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.questionsError).toBeNull();
    expect(result.current.submitError).toBeNull();
  });

  it('should handle quiz loading error', async () => {
    (quizService.getById as any).mockRejectedValue('HTTP 404: Quiz not found');

    const { result } = renderHook(() => useQuizData());

    await result.current.loadQuiz(999);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quiz).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle questions loading error', async () => {
    (quizService.getQuestions as any).mockRejectedValue(
      new Error('HTTP 404: Questions not found')
    );

    const { result } = renderHook(() => useQuizData());

    await result.current.loadQuestions(999);

    await waitFor(
      () => {
        expect(result.current.questionsLoading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.questions).toEqual([]);
  });

  it('should submit answers successfully', async () => {
    (quizService.checkAnswers as any).mockResolvedValue({ data: mockResult });

    const { result } = renderHook(() => useQuizData());

    const request = {
      quizId: 1,
      answers: { 1: ['Option 1'], 2: ['Option A'] },
      timeSpent: 120,
    };

    const response = await result.current.submitAnswers(request);

    expect(response).toEqual(mockResult);
    expect(result.current.submitError).toBeNull();
  });

  it('should reset state', () => {
    const { result } = renderHook(() => useQuizData());

    result.current.reset();

    expect(result.current.quiz).toBeNull();
    expect(result.current.questions).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.questionsError).toBeNull();
    expect(result.current.submitError).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.questionsLoading).toBe(false);
    expect(result.current.submitting).toBe(false);
  });
});

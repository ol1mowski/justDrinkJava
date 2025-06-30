import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useQuizzes } from '../useQuizzes.hook';
import type { QuizData } from '../../../../api/types.api';

vi.mock('../../../../api', () => ({
  quizService: {
    getAll: vi.fn(),
  },
}));

import { quizService } from '../../../../api';

describe('useQuizzes', () => {
  const mockQuizData: QuizData[] = [
    {
      id: 1,
      userId: 1,
      title: 'Test Quiz 1',
      description: 'Test Description 1',
      category: 'Programming',
      difficulty: 'EASY',
      timeLimit: 15,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      questions: [
        {
          id: 1,
          quizId: 1,
          question: 'Question 1',
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 'Option 1',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
        },
      ],
    },
    {
      id: 2,
      userId: 1,
      title: 'Test Quiz 2',
      description: 'Test Description 2',
      category: 'Science',
      difficulty: 'MEDIUM',
      timeLimit: 20,
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: '2023-01-02T00:00:00Z',
      questions: [
        {
          id: 2,
          quizId: 2,
          question: 'Question 1',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'Option A',
          createdAt: '2023-01-02T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
        {
          id: 3,
          quizId: 2,
          question: 'Question 2',
          options: ['Yes', 'No'],
          correctAnswer: 'Yes',
          createdAt: '2023-01-02T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
        },
      ],
    },
  ];

  const mockApiResponse = {
    data: {
      content: mockQuizData,
      totalElements: 2,
      totalPages: 1,
      size: 20,
      number: 0,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (quizService.getAll as any).mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default values', () => {
    (quizService.getAll as any).mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useQuizzes());

    expect(result.current.quizzes).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should load quizzes successfully', async () => {
    (quizService.getAll as any).mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useQuizzes());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes).toHaveLength(2);
    expect(result.current.quizzes[0]).toEqual({
      id: 1,
      title: 'Test Quiz 1',
      description: 'Test Description 1',
      category: 'Programming',
      difficulty: 'easy',
      questionsCount: 1,
      timeLimit: 15,
      createdAt: expect.any(String),
      imageUrl: expect.stringMatching(
        /^https:\/\/images\.unsplash\.com\/photo-\d+\?w=400&h=300&fit=crop$/
      ),
    });
    expect(result.current.quizzes[1]).toEqual({
      id: 2,
      title: 'Test Quiz 2',
      description: 'Test Description 2',
      category: 'Science',
      difficulty: 'medium',
      questionsCount: 2,
      timeLimit: 20,
      createdAt: expect.any(String),
      imageUrl: expect.stringMatching(
        /^https:\/\/images\.unsplash\.com\/photo-\d+\?w=400&h=300&fit=crop$/
      ),
    });
    expect(result.current.error).toBeNull();
  });

  it('should handle loading error', async () => {
    (quizService.getAll as any).mockRejectedValue('HTTP 500: Server error');

    const { result } = renderHook(() => useQuizzes());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes).toEqual([]);
    expect(result.current.error).not.toBeNull();
    expect(result.current.error).toContain('HTTP 500');
  });

  it('should handle empty response', async () => {
    (quizService.getAll as any).mockResolvedValue({
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 20,
        number: 0,
      },
    });

    const { result } = renderHook(() => useQuizzes());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle quiz without questions', async () => {
    const quizWithoutQuestions = {
      ...mockQuizData[0],
      questions: undefined,
    };

    (quizService.getAll as any).mockResolvedValue({
      data: {
        content: [quizWithoutQuestions],
        totalElements: 1,
        totalPages: 1,
        size: 20,
        number: 0,
      },
    });

    const { result } = renderHook(() => useQuizzes());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes).toHaveLength(1);
    expect(result.current.quizzes[0].questionsCount).toBe(0);
  });

  it('should refetch quizzes', async () => {
    (quizService.getAll as any).mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useQuizzes());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes).toHaveLength(2);

    const newMockData = [
      {
        ...mockQuizData[0],
        title: 'Updated Quiz',
      },
    ];

    (quizService.getAll as any).mockResolvedValue({
      data: {
        content: newMockData,
        totalElements: 1,
        totalPages: 1,
        size: 20,
        number: 0,
      },
    });

    await result.current.refetch();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes).toHaveLength(1);
    expect(result.current.quizzes[0].title).toBe('Updated Quiz');
  });

  it('should map difficulty correctly', async () => {
    const quizzesWithDifferentDifficulties = [
      { ...mockQuizData[0], difficulty: 'EASY' },
      { ...mockQuizData[1], difficulty: 'MEDIUM' },
      { ...mockQuizData[0], id: 3, difficulty: 'HARD' },
    ];

    (quizService.getAll as any).mockResolvedValue({
      data: {
        content: quizzesWithDifferentDifficulties,
        totalElements: 3,
        totalPages: 1,
        size: 20,
        number: 0,
      },
    });

    const { result } = renderHook(() => useQuizzes());

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.quizzes[0].difficulty).toBe('easy');
    expect(result.current.quizzes[1].difficulty).toBe('medium');
    expect(result.current.quizzes[2].difficulty).toBe('hard');
  });
});

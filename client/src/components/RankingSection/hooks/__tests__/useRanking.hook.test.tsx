import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useRanking } from '../useRanking.hook';
import type { UserRankingDto } from '../../../../api/ranking.api';

vi.mock('../../../../api/ranking.api', () => ({
  rankingApi: {
    getUserRanking: vi.fn(),
    updateUserScore: vi.fn(),
    getTopRankings: vi.fn(),
  },
}));

const mockUseAuth = vi.fn();
vi.mock('../../../../hooks/auth/useAuth.hook', () => ({
  useAuth: () => mockUseAuth(),
}));

import { rankingApi } from '../../../../api/ranking.api';

describe('useRanking', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    username: 'testuser',
  };

  const mockUserRanking: UserRankingDto = {
    userId: 1,
    username: 'testuser',
    email: 'test@example.com',
    totalScore: 100,
    ranking: 5,
    updatedAt: '2023-01-01T00:00:00Z',
  };

  const mockTopRankings: UserRankingDto[] = [
    {
      userId: 1,
      username: 'user1',
      email: 'user1@example.com',
      totalScore: 500,
      ranking: 1,
      updatedAt: '2023-01-01T00:00:00Z',
    },
    {
      userId: 2,
      username: 'user2',
      email: 'user2@example.com',
      totalScore: 400,
      ranking: 2,
      updatedAt: '2023-01-01T00:00:00Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({ user: mockUser });
    (rankingApi.getUserRanking as any).mockReset();
    (rankingApi.updateUserScore as any).mockReset();
    (rankingApi.getTopRankings as any).mockReset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useRanking());

    expect(result.current.userRanking).toBeNull();
    expect(result.current.topRankings).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasRanking).toBe(false);
  });

  it('should get user ranking successfully', async () => {
    (rankingApi.getUserRanking as any).mockResolvedValue(mockUserRanking);

    const { result } = renderHook(() => useRanking());

    result.current.getUserRanking();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.userRanking).toEqual(mockUserRanking);
      },
      { timeout: 3000 }
    );

    expect(result.current.hasRanking).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should get user ranking with specific userId', async () => {
    (rankingApi.getUserRanking as any).mockResolvedValue(mockUserRanking);

    const { result } = renderHook(() => useRanking());

    result.current.getUserRanking(2);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.userRanking).toEqual(mockUserRanking);
      },
      { timeout: 3000 }
    );

    expect(rankingApi.getUserRanking).toHaveBeenCalledWith(2);
  });

  it('should handle getUserRanking error', async () => {
    (rankingApi.getUserRanking as any).mockRejectedValue({
      message: 'HTTP 404: User not found',
    });

    const { result } = renderHook(() => useRanking());

    result.current.getUserRanking();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.userRanking).toBeNull();
        expect(result.current.error).not.toBeNull();
        expect(result.current.error).toContain('HTTP 404');
      },
      { timeout: 3000 }
    );
  });

  it('should get top rankings successfully', async () => {
    (rankingApi.getTopRankings as any).mockResolvedValue(mockTopRankings);

    const { result } = renderHook(() => useRanking());

    result.current.getTopRankings();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.topRankings).toEqual(mockTopRankings);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toBeNull();
  });

  it('should get top rankings with custom limit', async () => {
    (rankingApi.getTopRankings as any).mockResolvedValue(mockTopRankings);

    const { result } = renderHook(() => useRanking());

    result.current.getTopRankings(5);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.topRankings).toEqual(mockTopRankings);
      },
      { timeout: 3000 }
    );

    expect(rankingApi.getTopRankings).toHaveBeenCalledWith(5);
  });

  it('should handle getTopRankings error', async () => {
    (rankingApi.getTopRankings as any).mockRejectedValue({
      message: 'HTTP 500: Server error',
    });

    const { result } = renderHook(() => useRanking());

    result.current.getTopRankings();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.topRankings).toEqual([]);
        expect(result.current.error).not.toBeNull();
        expect(result.current.error).toContain('HTTP 500');
      },
      { timeout: 3000 }
    );
  });

  it('should update user score successfully', async () => {
    const currentRanking = { ...mockUserRanking, totalScore: 100 };
    const updatedRanking = { ...mockUserRanking, totalScore: 150 };

    (rankingApi.getUserRanking as any).mockResolvedValue(currentRanking);
    (rankingApi.updateUserScore as any).mockResolvedValue(updatedRanking);

    const { result } = renderHook(() => useRanking());

    const response = await result.current.updateUserScore(50);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.userRanking).toEqual(updatedRanking);
      },
      { timeout: 3000 }
    );

    expect(response).toEqual(updatedRanking);
    expect(result.current.error).toBeNull();

    expect(rankingApi.updateUserScore).toHaveBeenCalledWith({
      userId: 1,
      totalScore: 150,
    });
  });

  it('should handle updateUserScore when user is not logged in', async () => {
    mockUseAuth.mockReturnValue({ user: null });

    const { result } = renderHook(() => useRanking());

    const response = await result.current.updateUserScore(50);

    await waitFor(
      () => {
        expect(result.current.error).toBe(
          'Musisz być zalogowany aby aktualizować ranking'
        );
      },
      { timeout: 3000 }
    );

    expect(response).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should handle updateUserScore error', async () => {
    (rankingApi.getUserRanking as any).mockRejectedValue({
      message: 'HTTP 400: Invalid request',
    });

    const { result } = renderHook(() => useRanking());

    const response = await result.current.updateUserScore(50);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.error).not.toBeNull();
        expect(result.current.error).toContain('HTTP 400');
      },
      { timeout: 3000 }
    );

    expect(response).toBeNull();
  });

  it('should handle string user ID', async () => {
    mockUseAuth.mockReturnValue({ user: { ...mockUser, id: '1' } });
    (rankingApi.getUserRanking as any).mockResolvedValue(mockUserRanking);
    (rankingApi.updateUserScore as any).mockResolvedValue(mockUserRanking);

    const { result } = renderHook(() => useRanking());

    result.current.getUserRanking();
    await result.current.updateUserScore(50);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(rankingApi.getUserRanking).toHaveBeenCalledWith(1);
    expect(rankingApi.updateUserScore).toHaveBeenCalledWith({
      userId: 1,
      totalScore: 150,
    });
  });

  it('should clear error', async () => {
    (rankingApi.getUserRanking as any).mockRejectedValue({
      message: 'Test error',
    });

    const { result } = renderHook(() => useRanking());

    result.current.getUserRanking();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.error).not.toBeNull();
      },
      { timeout: 3000 }
    );

    result.current.clearError();

    await waitFor(
      () => {
        expect(result.current.error).toBeNull();
      },
      { timeout: 3000 }
    );
  });

  it('should handle getUserRanking without user ID', async () => {
    mockUseAuth.mockReturnValue({ user: null });

    const { result } = renderHook(() => useRanking());

    result.current.getUserRanking();

    await waitFor(
      () => {
        expect(result.current.error).toBe(
          'Nie można pobrać rankingu - brak ID użytkownika'
        );
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );
  });

  it('should calculate hasRanking correctly', async () => {
    (rankingApi.getUserRanking as any).mockResolvedValue(mockUserRanking);

    const { result } = renderHook(() => useRanking());

    expect(result.current.hasRanking).toBe(false);

    result.current.getUserRanking();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(result.current.hasRanking).toBe(true);
      },
      { timeout: 3000 }
    );
  });
});

import { renderHook, waitFor, act } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { useCategories } from '../useCategories.hook';

beforeAll(() => {
  vi.doMock('../../../../test/mocks/server', () => ({
    server: {
      listen: vi.fn(),
      close: vi.fn(),
      resetHandlers: vi.fn(),
    },
  }));
});

afterAll(() => {
  vi.clearAllMocks();
});

vi.mock('../../../../hooks/useErrorHandler.hook', () => ({
  useErrorHandler: vi.fn(),
}));

vi.mock('../../../../utils/api', () => ({
  API_BASE_URL: 'http://localhost:8080/api',
}));

import { useErrorHandler } from '../../../../hooks/useErrorHandler.hook';

const mockUseErrorHandler = useErrorHandler as any;
const mockHandleError = vi.fn();
const mockClearError = vi.fn();

const originalFetch = global.fetch;
const mockFetch = vi.fn();

beforeAll(() => {
  global.fetch = mockFetch;
});

afterAll(() => {
  global.fetch = originalFetch;
});

describe('useCategories', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockClear();

    mockUseErrorHandler.mockReturnValue({
      error: null,
      handleError: mockHandleError,
      clearError: mockClearError,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with loading state', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => useCategories());

    expect(result.current.tags).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.hasError).toBe(false);
  });

  it('should fetch categories and posts successfully', async () => {
    const mockCategories = [
      { id: 1, name: 'Spring Boot' },
      { id: 2, name: 'React' },
      { id: 3, name: 'Java Core' },
    ];

    const mockPosts = [
      { id: 1, category: { id: 1 } },
      { id: 2, category: { id: 1 } },
      { id: 3, category: { id: 1 } },
      { id: 4, category: { id: 1 } },
      { id: 5, category: { id: 1 } },
      { id: 6, category: { id: 1 } },
      { id: 7, category: { id: 2 } },
      { id: 8, category: { id: 2 } },
      { id: 9, category: { id: 3 } },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tags).toHaveLength(3);
    expect(result.current.tags[0].name).toBe('Spring Boot');
    expect(result.current.tags[0].count).toBe(6);
    expect(result.current.tags[0].trending).toBe(true);
    expect(result.current.tags[0].color).toBe('orange');

    expect(result.current.tags[1].name).toBe('React');
    expect(result.current.tags[1].count).toBe(2);
    expect(result.current.tags[1].trending).toBe(false);
    expect(result.current.tags[1].color).toBe('red');

    expect(result.current.tags[2].name).toBe('Java Core');
    expect(result.current.tags[2].count).toBe(1);
    expect(result.current.tags[2].trending).toBe(false);
    expect(result.current.tags[2].color).toBe('blue');
  });

  it('should handle categories API error', async () => {
    const error = new Error('Categories API error');
    mockFetch.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      error,
      'FETCH_CATEGORIES_ERROR'
    );
    expect(result.current.tags).toEqual([]);
  });

  it('should handle posts API error', async () => {
    const mockCategories = [{ id: 1, name: 'Test' }];
    const error = new Error('Posts API error');

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockRejectedValueOnce(error);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      error,
      'FETCH_CATEGORIES_ERROR'
    );
    expect(result.current.tags).toEqual([]);
  });

  it('should handle HTTP error responses', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockHandleError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'HTTP 404: Not Found',
      }),
      'FETCH_CATEGORIES_ERROR'
    );
  });

  it('should limit categories based on limit parameter', async () => {
    const mockCategories = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Category ${i + 1}`,
    }));

    const mockPosts = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      category: { id: (i % 10) + 1 },
    }));

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories(5));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tags).toHaveLength(5);
  });

  it('should sort categories by post count in descending order', async () => {
    const mockCategories = [
      { id: 1, name: 'Low Count' },
      { id: 2, name: 'High Count' },
      { id: 3, name: 'Medium Count' },
    ];

    const mockPosts = [
      { id: 1, category: { id: 2 } },
      { id: 2, category: { id: 2 } },
      { id: 3, category: { id: 2 } },
      { id: 4, category: { id: 3 } },
      { id: 5, category: { id: 3 } },
      { id: 6, category: { id: 1 } },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tags[0].name).toBe('High Count');
    expect(result.current.tags[0].count).toBe(3);
    expect(result.current.tags[1].name).toBe('Medium Count');
    expect(result.current.tags[1].count).toBe(2);
    expect(result.current.tags[2].name).toBe('Low Count');
    expect(result.current.tags[2].count).toBe(1);
  });

  it('should mark categories as trending when post count > 5', async () => {
    const mockCategories = [
      { id: 1, name: 'Trending Category' },
      { id: 2, name: 'Regular Category' },
    ];

    const mockPosts = [
      ...Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        category: { id: 1 },
      })),
      ...Array.from({ length: 3 }, (_, i) => ({
        id: i + 7,
        category: { id: 2 },
      })),
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tags[0].trending).toBe(true);
    expect(result.current.tags[1].trending).toBe(false);
  });

  it('should assign colors cyclically', async () => {
    const mockCategories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' },
    ];

    const mockPosts = [
      { id: 1, category: { id: 1 } },
      { id: 2, category: { id: 2 } },
      { id: 3, category: { id: 3 } },
    ];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const colors = result.current.tags.map(tag => tag.color);
    expect(colors).toEqual(['orange', 'red', 'blue']);
  });

  it('should handle refetch correctly', async () => {
    const mockCategories = [{ id: 1, name: 'Test Category' }];
    const mockPosts = [{ id: 1, category: { id: 1 } }];

    mockFetch
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    mockFetch.mockClear();

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle empty responses', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tags).toEqual([]);
  });

  it('should handle categories without matching posts', async () => {
    const mockCategories = [{ id: 1, name: 'Unused Category' }];
    const mockPosts: any[] = [];

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockPosts),
      });

    const { result } = renderHook(() => useCategories());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.tags).toHaveLength(1);
    expect(result.current.tags[0].count).toBe(0);
    expect(result.current.tags[0].trending).toBe(false);
  });
});

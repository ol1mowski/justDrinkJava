import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePostDetailLogic } from '../usePostDetailLogic.hook';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../usePost.hook', () => ({
  usePost: vi.fn(),
}));

vi.mock('../useRelatedPosts.hook', () => ({
  useRelatedPosts: vi.fn(),
}));

vi.mock('../../../PostCard/hooks/usePostLike.hook', () => ({
  usePostLike: vi.fn(),
}));

vi.mock('../../../../hooks/auth/useAuth.hook', () => ({
  useAuth: vi.fn(),
}));

import { useNavigate, useParams } from 'react-router-dom';
import { usePost } from '../usePost.hook';
import { useRelatedPosts } from '../useRelatedPosts.hook';
import { usePostLike } from '../../../PostCard/hooks/usePostLike.hook';
import { useAuth } from '../../../../hooks/auth/useAuth.hook';

const mockUseNavigate = useNavigate as any;
const mockUseParams = useParams as any;
const mockUsePost = usePost as any;
const mockUseRelatedPosts = useRelatedPosts as any;
const mockUsePostLike = usePostLike as any;
const mockUseAuth = useAuth as any;

describe('usePostDetailLogic', () => {
  const mockNavigate = vi.fn();
  const mockTogglePostLike = vi.fn();
  const mockRefetch = vi.fn();

  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test content',
    likes: 5,
    isLikedByCurrentUser: false,
    createdAt: '2023-01-01T00:00:00Z',
  };

  const mockRelatedPosts = [
    { id: 2, title: 'Related Post 1' },
    { id: 3, title: 'Related Post 2' },
  ];

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseParams.mockReturnValue({ id: '1' });

    mockUsePost.mockReturnValue({
      post: mockPost,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    mockUseRelatedPosts.mockReturnValue({
      posts: mockRelatedPosts,
      isLoading: false,
    });

    mockUsePostLike.mockReturnValue({
      toggleLike: mockTogglePostLike,
    });

    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with correct data from hooks', () => {
    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.postId).toBe(1);
    expect(result.current.post).toEqual(mockPost);
    expect(result.current.isPostLoading).toBe(false);
    expect(result.current.isPostError).toBe(false);
    expect(result.current.postError).toBe(null);
    expect(result.current.relatedPosts).toEqual(mockRelatedPosts);
    expect(result.current.isRelatedLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.currentUser).toEqual(mockUser);
  });

  it('should parse postId from params correctly', () => {
    mockUseParams.mockReturnValue({ id: '123' });

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.postId).toBe(123);
    expect(mockUsePost).toHaveBeenCalledWith(123);
    expect(mockUseRelatedPosts).toHaveBeenCalledWith(123);
  });

  it('should default to postId 1 when params.id is missing', () => {
    mockUseParams.mockReturnValue({});

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.postId).toBe(1);
  });

  it('should set up interactions correctly', () => {
    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.interactions).toEqual({
      isLiked: false,
      isBookmarked: false,
      likeCount: 5,
      bookmarkCount: 0,
    });
  });

  it('should handle post with like status', () => {
    mockUsePost.mockReturnValue({
      post: { ...mockPost, isLikedByCurrentUser: true, likes: 10 },
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.interactions).toEqual({
      isLiked: true,
      isBookmarked: false,
      likeCount: 10,
      bookmarkCount: 0,
    });
  });

  it('should handle null post', () => {
    mockUsePost.mockReturnValue({
      post: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.interactions).toEqual({
      isLiked: false,
      isBookmarked: false,
      likeCount: 0,
      bookmarkCount: 0,
    });
  });

  it('should toggle like when authenticated and post exists', async () => {
    mockTogglePostLike.mockResolvedValue({
      likes: 6,
      isLikedByCurrentUser: true,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    await act(async () => {
      await result.current.toggleLike();
    });

    expect(mockTogglePostLike).toHaveBeenCalledWith(1);
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('should not toggle like when not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    await act(async () => {
      await result.current.toggleLike();
    });

    expect(mockTogglePostLike).not.toHaveBeenCalled();
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it('should not toggle like when post is null', async () => {
    mockUsePost.mockReturnValue({
      post: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    await act(async () => {
      await result.current.toggleLike();
    });

    expect(mockTogglePostLike).not.toHaveBeenCalled();
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it('should not refetch when toggleLike returns null', async () => {
    mockTogglePostLike.mockResolvedValue(null);

    const { result } = renderHook(() => usePostDetailLogic());

    await act(async () => {
      await result.current.toggleLike();
    });

    expect(mockTogglePostLike).toHaveBeenCalledWith(1);
    expect(mockRefetch).not.toHaveBeenCalled();
  });

  it('should toggle bookmark correctly', () => {
    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.interactions.isBookmarked).toBe(false);

    act(() => {
      result.current.toggleBookmark();
    });

    expect(result.current.interactions.isBookmarked).toBe(true);

    act(() => {
      result.current.toggleBookmark();
    });

    expect(result.current.interactions.isBookmarked).toBe(false);
  });

  it('should handle back navigation', () => {
    const { result } = renderHook(() => usePostDetailLogic());

    act(() => {
      result.current.handleBack();
    });

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should format date correctly', () => {
    const { result } = renderHook(() => usePostDetailLogic());

    const formattedDate = result.current.formatDate('2023-01-15T10:30:00Z');

    expect(formattedDate).toMatch(/15|styczeń|January/i);
    expect(formattedDate).toMatch(/2023/);
  });

  it('should handle loading states correctly', () => {
    mockUsePost.mockReturnValue({
      post: null,
      isLoading: true,
      isError: false,
      error: null,
      refetch: mockRefetch,
    });

    mockUseRelatedPosts.mockReturnValue({
      posts: [],
      isLoading: true,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.isPostLoading).toBe(true);
    expect(result.current.isRelatedLoading).toBe(true);
  });

  it('should handle error states correctly', () => {
    const error = new Error('Failed to load post');

    mockUsePost.mockReturnValue({
      post: null,
      isLoading: false,
      isError: true,
      error,
      refetch: mockRefetch,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.isPostError).toBe(true);
    expect(result.current.postError).toBe(error);
  });

  it('should handle unauthenticated user', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    const { result } = renderHook(() => usePostDetailLogic());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.currentUser).toBe(null);
  });
});

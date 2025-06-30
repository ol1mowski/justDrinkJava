import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePostInteractions } from '../usePostInteractions.hook';

describe('usePostInteractions', () => {
  beforeEach(() => {});

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePostInteractions());

    expect(result.current.interactions).toEqual({
      isLiked: false,
      isBookmarked: false,
      likeCount: 0,
      bookmarkCount: 0,
    });
    expect(typeof result.current.toggleLike).toBe('function');
    expect(typeof result.current.toggleBookmark).toBe('function');
  });

  it('should initialize with custom values', () => {
    const { result } = renderHook(() =>
      usePostInteractions(true, false, 10, 5)
    );

    expect(result.current.interactions).toEqual({
      isLiked: true,
      isBookmarked: false,
      likeCount: 10,
      bookmarkCount: 5,
    });
  });

  it('should toggle like from false to true and increment count', () => {
    const { result } = renderHook(() =>
      usePostInteractions(false, false, 5, 0)
    );

    act(() => {
      result.current.toggleLike();
    });

    expect(result.current.interactions.isLiked).toBe(true);
    expect(result.current.interactions.likeCount).toBe(6);
    expect(result.current.interactions.isBookmarked).toBe(false);
    expect(result.current.interactions.bookmarkCount).toBe(0);
  });

  it('should toggle like from true to false and decrement count', () => {
    const { result } = renderHook(() => usePostInteractions(true, false, 5, 0));

    act(() => {
      result.current.toggleLike();
    });

    expect(result.current.interactions.isLiked).toBe(false);
    expect(result.current.interactions.likeCount).toBe(4);
  });

  it('should toggle bookmark from false to true and increment count', () => {
    const { result } = renderHook(() =>
      usePostInteractions(false, false, 0, 3)
    );

    act(() => {
      result.current.toggleBookmark();
    });

    expect(result.current.interactions.isBookmarked).toBe(true);
    expect(result.current.interactions.bookmarkCount).toBe(4);
    expect(result.current.interactions.isLiked).toBe(false);
    expect(result.current.interactions.likeCount).toBe(0);
  });

  it('should toggle bookmark from true to false and decrement count', () => {
    const { result } = renderHook(() => usePostInteractions(false, true, 0, 3));

    act(() => {
      result.current.toggleBookmark();
    });

    expect(result.current.interactions.isBookmarked).toBe(false);
    expect(result.current.interactions.bookmarkCount).toBe(2);
  });

  it('should handle multiple toggles correctly', () => {
    const { result } = renderHook(() =>
      usePostInteractions(false, false, 10, 5)
    );

    act(() => {
      result.current.toggleLike();
    });
    expect(result.current.interactions.isLiked).toBe(true);
    expect(result.current.interactions.likeCount).toBe(11);

    act(() => {
      result.current.toggleLike();
    });
    expect(result.current.interactions.isLiked).toBe(false);
    expect(result.current.interactions.likeCount).toBe(10);

    act(() => {
      result.current.toggleBookmark();
    });
    expect(result.current.interactions.isBookmarked).toBe(true);
    expect(result.current.interactions.bookmarkCount).toBe(6);

    act(() => {
      result.current.toggleBookmark();
    });
    expect(result.current.interactions.isBookmarked).toBe(false);
    expect(result.current.interactions.bookmarkCount).toBe(5);
  });

  it('should handle simultaneous like and bookmark toggles', () => {
    const { result } = renderHook(() =>
      usePostInteractions(false, false, 0, 0)
    );

    act(() => {
      result.current.toggleLike();
      result.current.toggleBookmark();
    });

    expect(result.current.interactions.isLiked).toBe(true);
    expect(result.current.interactions.isBookmarked).toBe(true);
    expect(result.current.interactions.likeCount).toBe(1);
    expect(result.current.interactions.bookmarkCount).toBe(1);
  });

  it('should not affect other interactions when toggling one', () => {
    const { result } = renderHook(() => usePostInteractions(true, true, 10, 5));

    act(() => {
      result.current.toggleLike();
    });

    expect(result.current.interactions.isLiked).toBe(false);
    expect(result.current.interactions.likeCount).toBe(9);
    expect(result.current.interactions.isBookmarked).toBe(true);
    expect(result.current.interactions.bookmarkCount).toBe(5);
  });
});

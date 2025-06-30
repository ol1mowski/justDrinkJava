import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useFiltersState } from '../useFiltersState.hook';
import type { SortOption } from '../../types';

describe('useFiltersState', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useFiltersState());

    expect(result.current.sortBy).toBe('newest');
    expect(result.current.filters).toEqual({
      searchQuery: '',
      category: undefined,
    });
  });

  it('should update sortBy correctly', () => {
    const { result } = renderHook(() => useFiltersState());

    act(() => {
      result.current.setSortBy('oldest');
    });

    expect(result.current.sortBy).toBe('oldest');
  });

  it('should update filters correctly', () => {
    const { result } = renderHook(() => useFiltersState());

    act(() => {
      result.current.setFilters({ searchQuery: 'test query' });
    });

    expect(result.current.filters.searchQuery).toBe('test query');
    expect(result.current.filters.category).toBeUndefined();
  });

  it('should update category filter correctly', () => {
    const { result } = renderHook(() => useFiltersState());

    act(() => {
      result.current.setFilters({ category: 'programming' });
    });

    expect(result.current.filters.category).toBe('programming');
    expect(result.current.filters.searchQuery).toBe('');
  });

  it('should merge multiple filter updates', () => {
    const { result } = renderHook(() => useFiltersState());

    act(() => {
      result.current.setFilters({ searchQuery: 'test' });
    });

    act(() => {
      result.current.setFilters({ category: 'javascript' });
    });

    expect(result.current.filters).toEqual({
      searchQuery: 'test',
      category: 'javascript',
    });
  });

  it('should handle all sort options', () => {
    const { result } = renderHook(() => useFiltersState());
    const sortOptions: SortOption[] = ['newest', 'oldest', 'readTime', 'title'];

    sortOptions.forEach(sortOption => {
      act(() => {
        result.current.setSortBy(sortOption);
      });

      expect(result.current.sortBy).toBe(sortOption);
    });
  });

  it('should clear search query', () => {
    const { result } = renderHook(() => useFiltersState());

    // Set initial search query
    act(() => {
      result.current.setFilters({ searchQuery: 'test query' });
    });

    expect(result.current.filters.searchQuery).toBe('test query');

    // Clear search query
    act(() => {
      result.current.setFilters({ searchQuery: '' });
    });

    expect(result.current.filters.searchQuery).toBe('');
  });

  it('should clear category filter', () => {
    const { result } = renderHook(() => useFiltersState());

    // Set initial category
    act(() => {
      result.current.setFilters({ category: 'programming' });
    });

    expect(result.current.filters.category).toBe('programming');

    // Clear category
    act(() => {
      result.current.setFilters({ category: undefined });
    });

    expect(result.current.filters.category).toBeUndefined();
  });
});

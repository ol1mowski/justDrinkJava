import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMobileMenu } from '../useMobileMenu.hooks';

describe('useMobileMenu', () => {
  it('should initialize with closed state', () => {
    const { result } = renderHook(() => useMobileMenu());

    expect(result.current.isOpen).toBe(false);
  });

  it('should open menu when open is called', () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close menu when close is called', () => {
    const { result } = renderHook(() => useMobileMenu());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle menu state when toggle is called', () => {
    const { result } = renderHook(() => useMobileMenu());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should maintain function references between renders', () => {
    const { result, rerender } = renderHook(() => useMobileMenu());

    const initialOpen = result.current.open;
    const initialClose = result.current.close;
    const initialToggle = result.current.toggle;

    rerender();

    expect(result.current.open).toBe(initialOpen);
    expect(result.current.close).toBe(initialClose);
    expect(result.current.toggle).toBe(initialToggle);
  });

  it('should handle multiple operations correctly', () => {
    const { result } = renderHook(() => useMobileMenu());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });

    act(() => {
      result.current.toggle();
    });

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);
  });
});

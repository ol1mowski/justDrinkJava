import { useState, useEffect } from 'react';
import { postService } from '../../../api/services.api';
import type { PostData } from '../../../api/types.api';

interface UseLatestPostState {
  data: PostData | null;
  loading: boolean;
  error: string | null;
}

export const useLatestPost = () => {
  const [state, setState] = useState<UseLatestPostState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLatestPost = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const data = await postService.getLatest();

        if (isMounted) {
          setState({
            data,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : 'Wystąpił nieoczekiwany błąd',
          });
        }
      }
    };

    fetchLatestPost();

    return () => {
      isMounted = false;
    };
  }, []);

  const refetch = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await postService.getLatest();
      setState({
        data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Wystąpił nieoczekiwany błąd',
      });
    }
  };

  return {
    ...state,
    refetch,
  };
};

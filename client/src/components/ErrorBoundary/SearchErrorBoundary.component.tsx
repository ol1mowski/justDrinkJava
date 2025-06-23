import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SearchErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Search Error Boundary caught an error:', error, errorInfo);

    // Report to error monitoring service if available
    if (typeof window !== 'undefined' && (window as any).reportError) {
      (window as any).reportError({
        error,
        errorInfo,
        component: 'SearchErrorBoundary',
      });
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="text-center py-12 px-4">
          <div className="max-w-md mx-auto">
            <div className="text-red-500 text-6xl mb-6">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-java-dark-text mb-4">
              Błąd wyszukiwania
            </h2>
            <p className="text-gray-600 dark:text-java-dark-text-secondary mb-6">
              Wystąpił problem z funkcją wyszukiwania. Spróbuj ponownie lub
              odśwież stronę.
            </p>

            {this.state.error && (
              <details className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                <summary className="cursor-pointer text-sm font-medium text-red-700 dark:text-red-400">
                  Szczegóły błędu
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-300 overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={this.handleRetry}
                className="bg-java-orange hover:bg-java-orange/90 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Spróbuj ponownie
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                Wróć do głównej
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

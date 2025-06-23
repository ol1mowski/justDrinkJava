import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { ErrorState } from './ErrorState.component';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
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
        <ErrorState
          title="Wystąpił nieoczekiwany błąd"
          message={this.state.error?.message || 'Coś poszło nie tak'}
          onRetry={this.handleRetry}
          retryText="Odśwież komponent"
          size="lg"
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  title?: string;
  message?: string;
}

export const ErrorBoundaryWrapper = ({
  children,
  fallback,
  title,
  message,
}: ErrorBoundaryWrapperProps) => {
  return (
    <ErrorBoundary
      fallback={
        fallback || (
          <ErrorState
            title={title || 'Wystąpił błąd'}
            message={message || 'Coś poszło nie tak'}
            size="md"
          />
        )
      }
    >
      {children}
    </ErrorBoundary>
  );
};

// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';
import ComponentErrors from './ComponenetErrors';

interface Props {
  children: ReactNode;
  onError?: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  public render() {
    if (this.state.hasError) {
      return <ComponentErrors />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

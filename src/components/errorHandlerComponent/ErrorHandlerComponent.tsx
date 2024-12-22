import { Component, ErrorInfo, ReactNode } from 'react';
import ErrorFallBackComponent from './ErrorFallBackComponent';

type Props = {
    children: ReactNode;
};

type State = {
    hasError: boolean;
    error: Error | null;
};

class ErrorHandlerComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render() {
        const { hasError, error } = this.state;
        const { children } = this.props;
        if (hasError && error) {
            return <ErrorFallBackComponent error={error} />;
        }

        return children;
    }
}

export default ErrorHandlerComponent;

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

//Definition of types for component props
interface ErrorBoundaryProps {
    children: ReactNode;
}

//Component status definition
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = (): void => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="p-12  w-full text-center">
                        <span></span>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                          Oh no, something went wrong!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            An unexpected error has occurred. We apologize for the inconvenience.
                        </p>
                        {this.state.error && (
                            <details className="mb-6 text-center max-w-md mt-0 mb-7 mx-auto">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                                    Error details
                                </summary>
                                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs text-red-600 overflow-auto">
                                    {this.state.error.message}
                                </pre>
                            </details>
                        )}
                        <button onClick={this.handleReload} className="bg-red-500 hover:bg-red-400 cursor-pointer text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                            Refresh page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

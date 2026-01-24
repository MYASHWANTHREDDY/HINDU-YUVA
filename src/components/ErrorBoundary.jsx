import { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the 
 * component tree that crashed.
 * 
 * @class ErrorBoundary
 * @extends {Component}
 * 
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  /**
   * Update state so the next render will show the fallback UI
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error information for debugging
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Component stack trace info
   */
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Log to console in development
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  /**
   * Reset the error boundary state
   */
  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            {/* Error Icon */}
            <div className="text-6xl mb-4">😵</div>
            
            <h1 className="text-2xl font-bold text-orange-700 dark:text-orange-400 mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page or go back to the home page.
            </p>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300">
                  Error Details (Dev Only)
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.toString()}
                </pre>
                {this.state.errorInfo && (
                  <pre className="mt-2 text-xs text-gray-500 dark:text-gray-400 overflow-auto">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
              >
                Refresh Page
              </button>
              
              <Link
                to="/"
                onClick={this.handleReset}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition no-underline"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

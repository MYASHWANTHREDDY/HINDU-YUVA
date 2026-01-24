import { Link } from 'react-router-dom';

/**
 * 404 Not Found Page Component
 * 
 * Displayed when a user navigates to a route that doesn't exist.
 * Provides helpful navigation options to get back on track.
 * 
 * @returns {JSX.Element}
 */
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-gray-900 pt-[200px] md:pt-0 p-6">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-600 dark:text-orange-500 mb-4">
            404
          </h1>
          <div className="text-6xl mb-4">🪷</div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for seems to have taken a different path. 
          Let us guide you back to our community.
        </p>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition no-underline"
          >
            🏠 Return Home
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/events"
              className="px-4 py-3 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-semibold rounded-lg border-2 border-orange-600 dark:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition no-underline"
            >
              📅 Events
            </Link>
            <Link
              to="/about"
              className="px-4 py-3 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-semibold rounded-lg border-2 border-orange-600 dark:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition no-underline"
            >
              ℹ️ About Us
            </Link>
            <Link
              to="/contact"
              className="px-4 py-3 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-semibold rounded-lg border-2 border-orange-600 dark:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition no-underline"
            >
              📞 Contact
            </Link>
            <Link
              to="/join"
              className="px-4 py-3 bg-white dark:bg-gray-800 text-orange-600 dark:text-orange-400 font-semibold rounded-lg border-2 border-orange-600 dark:border-orange-500 hover:bg-orange-50 dark:hover:bg-gray-700 transition no-underline"
            >
              🤝 Join Us
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          If you believe this is an error, please{' '}
          <Link to="/contact" className="text-orange-600 dark:text-orange-400 hover:underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default NotFound;

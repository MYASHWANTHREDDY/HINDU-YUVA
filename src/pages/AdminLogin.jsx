import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!password) {
      setError('Please enter a password');
      setLoading(false);
      return;
    }

    const result = await login(password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Invalid password. Please try again.');
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-start justify-center p-4 pt-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-orange-700 mb-2">Hindu YUVA</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Login</h2>
            <p className="text-gray-600">Manage events, news, and team members</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition"
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-red-800 text-sm font-semibold">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Admin Login:</strong> Use the admin password set in your environment variables to access the dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import AdminEvents from '../components/admin/AdminEvents';
import AdminNews from '../components/admin/AdminNews';
import AdminTeam from '../components/admin/AdminTeam';
import AdminImages from '../components/admin/AdminImages';
import AdminGallery from '../components/admin/AdminGallery';
import AdminContacts from '../components/admin/AdminContacts';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      {/* Header */}
      <div className="bg-orange-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Hindu YUVA Admin Dashboard</h1>
            <p className="text-orange-100 mt-1">Manage your organization content</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-300 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-4 font-semibold border-b-4 transition ${
                activeTab === 'events'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              📅 Events
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-4 font-semibold border-b-4 transition ${
                activeTab === 'news'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              📰 News
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`px-4 py-4 font-semibold border-b-4 transition ${
                activeTab === 'team'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              👥 Team
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-4 font-semibold border-b-4 transition ${
                activeTab === 'gallery'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              🖼️ Gallery
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-4 font-semibold border-b-4 transition ${
                activeTab === 'images'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              📤 Uploads
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-4 py-4 font-semibold border-b-4 transition ${
                activeTab === 'contacts'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              💬 Messages
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'events' && <AdminEvents />}
        {activeTab === 'news' && <AdminNews />}
        {activeTab === 'team' && <AdminTeam />}
        {activeTab === 'gallery' && <AdminGallery />}
        {activeTab === 'images' && <AdminImages />}
        {activeTab === 'contacts' && <AdminContacts />}
      </div>
    </div>
  );
}

export default AdminDashboard;

import { useState, useCallback, useEffect } from 'react';
import ImageCropper from './ImageCropper';
import { useAdmin } from '../../contexts/AdminContext';
import { API_URL } from '../../constants/api';

function AdminNews() {
  const [newsList, setNewsList] = useState([]);
  const { getAuthHeaders } = useAdmin();

  // Load news from backend on mount
  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/news`);
        if (response.ok) {
          const data = await response.json();
          setNewsList(data.news || []);
        }
      } catch (error) {
        console.error('Error loading news:', error);
      }
    };
    loadNews();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    author: '',
    content: '',
    image: '',
    category: '',
    featured: false,
  });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Save to backend
  const saveToBackend = useCallback(async (newsToSave) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ news: newsToSave }),
      });
      
      if (response.ok) {
        setSaveMessage({ text: 'News saved successfully!', type: 'success' });
      } else {
        setSaveMessage({ text: 'Failed to save to server', type: 'error' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({ text: 'Network error - changes saved locally only', type: 'warning' });
    }
    setSaving(false);
    setTimeout(() => setSaveMessage({ text: '', type: '' }), 3000);
  }, [getAuthHeaders]);

  const handleAdd = () => {
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      author: '',
      content: '',
      image: '',
      category: '',
      featured: false,
    });
    setEditingId(null);
    setImagePreview('');
    setShowForm(true);
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    
    // Store file and show cropper
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile({
        blob: file,
        src: e.target.result,
      });
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedBlob) => {
    // Upload cropped image
    setShowCropper(false);
    setUploading(true);

    const formDataObj = new FormData();
    formDataObj.append('file', croppedBlob, 'cropped-image.png');

    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
        },
        body: formDataObj,
      });

      if (response.ok) {
        const data = await response.json();
        const imagePath = data.imagePath || data.path;
        setFormData({ ...formData, image: imagePath });
        setImagePreview(imagePath);
        setSaveMessage({ text: 'Image cropped and uploaded successfully!', type: 'success' });
        setTimeout(() => setSaveMessage({ text: '', type: '' }), 3000);
      } else {
        setSaveMessage({ text: 'Failed to upload image', type: 'error' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setSaveMessage({ text: 'Error uploading image', type: 'error' });
    }

    setUploading(false);
    setSelectedFile(null);
  };

  const handleEdit = (newsItem) => {
    setFormData(newsItem);
    setEditingId(newsItem.id);
    setImagePreview(newsItem.image);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this news post?')) {
      const newNewsList = newsList.filter((n) => n.id !== id);
      setNewsList(newNewsList);
      saveToBackend(newNewsList);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedNewsList;
    if (editingId) {
      // Update existing
      updatedNewsList = newsList.map((n) => (n.id === editingId ? { ...formData, id: editingId } : n));
    } else {
      // Add new
      updatedNewsList = [
        ...newsList,
        {
          ...formData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ];
    }

    setNewsList(updatedNewsList);
    saveToBackend(updatedNewsList);
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manage News</h2>
          {saving && (
            <span className="text-sm text-blue-600 animate-pulse">Saving...</span>
          )}
          {saveMessage.text && (
            <span className={`text-sm ${
              saveMessage.type === 'success' ? 'text-green-600' :
              saveMessage.type === 'error' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {saveMessage.text}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          + Add News Post
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-orange-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {editingId ? 'Edit News Post' : 'Create New News Post'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="News headline"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="">Select Category</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Update">Update</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  News Image
                </label>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Option 1: Upload from device</p>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        disabled={uploading}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 disabled:bg-gray-100"
                      />
                      {uploading && <span className="text-sm text-blue-600 animate-pulse">Uploading...</span>}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">Option 2: Use asset path (e.g., /assets/events/image.jpg)</p>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="/assets/events/your-image.jpg"
                    />
                  </div>

                  {imagePreview && (
                    <div className="relative w-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: '' });
                          setImagePreview('');
                        }}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="News content..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-orange-600"
                />
                <label htmlFor="featured" className="ml-3 text-gray-700 font-semibold">
                  Featured Post
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                {editingId ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* News List */}
      <div className="space-y-4">
        {newsList.map((newsItem) => (
          <div key={newsItem.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{newsItem.title}</h3>
                  {newsItem.featured && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {newsItem.date} by {newsItem.author}
                </p>
                <p className="text-gray-700 mb-3">{newsItem.content.substring(0, 150)}...</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-semibold">
                  {newsItem.category}
                </span>
              </div>
              {newsItem.image && (
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-32 h-32 object-cover rounded-lg ml-4"
                />
              )}
            </div>

            <div className="flex gap-3 mt-4 border-t pt-4">
              <button
                onClick={() => handleEdit(newsItem)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(newsItem.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Cropper Modal */}
      {showCropper && selectedFile && (
        <ImageCropper
          imageSrc={selectedFile.src}
          onCrop={handleCropComplete}
          onCancel={() => {
            setShowCropper(false);
            setSelectedFile(null);
          }}
        />
      )}
    </div>
  );
}

export default AdminNews;

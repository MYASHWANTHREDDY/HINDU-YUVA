import { useState, useCallback, useEffect } from 'react';
import ImageCropper from './ImageCropper';
import { useAdmin } from '../../contexts/AdminContext';
import { API_URL } from '../../constants/api';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const { getAuthHeaders } = useAdmin();

  // Load events from backend on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };
    loadEvents();
  }, []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    rsvpCapacity: 0,
    category: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Auto-save to backend when events change
  const saveToBackend = useCallback(async (eventsToSave) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ events: eventsToSave }),
      });
      
      if (response.ok) {
        setSaveMessage({ text: 'Events saved successfully!', type: 'success' });
      } else {
        const error = await response.text();
        console.error('Backend error:', response.status, error);
        setSaveMessage({ text: `Failed to save to server: ${response.status}`, type: 'error' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage({ text: 'Network error - changes saved locally only', type: 'warning' });
    }
    setSaving(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage({ text: '', type: '' }), 3000);
  }, [getAuthHeaders]);

  const handleAdd = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
      rsvpCapacity: 0,
      category: '',
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

  const handleEdit = (event) => {
    setFormData(event);
    setEditingId(event.id);
    setImagePreview(event.image);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const newEvents = events.filter((e) => e.id !== id);
      setEvents(newEvents);
      saveToBackend(newEvents);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.date || !formData.description) {
      alert('Please fill in all required fields (title, date, description)');
      return;
    }

    let newEvents;
    if (editingId) {
      // Update existing
      newEvents = events.map((e) => (e.id === editingId ? { ...formData, id: editingId } : e));
    } else {
      // Add new
      newEvents = [
        ...events,
        {
          ...formData,
          id: Date.now(),
          rsvpCount: 0,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    setEvents(newEvents);
    saveToBackend(newEvents);
    
    // Reset form
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
      rsvpCapacity: 0,
      category: '',
    });
    setImagePreview('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manage Events</h2>
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
          + Add Event
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-orange-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {editingId ? 'Edit Event' : 'Create New Event'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="E.g., Diwali Celebration"
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
                  <option value="Cultural">Cultural</option>
                  <option value="Service">Service</option>
                  <option value="Education">Education</option>
                  <option value="Social">Social</option>
                </select>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="E.g., 6:00 PM - 10:00 PM"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="E.g., Student Center, Room 201"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  RSVP Capacity
                </label>
                <input
                  type="number"
                  value={formData.rsvpCapacity}
                  onChange={(e) =>
                    setFormData({ ...formData, rsvpCapacity: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Image
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
                    <p className="text-xs text-gray-500 mb-2">Option 2: Use asset path (e.g., /assets/events/diwali_party.jpg)</p>
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
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Event description..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                {editingId ? 'Update Event' : 'Create Event'}
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

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{event.date} | {event.time}</p>
              <p className="text-gray-600 text-sm mb-4">{event.description.substring(0, 100)}...</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(event)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Delete
                </button>
              </div>
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

export default AdminEvents;

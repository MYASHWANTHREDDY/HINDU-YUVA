import { useState, useCallback, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { API_URL } from '../../constants/api';

function AdminGallery() {
  const [albums, setAlbums] = useState([]);
  const { getAuthHeaders } = useAdmin();
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: '',
    media: [], // Array of { type: 'image'|'video', url: string, source: 'upload'|'drive'|'link' }
  });

  // Upload state
  const [bulkFiles, setBulkFiles] = useState([]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load albums from backend
  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery`);
      if (response.ok) {
        const data = await response.json();
        setAlbums(data);
      }
    } catch (error) {
      console.error('Error loading albums:', error);
    }
  };

  const saveToBackend = useCallback(async (albumsToSave) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ gallery: albumsToSave }),
      });
      
      if (response.ok) {
        setMessage({ text: 'Gallery saved successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to save to server', type: 'error' });
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage({ text: 'Network error - changes saved locally only', type: 'warning' });
    }
    setSaving(false);
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  }, [getAuthHeaders]);

  const handleAddAlbum = () => {
    setFormData({
      name: '',
      description: '',
      coverImage: '',
      media: [],
    });
    setEditingAlbum(null);
    setShowForm(true);
  };

  const handleEditAlbum = (album) => {
    setFormData({ ...album });
    setEditingAlbum(album.id);
    setShowForm(true);
  };

  const handleDeleteAlbum = (id) => {
    if (confirm('Are you sure you want to delete this album and all its media?')) {
      const newAlbums = albums.filter((a) => a.id !== id);
      setAlbums(newAlbums);
      saveToBackend(newAlbums);
    }
  };

  // Bulk upload (without cropping)
  const handleBulkFilesSelect = (files) => {
    setBulkFiles(Array.from(files));
  };

  const uploadBulkFiles = async () => {
    if (bulkFiles.length === 0) return;

    setBulkUploading(true);
    setUploadProgress(0);
    const uploadedMedia = [];

    for (let i = 0; i < bulkFiles.length; i++) {
      const file = bulkFiles[i];
      const formDataObj = new FormData();
      formDataObj.append('file', file);

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
          const mediaPath = data.imagePath || data.path;
          const isVideo = file.type.startsWith('video/');
          uploadedMedia.push({
            type: isVideo ? 'video' : 'image',
            url: mediaPath,
            source: 'upload',
          });
        }
      } catch (error) {
        console.error('Bulk upload error:', error);
      }

      setUploadProgress(Math.round(((i + 1) / bulkFiles.length) * 100));
    }

    setFormData({
      ...formData,
      media: [...formData.media, ...uploadedMedia],
    });

    setBulkFiles([]);
    setBulkUploading(false);
    setUploadProgress(0);
    setMessage({ text: `${uploadedMedia.length} files uploaded!`, type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Add Google Drive link
  const [driveLink, setDriveLink] = useState('');
  const [driveLinkType, setDriveLinkType] = useState('image');

  const addDriveLink = () => {
    if (!driveLink.trim()) return;

    // Convert Google Drive share link to direct link
    let directUrl = driveLink;
    
    // Handle various Google Drive link formats
    if (driveLink.includes('drive.google.com')) {
      // Extract file ID from various formats
      let fileId = '';
      
      if (driveLink.includes('/file/d/')) {
        fileId = driveLink.split('/file/d/')[1]?.split('/')[0];
      } else if (driveLink.includes('id=')) {
        fileId = driveLink.split('id=')[1]?.split('&')[0];
      }
      
      if (fileId) {
        directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }

    setFormData({
      ...formData,
      media: [...formData.media, { type: driveLinkType, url: directUrl, source: 'drive' }],
    });

    setDriveLink('');
    setMessage({ text: 'Google Drive link added!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 2000);
  };

  // Add external link (image/video URL)
  const [externalLink, setExternalLink] = useState('');
  const [externalLinkType, setExternalLinkType] = useState('image');

  const addExternalLink = () => {
    if (!externalLink.trim()) return;

    setFormData({
      ...formData,
      media: [...formData.media, { type: externalLinkType, url: externalLink, source: 'link' }],
    });

    setExternalLink('');
    setMessage({ text: 'External link added!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 2000);
  };

  // Remove media item
  const removeMedia = (index) => {
    const newMedia = formData.media.filter((_, i) => i !== index);
    setFormData({ ...formData, media: newMedia });
  };

  // Set cover image
  const setCoverImage = (url) => {
    setFormData({ ...formData, coverImage: url });
    setMessage({ text: 'Cover image set!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 2000);
  };

  // Submit album
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter an album name');
      return;
    }

    // Set first image as cover if not set
    const albumData = {
      ...formData,
      coverImage: formData.coverImage || (formData.media[0]?.type === 'image' ? formData.media[0].url : ''),
    };

    let newAlbums;
    if (editingAlbum) {
      newAlbums = albums.map((a) => (a.id === editingAlbum ? { ...albumData, id: editingAlbum } : a));
    } else {
      newAlbums = [
        ...albums,
        {
          ...albumData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ];
    }

    setAlbums(newAlbums);
    saveToBackend(newAlbums);
    setShowForm(false);
    setEditingAlbum(null);
    setFormData({ name: '', description: '', coverImage: '', media: [] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gallery Manager</h2>
          <p className="text-gray-600 mt-1">Create albums with images and videos</p>
          {saving && <span className="text-sm text-blue-600 animate-pulse">Saving...</span>}
          {message.text && (
            <span className={`block mt-2 text-sm ${
              message.type === 'success' ? 'text-green-600' :
              message.type === 'error' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {message.text}
            </span>
          )}
        </div>
        <button
          onClick={handleAddAlbum}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          + Create Album
        </button>
      </div>

      {/* Album Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-orange-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {editingAlbum ? 'Edit Album' : 'Create New Album'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Album Name & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Album Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="E.g., Diwali Celebration 2026"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Optional description"
                />
              </div>
            </div>

            {/* Upload Section */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Add Media</h4>

              {/* Option 1: Bulk Upload */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">📁 Bulk Upload (images & videos)</p>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => handleBulkFilesSelect(e.target.files)}
                    disabled={bulkUploading}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={uploadBulkFiles}
                    disabled={bulkFiles.length === 0 || bulkUploading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    {bulkUploading ? `Uploading ${uploadProgress}%` : `Upload ${bulkFiles.length} files`}
                  </button>
                </div>
                {bulkFiles.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {bulkFiles.map(f => f.name).join(', ')}
                  </p>
                )}
              </div>

              {/* Option 2: Google Drive Link */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">🔗 Google Drive Link</p>
                <div className="flex items-center gap-4">
                  <select
                    value={driveLinkType}
                    onChange={(e) => setDriveLinkType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <input
                    type="text"
                    value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="Paste Google Drive share link"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addDriveLink}
                    disabled={!driveLink.trim()}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Option 4: External URL */}
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">🌐 External URL (image/video link)</p>
                <div className="flex items-center gap-4">
                  <select
                    value={externalLinkType}
                    onChange={(e) => setExternalLinkType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                  <input
                    type="text"
                    value={externalLink}
                    onChange={(e) => setExternalLink(e.target.value)}
                    placeholder="https://example.com/image.jpg or YouTube link"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addExternalLink}
                    disabled={!externalLink.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Media Preview */}
            {formData.media.length > 0 && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  Media ({formData.media.length} items)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {formData.media.map((item, index) => (
                    <div key={index} className="relative group">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={`Media ${index + 1}`}
                          className={`w-full h-24 object-cover rounded-lg border-2 ${
                            formData.coverImage === item.url ? 'border-orange-500' : 'border-gray-300'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-300">
                          <span className="text-white text-2xl">🎬</span>
                        </div>
                      )}
                      
                      {/* Source badge */}
                      <span className={`absolute top-1 left-1 text-xs px-1 rounded ${
                        item.source === 'upload' ? 'bg-blue-500 text-white' :
                        item.source === 'drive' ? 'bg-green-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {item.source === 'upload' ? '📤' : item.source === 'drive' ? '🔗' : '🌐'}
                      </span>

                      {/* Actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
                        {item.type === 'image' && (
                          <button
                            type="button"
                            onClick={() => setCoverImage(item.url)}
                            className="bg-orange-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                {editingAlbum ? 'Update Album' : 'Create Album'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAlbum(null);
                  setFormData({ name: '', description: '', coverImage: '', media: [] });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Albums List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div key={album.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {album.coverImage ? (
              <img
                src={album.coverImage}
                alt={album.name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">🖼️</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{album.name}</h3>
              {album.description && (
                <p className="text-gray-600 text-sm mb-2">{album.description}</p>
              )}
              <p className="text-gray-500 text-sm mb-4">
                {album.media?.length || 0} items ({album.media?.filter(m => m.type === 'image').length || 0} images, {album.media?.filter(m => m.type === 'video').length || 0} videos)
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEditAlbum(album)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAlbum(album.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {albums.length === 0 && !showForm && (
        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-600 text-lg">No albums yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Create Album" to get started</p>
        </div>
      )}
    </div>
  );
}

export default AdminGallery;

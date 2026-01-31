import { useState, useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { API_URL } from '../../constants/api';

function AdminImages() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [copiedPath, setCopiedPath] = useState(null);
  const { getAuthHeaders } = useAdmin();

  // Load uploaded images from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('uploadedImages');
    if (saved) {
      try {
        setUploadedImages(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved images:', error);
      }
    }
  }, []);

  const handleFileSelect = async (file) => {
    if (!file) return;
    
    setUploading(true);
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
        const imagePath = data.imagePath || data.path;
        const newImage = {
          id: Date.now(),
          path: imagePath,
          fileName: file.name,
          uploadedAt: new Date().toLocaleString(),
        };
        
        const updatedImages = [...uploadedImages, newImage];
        setUploadedImages(updatedImages);
        
        // Save to localStorage for persistence
        localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
        
        setMessage({ text: 'Image uploaded successfully!', type: 'success' });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } else {
        setMessage({ text: 'Failed to upload image', type: 'error' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ text: 'Error uploading image', type: 'error' });
    }

    setUploading(false);
  };

  const copyToClipboard = (path) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const deleteImage = (id) => {
    if (confirm('Are you sure you want to remove this image from the list?')) {
      const updatedImages = uploadedImages.filter((img) => img.id !== id);
      setUploadedImages(updatedImages);
      localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
      setMessage({ text: 'Image removed from list', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Image Manager</h2>
          <p className="text-gray-600 mt-1">Upload and manage images for your content</p>
          {message.text && (
            <span
              className={`inline-block mt-3 text-sm ${
                message.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message.text}
            </span>
          )}
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-orange-300">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Upload New Image</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Select Image from Device
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files[0])}
                disabled={uploading}
                className="flex-1 px-4 py-3 border border-dashed border-orange-400 rounded-lg focus:outline-none focus:border-orange-600 disabled:bg-gray-100 cursor-pointer"
              />
              {uploading && (
                <span className="text-sm text-blue-600 animate-pulse font-semibold">
                  Uploading...
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported formats: JPG, PNG, GIF, WebP (Max 50MB). Upload and see them appear below!
            </p>
          </div>
        </div>
      </div>

      {/* Images Gallery */}
      {uploadedImages.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Uploaded Images</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedImages.map((image) => (
              <div key={image.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-300 hover:shadow-lg transition">
                {/* Image Preview */}
                <div className="h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
                  <img
                    src={image.path}
                    alt="Uploaded"
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-3">Uploaded: {image.uploadedAt}</p>

                  {/* Image Path */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Image Path
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={image.path}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs bg-gray-100"
                      />
                      <button
                        onClick={() => copyToClipboard(image.path)}
                        className={`px-3 py-2 rounded-lg font-semibold text-sm transition ${
                          copiedPath === image.path
                            ? 'bg-green-600 text-white'
                            : 'bg-orange-600 hover:bg-orange-700 text-white'
                        }`}
                      >
                        {copiedPath === image.path ? '✓ Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteImage(image.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
                  >
                    Remove from List
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedImages.length === 0 && (
        <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-600 text-lg">No images uploaded yet</p>
          <p className="text-gray-500 text-sm mt-2">Upload images using the form above to get started</p>
        </div>
      )}
    </div>
  );
}

export default AdminImages;

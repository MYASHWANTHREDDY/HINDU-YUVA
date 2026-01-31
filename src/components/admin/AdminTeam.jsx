import { useState, useCallback, useEffect } from 'react';
import ImageCropper from './ImageCropper';
import { useAdmin } from '../../contexts/AdminContext';
import { API_URL } from '../../constants/api';

function AdminTeam() {
  const [team, setTeam] = useState([]);
  const { getAuthHeaders } = useAdmin();

  // Load team from backend on mount
  useEffect(() => {
    const loadTeam = async () => {
      try {
        const response = await fetch(`${API_URL}/api/team`);
        if (response.ok) {
          const data = await response.json();
          setTeam(data || []);
        }
      } catch (error) {
        console.error('Error loading team:', error);
      }
    };
    loadTeam();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    email: '',
    socials: {
      linkedin: '',
      instagram: '',
      twitter: '',
    },
  });
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Save to backend
  const saveToBackend = useCallback(async (teamToSave) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ team: teamToSave }),
      });
      
      if (response.ok) {
        setSaveMessage({ text: 'Team saved successfully!', type: 'success' });
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
      name: '',
      role: '',
      image: '',
      bio: '',
      email: '',
      socials: {
        linkedin: '',
        instagram: '',
        twitter: '',
      },
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

  const handleEdit = (member) => {
    const socials = member.socials || member.social || {};
    setFormData({
      name: member.name || '',
      role: member.role || '',
      image: member.image || '',
      bio: member.bio || '',
      email: member.email || '',
      socials: {
        linkedin: socials.linkedIn || socials.linkedin || '',
        instagram: socials.instagram || '',
        twitter: socials.twitter || '',
      },
    });
    setEditingId(member.id);
    setImagePreview(member.image || '');
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      const newTeam = team.filter((m) => m.id !== id);
      setTeam(newTeam);
      saveToBackend(newTeam);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const memberData = {
      name: formData.name,
      role: formData.role,
      image: formData.image,
      bio: formData.bio,
      email: formData.email,
      social: {
        instagram: formData.socials.instagram,
        linkedIn: formData.socials.linkedin,
        twitter: formData.socials.twitter,
      },
    };

    let updatedTeam;
    if (editingId) {
      // Update existing
      updatedTeam = team.map((m) => (m.id === editingId ? { ...memberData, id: editingId } : m));
    } else {
      // Add new
      updatedTeam = [
        ...team,
        {
          ...memberData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ];
    }

    setTeam(updatedTeam);
    saveToBackend(updatedTeam);
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Manage Team</h2>
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
          + Add Team Member
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-2 border-orange-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {editingId ? 'Edit Team Member' : 'Add New Team Member'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role/Position *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="E.g., President, Vice President"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Member Photo
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
                    <p className="text-xs text-gray-500 mb-2">Option 2: Use asset path (e.g., /assets/team/member.jpg)</p>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                      placeholder="/assets/team/your-image.jpg"
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
                  Bio/Description
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Brief bio..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.socials.linkedin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={formData.socials.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, instagram: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Twitter/X URL
                </label>
                <input
                  type="url"
                  value={formData.socials.twitter}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socials: { ...formData.socials, twitter: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                {editingId ? 'Update Member' : 'Add Member'}
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

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            {member.image && (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-orange-600 font-semibold mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

              {member.email && (
                <p className="text-gray-600 text-xs mb-3">
                  <strong>Email:</strong> {member.email}
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(member)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition text-sm"
                >
                  Remove
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

export default AdminTeam;

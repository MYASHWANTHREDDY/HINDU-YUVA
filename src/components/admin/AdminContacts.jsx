import { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { API_URL } from '../../constants/api';

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { getAuthHeaders } = useAdmin();

  const loadContacts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/admin/contact-submissions`, {
        headers: {
          ...getAuthHeaders(),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.submissions || []);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const deleteContact = async (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`${API_URL}/api/admin/contact-submissions/${id}`, {
          method: 'DELETE',
          headers: {
            ...getAuthHeaders(),
          },
        });

        if (response.ok) {
          const updated = contacts.filter((c) => c.id !== id);
          setContacts(updated);
        } else {
          alert('Failed to delete message');
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete message');
      }
    }
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Contact Messages</h2>
          <p className="text-gray-600 mt-1">View and manage messages from visitors</p>
        </div>
        <button
          onClick={loadContacts}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
        />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Loading messages...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-12 text-center">
          <p className="text-gray-600 text-lg">No contact messages yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer border-l-4 border-orange-500"
              onClick={() => setSelectedContact(selectedContact?.id === contact.id ? null : contact)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{contact.name}</h3>
                  <p className="text-orange-600 font-semibold">{contact.subject}</p>
                  <div className="flex gap-4 text-sm text-gray-600 mt-2">
                    <a
                      href={`mailto:${contact.email}`}
                      className="hover:text-orange-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      📧 {contact.email}
                    </a>
                    {contact.phone && (
                      <a
                        href={`tel:${contact.phone}`}
                        className="hover:text-orange-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        📱 {contact.phone}
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(contact.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteContact(contact.id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>

              {/* Expanded Message */}
              {selectedContact?.id === contact.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Message:</h4>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    <p>📍 IP Address: {contact.ipAddress}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminContacts;

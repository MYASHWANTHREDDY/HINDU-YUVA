import { useState, useEffect } from 'react';
import { API_URL } from '../constants/api';

function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', phone: '' });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [filterType, setFilterType] = useState('All'); // All, Upcoming, Past
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);
        if (response.ok) {
          const data = await response.json();
          const processedEvents = (data.events || []).map((event) => {
            const eventDate = new Date(event.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            return {
              ...event,
              type: eventDate >= today ? 'Upcoming' : 'Past',
            };
          });
          setEvents(processedEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  // Filter events based on selected type
  const filteredEvents =
    filterType === 'All' ? events : events.filter((event) => event.type === filterType);

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleRsvpChange = (e) => {
    setRsvpForm({ ...rsvpForm, [e.target.name]: e.target.value });
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setRsvpForm({ name: '', email: '', phone: '' });
      setModalOpen(false);
      setSelectedEvent(null);
    }, 2000);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="pt-[50px] px-10 min-h-screen bg-orange-50">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-2 text-center text-orange-700">Events & Activities</h1>
        <p className="text-center text-gray-600 mb-8">
          Join us for exciting cultural, educational, and service events!
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {['All', 'Upcoming', 'Past'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filterType === type
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50'
              }`}
            >
              {type === 'All' ? 'All Events' : type + ' Events'}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading events...</p>
          </div>
        ) : sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={event.image}
                alt={event.title}
                loading="lazy"
                className="w-full h-64 object-contain bg-gray-200"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-orange-700">{event.title}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                      event.type === 'Upcoming'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {event.type}
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">🕐</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">📍</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">👥</span>
                    <span>{event.attendees} interested</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{event.description}</p>

                <button
                  onClick={() => openEventModal(event)}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
                >
                  {event.type === 'Upcoming' ? 'RSVP Now' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {filterType === 'All' ? '' : filterType.toLowerCase()} events found.
            </p>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {modalOpen && selectedEvent && (
        <div
          className="fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-3xl font-bold bg-white rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-80 object-contain bg-gray-200"
            />

            <div className="p-8">
              <h2 className="text-4xl font-bold text-orange-700 mb-2">{selectedEvent.title}</h2>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${
                  selectedEvent.type === 'Upcoming'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {selectedEvent.type}
              </div>

              <div className="space-y-3 mb-6 text-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedEvent.date}</p>
                    <p className="text-sm">{selectedEvent.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <p className="font-semibold text-gray-900">{selectedEvent.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <p className="font-semibold text-gray-900">
                    Capacity: {selectedEvent.rsvpCapacity} people
                  </p>
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-xl font-bold text-orange-700 mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {selectedEvent.type === 'Upcoming' && (
                <div className="border-t pt-6">
                  <h3 className="text-xl font-bold text-orange-700 mb-4">RSVP</h3>

                  {rsvpSubmitted ? (
                    <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
                      <p className="text-green-800 font-semibold text-lg mb-2">✓ RSVP Confirmed!</p>
                      <p className="text-green-700">We'll see you at the event!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleRsvpSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={rsvpForm.name}
                          onChange={handleRsvpChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={rsvpForm.email}
                          onChange={handleRsvpChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={rsvpForm.phone}
                          onChange={handleRsvpChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition"
                      >
                        Confirm RSVP
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Events;

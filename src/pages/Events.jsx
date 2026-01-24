import { useState } from "react";
import diwaliPartyImg from "../assets/events/diwali_party.jpg";

function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", phone: "" });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [filterType, setFilterType] = useState("All"); // All, Upcoming, Past

  const events = [
    {
      id: 1,
      title: "Chapter Inauguration",
      date: "Jan 20, 2024",
      time: "5:00 PM - 8:00 PM",
      location: "Student Center, Room 201",
      image: "/assets/events/inauguration.jpg",
      description: "The official launch of Hindu YUVA at CSUF with cultural performances and guest speakers.",
      details: "Join us for the official inauguration of Hindu YUVA at California State University, Fullerton! This event will feature cultural performances, keynote speakers, and a networking opportunity to meet fellow community members.",
      attendees: 145,
      type: "Past"
    },
    {
      id: 2,
      title: "Holi Celebration",
      date: "Mar 15, 2024",
      time: "4:00 PM - 7:00 PM",
      location: "East Campus Lawn",
      image: "/assets/events/holi.jpg",
      description: "A vibrant Holi festival with colors, music, and traditional food.",
      details: "Celebrate the Festival of Colors with us! We will have colored powder, traditional music, delicious Indian food, and games. Come dressed in white and bring your friends!",
      attendees: 200,
      type: "Past"
    },
    {
      id: 3,
      title: "Diwali Night Celebration",
      date: "Nov 2, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Student Center, Main Hall",
      image: "/assets/events/holi.jpg",
      description: "Celebrate Diwali with lights, sweets, and cultural activities.",
      details: "Light up your life with us this Diwali! Expect beautiful rangoli designs, oil lamps, traditional sweets, cultural performances, and lots of celebrations. Dress in your finest traditional attire!",
      attendees: 180,
      type: "Upcoming"
    },
    {
      id: 4,
      title: "Community Service Day",
      date: "Oct 19, 2025",
      time: "9:00 AM - 1:00 PM",
      location: "Local Food Bank, Downtown",
      image: diwaliPartyImg,
      description: "Join us for a community service event supporting local charities.",
      details: "Be part of our service initiative! We will be volunteering at the local food bank to help pack and distribute food to families in need. Wear comfortable clothes and bring your enthusiasm!",
      attendees: 50,
      type: "Upcoming"
    },
    {
      id: 5,
      title: "Cultural Workshop: Classical Dance",
      date: "Feb 14, 2025",
      time: "3:00 PM - 5:00 PM",
      location: "Performing Arts Building, Studio A",
      image: "/assets/events/holi.jpg",
      description: "Learn the basics of Bharatanatyam classical dance with experienced instructors.",
      details: "Discover the grace and beauty of Bharatanatyam, one of India's classical dance forms. No prior experience needed! We will teach you basic steps, mudras, and the cultural significance of this ancient art form.",
      attendees: 35,
      type: "Upcoming"
    }
  ];

  // Filter events based on selected type
  const filteredEvents = filterType === "All" 
    ? events 
    : events.filter(event => event.type === filterType);

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
      setRsvpForm({ name: "", email: "", phone: "" });
      setModalOpen(false);
      setSelectedEvent(null);
    }, 2000);
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="pt-[200px] p-10 min-h-screen bg-orange-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center text-orange-700">Events & Activities</h1>
        <p className="text-center text-gray-600 mb-8">Join us for exciting cultural, educational, and service events!</p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {["All", "Upcoming", "Past"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filterType === type
                  ? "bg-orange-600 text-white"
                  : "bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50"
              }`}
            >
              {type === "All" ? "All Events" : type + " Events"}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover bg-gray-200"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-2xl font-bold text-orange-700">{event.title}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                      event.type === "Upcoming"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
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
                  {event.type === "Upcoming" ? "RSVP Now" : "View Details"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No {filterType === "All" ? "" : filterType.toLowerCase()} events found.</p>
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
              className="w-full h-64 object-cover bg-gray-200"
            />

            <div className="p-8">
              <h2 className="text-4xl font-bold text-orange-700 mb-2">
                {selectedEvent.title}
              </h2>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-6 ${
                  selectedEvent.type === "Upcoming"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-700"
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
                  <p className="font-semibold text-gray-900">{selectedEvent.attendees} people interested</p>
                </div>
              </div>

              <div className="border-t pt-6 mb-6">
                <h3 className="text-xl font-bold text-orange-700 mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed">{selectedEvent.details}</p>
              </div>

              {selectedEvent.type === "Upcoming" && (
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

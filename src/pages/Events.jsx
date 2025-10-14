import { useState } from "react";
import diwaliPartyImg from "../assets/events/diwali_party.jpg";

function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");

  const events = [
    {
      title: "Chapter Inauguration",
      date: "Jan 20, 2024",
      image: "/assets/events/inauguration.jpg",
      description: "The official launch of Hindu YUVA at CSUF with cultural performances and guest speakers.",
      type: "Past"
    },
    {
      title: "Holi Celebration",
      date: "Mar 15, 2024",
      image: "/assets/events/holi.jpg",
      description: "A vibrant Holi festival with colors, music, and traditional food.",
      type: "Past"
    },
    {
      title: "Diwali Night",
      date: "Nov 2, 2024",
      image: "/assets/events/holi.jpg",
      description: "Celebrate Diwali with lights, sweets, and cultural activities.",
      type: "Upcoming"
    },
    {
      title: "Diwali Party",
      date: "Oct 19, 2025",
      image: diwaliPartyImg,
      description: "Join us for a community service event supporting local charities.",
      type: "Upcoming"
    }
  ];

  // Sort events by date descending (latest first)
  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="pt-[20vh] p-10 min-h-screen bg-orange-50">
      <h1 className="text-4xl font-bold mb-10 text-center">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedEvents.map((event, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row cursor-pointer group" onClick={e => {
            // Prevent modal if button is clicked
            if (e.target.tagName.toLowerCase() === 'button') return;
            setModalImg(event.image); setModalOpen(true);
          }}>
            <img src={event.image} alt={event.title} className="w-full md:w-1/3 h-64 object-contain bg-white rounded-xl" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.date} <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${event.type === 'Upcoming' ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-700'}`}>{event.type}</span></p>
                <p className="text-gray-700 mb-4">{event.description}</p>
              </div>
              <button className="mt-2 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition cursor-pointer" onClick={e => e.stopPropagation()}>{event.type === 'Upcoming' ? 'Register' : 'View Photos'}</button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="fixed left-0 right-0 bottom-0 top-[200px] bg-orange-50 bg-opacity-90 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-lg p-10 max-w-3xl w-full flex flex-col md:flex-row items-center relative" onClick={e => e.stopPropagation()}>
            <img src={modalImg} alt="Event" className="w-full md:w-1/2 max-h-[60vh] rounded-xl object-contain mb-6 md:mb-0 md:mr-8" />
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-orange-700 mb-4">{sortedEvents.find(e => e.image === modalImg)?.title}</h2>
              <span className="text-sm text-gray-500 font-medium mb-2 block">{sortedEvents.find(e => e.image === modalImg)?.date}</span>
              <p className="text-gray-700 mb-4">{sortedEvents.find(e => e.image === modalImg)?.description}</p>
              <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-2xl font-bold" onClick={() => setModalOpen(false)}>&times;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Events;

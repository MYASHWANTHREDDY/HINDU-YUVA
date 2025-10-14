import { useState } from "react";
import diwaliParty from "../assets/events/diwali_party.jpg";

function Gallery() {
  const events = [
    {
      name: "Chapter Inauguration",
      images: [diwaliParty, diwaliParty, diwaliParty]
    },
    {
      name: "Holi Celebration",
      images: [diwaliParty, diwaliParty, diwaliParty]
    },
    {
      name: "Diwali Night",
      images: [diwaliParty, diwaliParty, diwaliParty]
    },
    {
      name: "Service Project",
      images: [diwaliParty, diwaliParty, diwaliParty]
    },
    {
      name: "Yoga Workshop",
      images: [diwaliParty, diwaliParty, diwaliParty]
    },
    {
      name: "Cultural Fest",
      images: [diwaliParty, diwaliParty, diwaliParty]
    }
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="pt-[20vh] p-10 min-h-screen bg-orange-50">
      <h1 className="text-4xl font-bold mb-10 text-center">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center cursor-pointer" onClick={() => { setSelectedEvent(event); setModalOpen(true); }}>
            <img src={event.images[0]} alt={event.name} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h2 className="text-xl font-semibold text-orange-700 mb-2 text-center">{event.name}</h2>
            <span className="text-gray-500 text-sm">{event.images.length} photos</span>
          </div>
        ))}
      </div>
      {modalOpen && selectedEvent && (
        <div className="fixed left-0 right-0 bottom-0 top-[200px] bg-orange-50 bg-opacity-90 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-lg p-10 max-w-4xl w-full relative flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-2xl font-bold" onClick={() => setModalOpen(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-orange-700 mb-6">{selectedEvent.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedEvent.images.map((img, i) => (
                <img key={i} src={img} alt={selectedEvent.name + ' ' + (i+1)} className="w-full h-64 object-contain rounded-xl shadow cursor-pointer" onClick={() => { setSelectedImage(img); setImageModalOpen(true); }} />
              ))}
            </div>
          </div>
        </div>
      )}
      {imageModalOpen && selectedImage && (
        <div className="fixed left-0 right-0 bottom-0 top-[200px] bg-orange-50 bg-opacity-90 flex items-center justify-center z-50" onClick={() => setImageModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl w-full relative flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <a href={selectedImage} download className="absolute top-4 right-16 text-gray-500 hover:text-orange-600 text-2xl font-bold" title="Download">
              &#8681;
            </a>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-2xl font-bold" onClick={() => setImageModalOpen(false)}>&times;</button>
            <img src={selectedImage} alt="Gallery" className="w-full h-[60vh] object-contain rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
export default Gallery;

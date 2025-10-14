import { useState } from "react";

function News() {
  const [news] = useState([
    {
      title: "Hindu YUVA Chapter Launched at CSUF",
      date: "Jan 20, 2024",
      image: null,
      description: "We are excited to announce the official launch of Hindu YUVA at California State University, Fullerton!",
      details: "The launch event included cultural performances, guest speakers, and a meet-and-greet session. Over 100 students attended.",
    },
    {
      title: "Diwali Night Announced",
      date: "Oct 1, 2024",
      image: null,
      description: "Join us for a grand Diwali celebration with cultural performances, food, and festivities.",
      details: "Diwali Night will feature traditional dances, music, and a variety of Indian cuisine. All students are welcome!",
    },
    {
      title: "Service Project Success",
      date: "Dec 12, 2024",
      image: null,
      description: "Our recent service project was a huge success, thanks to all the volunteers who participated!",
      details: "We collected and donated over 200 items to local charities. Thank you to everyone who contributed.",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  return (
  <div className="pt-[200px] p-10 min-h-screen bg-orange-50">
      <h1 className="text-4xl font-bold text-orange-600 mb-10 text-center">News & Announcements</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-8 md:px-20">
        {news.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-4 h-120 w-120 flex flex-col cursor-pointer"
            onClick={() => { setModalItem(item); setModalOpen(true); }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">{item.date}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-orange-700">{item.title}</h2>
            <p className="text-gray-700 mb-4 flex-1">{item.description}</p>
            {item.image && (
              <img src={item.image} alt={item.title} className="w-full h-40 object-contain rounded mt-2" />
            )}
          </div>
        ))}
      </div>
      {modalOpen && modalItem && (
        <div className="fixed left-0 right-0 bottom-0 top-[200px] bg-orange-50 bg-opacity-90 flex items-center justify-center z-50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-lg p-10 max-w-xl w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-2xl font-bold" onClick={() => setModalOpen(false)}>&times;</button>
            <h2 className="text-3xl font-bold text-orange-700 mb-4">{modalItem.title}</h2>
            <span className="text-sm text-gray-500 font-medium mb-2 block">{modalItem.date}</span>
            <p className="text-gray-700 mb-4">{modalItem.description}</p>
            {modalItem.image && (
              <img src={modalItem.image} alt={modalItem.title} className="w-full h-60 object-contain rounded mb-4" />
            )}
            <p className="text-gray-800 text-lg">{modalItem.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;

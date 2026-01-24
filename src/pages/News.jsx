import { useState } from "react";

function News() {
  const [news] = useState([
    {
      id: 1,
      title: "Hindu YUVA Chapter Launched at CSUF",
      date: "Jan 20, 2024",
      timestamp: new Date("2024-01-20"),
      author: "Dev Vyas",
      category: "Announcement",
      image: null,
      description: "We are excited to announce the official launch of Hindu YUVA at California State University, Fullerton!",
      details: "The launch event included cultural performances, guest speakers, and a meet-and-greet session. Over 100 students attended. This marks the beginning of an exciting journey to build a strong and inclusive Hindu community on campus.",
    },
    {
      id: 2,
      title: "Diwali Night Announced",
      date: "Oct 1, 2024",
      timestamp: new Date("2024-10-01"),
      author: "Shalaka Sanap",
      category: "Event",
      image: null,
      description: "Join us for a grand Diwali celebration with cultural performances, food, and festivities.",
      details: "Diwali Night will feature traditional dances, music, and a variety of Indian cuisine. All students are welcome! We will be celebrating the festival of lights with our community. Expect a night filled with joy, laughter, and cultural enrichment.",
    },
    {
      id: 3,
      title: "Service Project Success",
      date: "Dec 12, 2024",
      timestamp: new Date("2024-12-12"),
      author: "Indrayani Bhoshle",
      category: "Service",
      image: null,
      description: "Our recent service project was a huge success, thanks to all the volunteers who participated!",
      details: "We collected and donated over 200 items to local charities. Thank you to everyone who contributed. This initiative embodied our core values of community service and compassion. We raised awareness about local needs while strengthening our bonds as a community.",
    },
    {
      id: 4,
      title: "New Leadership Team Announced",
      date: "Jan 10, 2025",
      timestamp: new Date("2025-01-10"),
      author: "Kanika Sood",
      category: "Announcement",
      image: null,
      description: "We are thrilled to announce our new leadership team for 2025!",
      details: "The new team brings fresh energy and innovative ideas to Hindu YUVA. We are confident that they will lead us to new heights. Congratulations to all the newly elected officers, and thank you to the outgoing team for their dedicated service.",
    },
    {
      id: 5,
      title: "Spring Semester Events Calendar Released",
      date: "Jan 18, 2025",
      timestamp: new Date("2025-01-18"),
      author: "Skanda",
      category: "Event",
      image: null,
      description: "Check out our exciting events planned for the spring semester!",
      details: "From cultural workshops to community service initiatives, we have something for everyone. Be sure to follow our social media for updates and registration details. We look forward to seeing you at our events!",
    },
  ]);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Announcement: "bg-blue-100 text-blue-800",
      Event: "bg-purple-100 text-purple-800",
      Service: "bg-green-100 text-green-800",
      Update: "bg-yellow-100 text-yellow-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  // Sort news by date (newest first)
  const sortedNews = [...news].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="pt-[200px] p-10 min-h-screen bg-orange-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-700 mb-2 text-center">News & Announcements</h1>
        <p className="text-center text-gray-600 mb-10">Stay updated with the latest news from Hindu YUVA at CSUF</p>

        <div className="space-y-6">
          {sortedNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-orange-500"
              onClick={() => { setModalItem(item); setModalOpen(true); }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{getTimeAgo(item.timestamp)}</span>
              </div>

              <h2 className="text-2xl font-bold text-orange-700 mb-3">{item.title}</h2>

              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-700">By {item.author}</span>
                <span>•</span>
                <span>{item.date}</span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

              {item.image && (
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4" />
              )}

              <button className="text-orange-700 font-semibold hover:text-orange-800 transition-colors">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {modalOpen && modalItem && (
        <div className="fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-orange-600 text-3xl font-bold" onClick={() => setModalOpen(false)}>&times;</button>

            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(modalItem.category)}`}>
                {modalItem.category}
              </span>
            </div>

            <h2 className="text-4xl font-bold text-orange-700 mb-4">{modalItem.title}</h2>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 border-b pb-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-700 font-bold">✓</span>
                <span className="font-semibold">By {modalItem.author}</span>
              </div>
              <span>•</span>
              <span>{modalItem.date}</span>
              <span>•</span>
              <span>{getTimeAgo(modalItem.timestamp)}</span>
            </div>

            {modalItem.image && (
              <img src={modalItem.image} alt={modalItem.title} className="w-full h-64 object-cover rounded-lg mb-6" />
            )}

            <div className="prose prose-lg">
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">{modalItem.description}</p>
              <p className="text-gray-800 text-lg leading-relaxed">{modalItem.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-orange-50 min-h-screen pt-[50px]">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-700 mb-3">Hindu YUVA at CSUF</h1>
        <p className="text-lg text-orange-600 mb-6">
          Connecting, Inspiring, and Empowering Hindu Youth
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          Hindu YUVA at California State University, Fullerton is dedicated to fostering a vibrant
          Hindu community, promoting cultural awareness, and empowering students through events,
          service, and leadership opportunities.
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-orange-100 rounded-3xl shadow p-8 text-center mb-12">
        <h2 className="text-xl font-bold text-orange-700 mb-2">Latest News</h2>
        <p className="text-gray-700">
          Check out the latest updates and announcements from Hindu YUVA at CSUF.
        </p>
        <Link
          to="/news"
          className="text-orange-700 font-bold no-underline mt-4 inline-block hover:text-orange-800 transition-colors duration-200"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default Home;

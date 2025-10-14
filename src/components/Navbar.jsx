import { Link } from "react-router-dom";
import HinduYuvaLogo from "../assets/HinduYuvaLogo.png";

function Navbar() {
  const linkClass =
    "text-center px-6 py-3 font-bold text-2xl text-black hover:text-orange-600 no-underline transition-colors duration-200";

  return (
    // 🟩 fixed height with shadow and white background
    <nav className="fixed top-0 left-0 w-full h-[200px] z-50 shadow-md bg-white">
      <div className="flex items-center justify-around h-full max-w-8xl mx-auto px-8 md:px-60 gap-x-8">
        
        {/* Left side links */}
        <Link to="/" className={linkClass}>Home</Link>

        <div className="relative group">
          <Link to="/about" className={`${linkClass} flex items-center gap-1`}>
            About <span className="inline-block">&#9660;</span>
          </Link>

          {/* Dropdown */}
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-52 bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 rounded-xl shadow-lg">
            <ul className="list-none p-0 m-0">
              <li>
                <Link to="/about?section=mission" className="block px-4 py-2 text-black font-semibold text-lg bg-orange-100 hover:bg-orange-200 no-underline whitespace-nowrap">Mission & Vision</Link>
              </li>
              <li>
                <Link to="/about?section=team" className="block px-4 py-2 text-black font-semibold text-lg bg-orange-100 hover:bg-orange-200 no-underline">Team</Link>
              </li>
              <li>
                <Link to="/about?section=timeline" className="block px-4 py-2 text-black font-semibold text-lg bg-orange-100 hover:bg-orange-200 no-underline">Timeline</Link>
              </li>
            </ul>
          </div>
        </div>

        <Link to="/events" className={linkClass}>Events</Link>

        {/* Center logo */}
        <Link to="/" className="flex items-center justify-center">
          <img
            src={HinduYuvaLogo}
            alt="Hindu YUVA Logo"
            className="w-[140px] h-[140px] object-contain"
          />
        </Link>

        {/* Right side links */}
        <Link to="/news" className={linkClass}>News</Link>
        <Link to="/gallery" className={linkClass}>Gallery</Link>
        <Link to="/join" className={linkClass}>Join Us</Link>
      </div>
    </nav>
  );
}

export default Navbar;

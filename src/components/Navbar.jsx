import { Link } from "react-router-dom";
import HinduYuvaLogo from "../assets/HinduYuvaLogo.png";

function Navbar() {
  const linkClass =
    "flex-1 text-center px-4 py-2 font-bold text-black hover:text-orange-600 no-underline transition-colors duration-200";

  return (
  <nav className="fixed top-0 left-0 w-full shadow bg-white z-50" style={{ height: '20vh', background: '#fff' }}>
      <div className="flex items-center justify-center h-full max-w-6xl mx-auto px-4">
        <Link to="/" className={linkClass}>
          Home
        </Link>
        <Link to="/about" className={linkClass}>
          About
        </Link>
        <Link to="/events" className={linkClass}>
          Events
        </Link>
        <Link to="/" className="flex items-center justify-center px-4 py-2">
          <img
            src={HinduYuvaLogo}
            alt="Hindu YUVA Logo"
            style={{ width: '120px', height: '120px', objectFit: 'contain'}}
          />
        </Link>

        <Link to="/team" className={linkClass}>
          Team
        </Link>
        
        <Link to="/gallery" className={linkClass}>
          Gallery
        </Link>
        <Link to="/join" className={linkClass}>
          Join Us
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

import { NavLink } from "react-router-dom";
import HinduYuvaLogo from "../assets/HinduYuvaLogo.png";

function Navbar() {
  const linkClass =
    "text-center px-6 py-3 font-bold text-2xl text-black hover:text-orange-600 no-underline transition-colors duration-200";
  const activeClass = "border-b-4 border-orange-500 text-orange-700";

  return (
    <nav className="fixed top-0 left-0 w-full h-[200px] z-50 shadow-md bg-white">
      <div className="flex items-center justify-around h-full max-w-8xl mx-auto px-8 md:px-60 gap-x-8">
        <NavLink to="/" className={({ isActive }) => [linkClass, isActive && activeClass].filter(Boolean).join(' ')}>Home</NavLink>
        <div className="relative group">
          <NavLink to="/about" className={({ isActive }) => [linkClass, "flex items-center gap-1", isActive && activeClass].filter(Boolean).join(' ')}>
            About Us<span className="inline-block">&#9660;</span>
          </NavLink>
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-52 bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 rounded-xl shadow-lg">
            <ul className="list-none p-0 m-0">
              <li>
                <NavLink to="/about?section=mission" className={({ isActive }) => ["block px-4 py-2 text-black font-semibold text-lg bg-orange-50 hover:bg-orange-50 no-underline whitespace-nowrap", isActive && "bg-orange-100 text-black-700"].filter(Boolean).join(' ')}>Mission & Vision</NavLink>
              </li>
              <li>
                <NavLink to="/about?section=team" className={({ isActive }) => ["block px-4 py-2 text-black font-semibold text-lg bg-orange-50 hover:bg-orange-50 no-underline", isActive && "bg-orange-100 text-black-700"].filter(Boolean).join(' ')}>Team</NavLink>
              </li>
              <li>
                <NavLink to="/about?section=timeline" className={({ isActive }) => ["block px-4 py-2 text-black font-semibold text-lg bg-orange-50 hover:bg-orange-50 no-underline", isActive && "bg-orange-100 text-black-700"].filter(Boolean).join(' ')}>Timeline</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <NavLink to="/events" className={({ isActive }) => [linkClass, isActive && activeClass].filter(Boolean).join(' ')}>Events</NavLink>
        <NavLink to="/" className="flex items-center justify-center" aria-label="Home">
          <img src={HinduYuvaLogo} alt="Hindu YUVA Logo" className="w-[140px] h-[140px] object-contain" />
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => [linkClass, isActive && activeClass].filter(Boolean).join(' ')}>News</NavLink>
        <NavLink to="/gallery" className={({ isActive }) => [linkClass, isActive && activeClass].filter(Boolean).join(' ')}>Gallery</NavLink>
        <NavLink to="/join" className={({ isActive }) => [linkClass, isActive && activeClass].filter(Boolean).join(' ')}>Join Us</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;

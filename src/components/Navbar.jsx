import { NavLink } from "react-router-dom";
import { useState } from "react";
import HinduYuvaLogo from "../assets/HinduYuvaLogo.png";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass =
    "px-6 py-3 font-bold text-black dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 no-underline transition-colors duration-200";
  const activeClass = "border-b-4 border-orange-500 text-orange-700 dark:text-orange-400";
  const mobileLinkClass = "block px-4 py-3 font-semibold text-lg text-black hover:bg-orange-100 no-underline";
  const mobileActiveClass = "border-l-4 border-orange-500 bg-orange-50 text-orange-700";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-md bg-white dark:bg-gray-900 transition-colors">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-around h-[200px] max-w-8xl mx-auto px-8 gap-x-8">
        <NavLink to="/" className={({ isActive }) => [linkClass, "text-center text-2xl", isActive && activeClass].filter(Boolean).join(' ')}>
          Home
        </NavLink>
        <div className="relative group">
          <NavLink to="/about" className={({ isActive }) => [linkClass, "text-center text-2xl flex items-center gap-1", isActive && activeClass].filter(Boolean).join(' ')}>
            About Us<span className="inline-block">&#9660;</span>
          </NavLink>
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-52 bg-white dark:bg-gray-800 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 rounded-xl shadow-lg">
            <ul className="list-none p-0 m-0">
              <li>
                <NavLink to="/about?section=mission" className={({ isActive }) => ["block px-4 py-2 text-black dark:text-gray-100 font-semibold text-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-gray-600 no-underline whitespace-nowrap", isActive && "bg-orange-100 dark:bg-orange-600 text-orange-700 dark:text-orange-300"].filter(Boolean).join(' ')}>
                  Mission & Vision
                </NavLink>
              </li>
              <li>
                <NavLink to="/about?section=team" className={({ isActive }) => ["block px-4 py-2 text-black dark:text-gray-100 font-semibold text-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-gray-600 no-underline", isActive && "bg-orange-100 dark:bg-orange-600 text-orange-700 dark:text-orange-300"].filter(Boolean).join(' ')}>
                  Team
                </NavLink>
              </li>
              <li>
                <NavLink to="/about?section=timeline" className={({ isActive }) => ["block px-4 py-2 text-black dark:text-gray-100 font-semibold text-lg bg-orange-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-gray-600 no-underline", isActive && "bg-orange-100 dark:bg-orange-600 text-orange-700 dark:text-orange-300"].filter(Boolean).join(' ')}>
                  Timeline
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <NavLink to="/events" className={({ isActive }) => [linkClass, "text-center text-2xl", isActive && activeClass].filter(Boolean).join(' ')}>
          Events
        </NavLink>
        <NavLink to="/" className="flex items-center justify-center" aria-label="Home">
          <img src={HinduYuvaLogo} alt="Hindu YUVA Logo" className="w-[140px] h-[140px] object-contain" />
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => [linkClass, "text-center text-2xl", isActive && activeClass].filter(Boolean).join(' ')}>
          News
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => [linkClass, "text-center text-2xl", isActive && activeClass].filter(Boolean).join(' ')}>
          Gallery
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => [linkClass, "text-center text-2xl", isActive && activeClass].filter(Boolean).join(' ')}>
          Contact
        </NavLink>
        <NavLink to="/join" className={({ isActive }) => [linkClass, "text-center text-2xl", isActive && activeClass].filter(Boolean).join(' ')}>
          Join Us
        </NavLink>
        <ThemeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between h-20 px-4 bg-white dark:bg-gray-900 transition-colors">
        <NavLink to="/" className="flex items-center justify-center" aria-label="Home">
          <img src={HinduYuvaLogo} alt="Hindu YUVA Logo" className="w-16 h-16 object-contain" />
        </NavLink>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-500 transition"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 border-gray-200 shadow-lg transition-colors">
          <div className="flex flex-col">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => [mobileLinkClass, isActive && mobileActiveClass].filter(Boolean).join(' ')}
            >
              Home
            </NavLink>

            {/* About Submenu */}
            <div className="border-t border-gray-100">
              <details className="group">
                <summary className="px-4 py-3 font-semibold text-lg text-black hover:bg-orange-100 cursor-pointer flex items-center justify-between">
                  About Us <span className="text-xl">▼</span>
                </summary>
                <div className="bg-orange-50 border-l-4 border-orange-500">
                  <NavLink
                    to="/about?section=mission"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-8 py-2 text-gray-700 hover:text-orange-700 font-semibold no-underline"
                  >
                    Mission & Vision
                  </NavLink>
                  <NavLink
                    to="/about?section=team"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-8 py-2 text-gray-700 hover:text-orange-700 font-semibold no-underline"
                  >
                    Team
                  </NavLink>
                  <NavLink
                    to="/about?section=timeline"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-8 py-2 text-gray-700 hover:text-orange-700 font-semibold no-underline"
                  >
                    Timeline
                  </NavLink>
                </div>
              </details>
            </div>

            <NavLink
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => [mobileLinkClass, isActive && mobileActiveClass].filter(Boolean).join(' ')}
            >
              Events
            </NavLink>

            <NavLink
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => [mobileLinkClass, isActive && mobileActiveClass].filter(Boolean).join(' ')}
            >
              News
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => [mobileLinkClass, isActive && mobileActiveClass].filter(Boolean).join(' ')}
            >
              Gallery
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => [mobileLinkClass, isActive && mobileActiveClass].filter(Boolean).join(' ')}
            >
              Contact
            </NavLink>

            <NavLink
              to="/join"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => [mobileLinkClass, isActive && mobileActiveClass].filter(Boolean).join(' ')}
            >
              Join Us
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

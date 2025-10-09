import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-orange-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Hindu YUVA</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/events">Events</Link>
        <Link to="/team">Team</Link>
        <Link to="/join">Join</Link>
        <Link to="/gallery">Gallery</Link>
      </div>
    </nav>
  );
}
export default Navbar;

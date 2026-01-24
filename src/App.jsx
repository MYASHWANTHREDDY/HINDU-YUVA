/**
 * Main Application Component
 * 
 * Root component that sets up routing, global layout, and error boundaries.
 * Wrapped by ThemeProvider in main.jsx for dark mode support.
 * 
 * @module App
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Join from './pages/Join';
import News from './pages/News';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * App Component
 * 
 * Provides the main application structure with:
 * - React Router for navigation
 * - Error boundary for graceful error handling
 * - Responsive layout with Navbar, main content, and Footer
 * - Dark mode support via Tailwind CSS classes
 * 
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 transition-colors">
          <Navbar />
          <main className="flex-grow pt-[50px] bg-orange-50 dark:bg-gray-900 transition-colors">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/team" element={<Team />} />
              <Route path="/join" element={<Join />} />
              <Route path="/contact" element={<Contact />} />
              {/* 404 Not Found - catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
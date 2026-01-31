/**
 * Main Application Component
 *
 * Root component that sets up routing, global layout, and error boundaries.
 *
 * @module App
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ErrorBoundary } from './components/common';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Join from './pages/Join';
import News from './pages/News';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { AdminProvider } from './contexts/AdminContext';

/**
 * App Component
 *
 * Provides the main application structure with:
 * - React Router for navigation
 * - Error boundary for graceful error handling
 * - Responsive layout with Navbar, main content, and Footer
 *
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-white transition-colors">
            <Navbar />
            <main className="flex-grow pt-[200px] bg-orange-50 transition-colors">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/news" element={<News />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/team" element={<Team />} />
                <Route path="/join" element={<Join />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* 404 Not Found - catch all unmatched routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;

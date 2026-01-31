import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Main layout component wrapping Navbar, content, and Footer
 */
export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white transition-colors">
      <Navbar />
      <main className="flex-grow pt-[200px] bg-orange-50 transition-colors">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

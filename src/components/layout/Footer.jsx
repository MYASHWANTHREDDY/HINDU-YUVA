function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/hinduyuvacusf', icon: 'f' },
    { name: 'Instagram', url: 'https://www.instagram.com/hinduyuva_csuf/', icon: '📷' },
    { name: 'WhatsApp', url: 'https://wa.me/1234567890', icon: '💬' },
    { name: 'Email', url: 'mailto:info@hinduyuvacusf.com', icon: '✉️' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">Hindu YUVA at CSUF</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Connecting, inspiring, and empowering Hindu youth at California State University,
              Fullerton.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-orange-400 transition no-underline">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-orange-400 transition no-underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-gray-300 hover:text-orange-400 transition no-underline"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-gray-300 hover:text-orange-400 transition no-underline"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-orange-400 transition no-underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">
                <span className="font-semibold">Email:</span>
                <a
                  href="mailto:info@hinduyuvacusf.com"
                  className="text-orange-400 hover:text-orange-300 no-underline"
                >
                  {' '}
                  info@hinduyuvacusf.com
                </a>
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Phone:</span> (657) 278-XXXX
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Location:</span> CSUF, Fullerton, CA
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Meetings:</span> Fridays 5:00 PM
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">Follow Us</h3>
            <div className="flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-300 hover:text-orange-400 transition no-underline text-sm font-semibold"
                >
                  <span className="text-lg">{social.icon}</span>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © {currentYear} Hindu YUVA at CSUF. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition no-underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition no-underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

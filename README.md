# Hindu YUVA at CSUF - Official Website

A modern, responsive website for Hindu YUVA at California State University, Fullerton. Built with React, Vite, and Tailwind CSS.

## Features

✨ **Modern UI/UX**
- Responsive design for all devices
- Dark mode support with theme toggle
- Smooth animations and transitions
- Professional color scheme

📱 **Mobile First**
- Hamburger navigation menu on mobile
- Touch-friendly interface
- Optimized for all screen sizes

📰 **Content Management**
- Dynamic news/announcements feed
- Event management with RSVP system
- Gallery for photos
- Team member listings
- About page with mission & vision

🔍 **SEO & Analytics**
- Meta tags for search engines
- Open Graph tags for social sharing
- Google Analytics integration ready
- Structured metadata

♿ **Accessibility**
- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader friendly

🎯 **Additional Pages**
- Home - Landing page with mission statement
- About - Team info, mission, vision, timeline
- Events - Event listings with filtering and RSVP
- News - Blog-style announcements
- Gallery - Photo showcase
- Contact - Contact form & location info with Google Maps
- Join Us - Membership signup form (integrates with Google Sheets)

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **Forms:** Google Sheets integration (NoCodeAPI)
- **Analytics:** Google Analytics (ready to configure)

## Project Structure

```
src/
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
├── index.css              # Global styles
├── components/            # Reusable components
│   ├── Navbar.jsx         # Navigation bar
│   ├── Footer.jsx         # Footer with links
│   └── ThemeToggle.jsx    # Dark mode toggle
├── pages/                 # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Events.jsx
│   ├── News.jsx
│   ├── Gallery.jsx
│   ├── Team.jsx
│   ├── Contact.jsx
│   └── Join.jsx
├── contexts/              # React Context
│   └── ThemeContext.jsx   # Theme management
├── utils/                 # Utility functions
│   └── analytics.js       # Google Analytics helpers
└── assets/                # Images and logos
    ├── HinduYuvaLogo.png
    └── events/            # Event images
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hindu-yuva
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The website will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Google Analytics Setup

1. Update the Google Analytics ID in `index.html`:
   - Replace `G-XXXXXXXXXX` with your actual Measurement ID
   - Get it from [Google Analytics](https://analytics.google.com)

2. Use analytics helper functions in components:
```javascript
import { trackEventRegistration } from './utils/analytics';

// Track RSVP
trackEventRegistration('Event Name', 1);
```

### Google Sheets Integration (Join Form)

1. Update the NoCodeAPI endpoint in `src/pages/Join.jsx`
2. Create a Google Sheet with columns: Name, Email, Phone, Interests
3. Set up NoCodeAPI integration for seamless form submission

### Customize Content

Edit the following files to customize content:
- `src/pages/Home.jsx` - Landing page
- `src/pages/About.jsx` - Team and mission info
- `src/components/Footer.jsx` - Contact info and social links
- `src/pages/Contact.jsx` - Meeting details and FAQs

## Code Quality

- **Linting:** ESLint configured for React
- **Formatting:** Tailwind CSS best practices
- **Accessibility:** WCAG 2.1 AA standards
- **Performance:** Optimized with Vite

## Accessibility

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for detailed information on:
- Image alt text guidelines
- Dark mode implementation
- Performance optimization
- Testing recommendations
- WCAG compliance checklist

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically on push

### Deploy to Netlify

1. Run `npm run build`
2. Upload `dist` folder to [Netlify](https://netlify.com)

### Deploy to Traditional Hosting

1. Build the project: `npm run build`
2. Upload `dist` folder contents to your web host
3. Ensure server redirects all routes to `index.html` for SPA routing

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For questions or issues, please:
1. Check the [ACCESSIBILITY.md](./ACCESSIBILITY.md) guide
2. Review the code comments
3. Contact: info@hinduyuvacusf.com

## Future Enhancements

- [ ] Admin dashboard for content management
- [ ] User authentication system
- [ ] Event ticketing integration
- [ ] Photo upload for gallery
- [ ] Email notifications
- [ ] Member directory
- [ ] Blog/Article system
- [ ] Video integration
- [ ] Social media feed embedding
- [ ] Donation system

---

**Last Updated:** January 24, 2026
**Version:** 1.0.0


# Hindu YUVA at CSUF - Official Website

A modern, full-stack website for Hindu YUVA at California State University, Fullerton. Built with React, Vite, Tailwind CSS, and Express.js backend.

## 🚀 Features

### ✨ Modern UI/UX
- Responsive design for all devices
- Dark mode support with theme toggle
- Smooth animations and transitions
- Professional color scheme

### 📱 Mobile First
- Hamburger navigation menu on mobile
- Touch-friendly interface
- Optimized for all screen sizes

### 📰 Content Management
- Dynamic news/announcements feed
- Event management with RSVP system
- Gallery for photos and videos
- Team member listings
- **Admin dashboard for managing all content**

### 🔐 Security Features
- **JWT authentication** for admin access
- **Rate limiting** on form submissions (5/15min)
- **Input validation & sanitization**
- CORS protection
- Secure password handling

### 🔍 SEO & Analytics
- Meta tags for search engines
- Open Graph tags for social sharing
- Google Analytics integration ready
- Structured metadata

### ♿ Accessibility
- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Screen reader friendly

## 🛠 Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite 7** - Build Tool
- **Tailwind CSS 4** - Styling
- **React Router DOM 7** - Routing

### Backend
- **Express.js** - Server Framework
- **JWT** - Authentication
- **Multer** - File Uploads
- **express-rate-limit** - Rate Limiting
- **validator** - Input Sanitization

## 📁 Project Structure

```
hindu-yuva/
├── src/                    # Frontend source
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   ├── components/        # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── admin/         # Admin panel components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminEvents.jsx
│   │   │   ├── AdminNews.jsx
│   │   │   ├── AdminTeam.jsx
│   │   │   └── AdminGallery.jsx
│   │   └── ui/            # Reusable UI components
│   ├── pages/             # Page components
│   ├── contexts/          # React Context
│   │   ├── ThemeContext.jsx
│   │   └── AdminContext.jsx
│   └── constants/         # Configuration
│
├── server/                # Backend source
│   ├── server.js          # Express server
│   ├── data/              # JSON data files
│   │   ├── events.json
│   │   ├── news.json
│   │   ├── team.json
│   │   ├── gallery.json
│   │   ├── contact-submissions.json
│   │   └── join-submissions.json
│   └── uploads/           # Uploaded media files
│
├── public/                # Static assets
└── dist/                  # Production build
```

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hindu-yuva
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
cd ..
```

4. Set up environment variables

**Frontend (.env):**
```bash
VITE_API_URL=http://localhost:3001
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Optional
```

**Backend (server/.env):**
```bash
PORT=3001
ADMIN_PASSWORD=your-strong-password-here
JWT_SECRET=your-secret-key-minimum-32-characters
```

### Running Development Servers

**Start Backend Server:**
```bash
cd server
node server.js
```

**Start Frontend (in another terminal):**
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Admin Panel: http://localhost:5173/admin

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔑 Admin Panel

Access the admin dashboard at `/admin` to manage:
- **Events** - Create, edit, delete events
- **News** - Manage announcements
- **Team** - Update team members
- **Gallery** - Upload photos and videos
- **Contacts** - View and manage contact form submissions

### Admin Authentication
- Login with the password set in `server/.env`
- JWT tokens expire after 24 hours
- Rate limited to 5 login attempts per 15 minutes

## 📡 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/events` | Get all events |
| GET | `/api/news` | Get all news |
| GET | `/api/team` | Get team members |
| GET | `/api/gallery` | Get gallery items |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/join` | Submit membership form |
| POST | `/api/events/:id/rsvp` | RSVP for an event |

### Protected Admin Endpoints (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/verify` | Verify JWT token |
| GET | `/api/admin/contact-submissions` | Get contact submissions |
| DELETE | `/api/admin/contact-submissions/:id` | Delete submission |
| POST | `/api/admin/events` | Save events |
| POST | `/api/admin/news` | Save news |
| POST | `/api/admin/team` | Save team members |
| POST | `/api/admin/gallery` | Save gallery |
| POST | `/api/admin/upload` | Upload media files |

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

## 🚀 Deployment

### Frontend Deployment (Vercel - Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` = Your backend URL
   - `VITE_GA_MEASUREMENT_ID` = Your GA ID (optional)
4. Deploy automatically on push

### Backend Deployment (Railway - Recommended)

1. Push `server/` folder to Railway
2. Set environment variables:
   - `PORT` = (Railway auto-assigns)
   - `ADMIN_PASSWORD` = Strong password
   - `JWT_SECRET` = Random 64+ character string
   - `FRONTEND_URL` = Your Vercel URL
3. Deploy

### Alternative: Docker Deployment

```bash
cd server
docker build -t hindu-yuva-backend .
docker run -p 3001:3001 \
  -e ADMIN_PASSWORD=your-password \
  -e JWT_SECRET=your-secret \
  hindu-yuva-backend
```

### Deploy to Netlify (Frontend Only)

1. Run `npm run build`
2. Upload `dist` folder to [Netlify](https://netlify.com)

### Deploy to Traditional Hosting

1. Build the project: `npm run build`
2. Upload `dist` folder contents to your web host
3. Ensure server redirects all routes to `index.html` for SPA routing

## 🔒 Security

### Implemented Security Features

| Feature | Description |
|---------|-------------|
| JWT Authentication | Token-based admin authentication (24hr expiry) |
| Rate Limiting | 5 form submissions per 15 minutes |
| Login Rate Limiting | 5 login attempts per 15 minutes |
| API Rate Limiting | 100 requests per minute |
| Input Validation | Server-side validation with validator.js |
| CORS | Whitelist-based origin protection |
| XSS Protection | Input sanitization on all user input |

### Security Best Practices

1. **Always use strong passwords** in production
2. **Generate JWT secrets** with: `openssl rand -base64 64`
3. **Use HTTPS** in production
4. **Keep dependencies updated**: `npm audit fix`

## 🧪 Testing the API

```bash
# Health Check
curl http://localhost:3001/api/health

# Login
curl -X POST http://localhost:3001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "your-password"}'

# Access Protected Endpoint
curl http://localhost:3001/api/admin/contact-submissions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 💬 Support

For questions or issues, please:
1. Check the [ACCESSIBILITY.md](./ACCESSIBILITY.md) guide
2. Review the code comments
3. Contact: info@hinduyuvacusf.com

## ✅ Completed Features

- [x] Admin dashboard for content management
- [x] JWT authentication system
- [x] Event management with RSVP
- [x] Photo/video upload for gallery
- [x] Contact form with submissions management
- [x] Rate limiting for security
- [x] Input validation & sanitization

## 📋 Future Enhancements

- [ ] Email notifications for submissions
- [ ] Member directory with profiles
- [ ] Event ticketing integration
- [ ] Social media feed embedding
- [ ] Donation system integration
- [ ] Push notifications
- [ ] Multi-language support

---

**Last Updated:** January 30, 2026  
**Version:** 2.0.0


# Hindu YUVA Backend API Documentation

## Base URL
- **Development:** `http://localhost:3001`
- **Production:** `https://your-backend-url.railway.app`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected endpoints require a valid JWT token in the Authorization header.

### Getting a Token

```http
POST /api/admin/login
Content-Type: application/json

{
  "password": "your-admin-password"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400
}
```

### Using the Token

Include the token in the Authorization header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

## Public Endpoints

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Hindu YUVA backend is running!"
}
```

---

### Get Events

```http
GET /api/events
```

**Response:**
```json
{
  "events": [
    {
      "id": 1,
      "title": "Diwali Celebration",
      "date": "2026-11-01",
      "time": "6:00 PM - 10:00 PM",
      "location": "Student Center",
      "description": "Join us for Diwali!",
      "image": "/uploads/image.jpg",
      "rsvpCapacity": 200,
      "rsvpCount": 45,
      "category": "Cultural"
    }
  ]
}
```

---

### Get News

```http
GET /api/news
```

**Response:**
```json
{
  "news": [
    {
      "id": 1,
      "title": "Announcement Title",
      "date": "2026-01-15",
      "content": "Full content here...",
      "summary": "Brief summary",
      "image": "/uploads/news.jpg",
      "author": "Admin",
      "category": "Announcement"
    }
  ]
}
```

---

### Get Team Members

```http
GET /api/team
```

**Response:**
```json
{
  "team": [
    {
      "id": 1,
      "name": "John Doe",
      "position": "President",
      "major": "Computer Science",
      "year": "Senior",
      "image": "/uploads/team.jpg",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  ]
}
```

---

### Get Gallery

```http
GET /api/gallery
```

**Response:**
```json
{
  "gallery": [
    {
      "id": 1,
      "title": "Diwali 2025",
      "description": "Photos from our Diwali celebration",
      "date": "2025-11-01",
      "images": [
        {
          "id": "img1",
          "src": "/uploads/photo1.jpg",
          "alt": "Diwali celebration"
        }
      ]
    }
  ]
}
```

---

### Submit Contact Form

```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about membership",
  "message": "I'd like to know more about..."
}
```

**Rate Limit:** 5 requests per 15 minutes

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "submissionId": 1234567890
}
```

---

### Submit Join Form

```http
POST /api/join
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "555-1234",
  "major": "Business",
  "year": "Sophomore",
  "interests": ["Cultural Events", "Networking"],
  "message": "Looking forward to joining!"
}
```

**Rate Limit:** 5 requests per 15 minutes

**Response:**
```json
{
  "success": true,
  "message": "Welcome to Hindu YUVA! We'll be in touch soon."
}
```

---

### RSVP for Event

```http
POST /api/events/:id/rsvp
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully RSVPed for the event"
}
```

---

## Protected Admin Endpoints

All admin endpoints require JWT authentication.

### Verify Token

```http
GET /api/admin/verify
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Token is valid"
}
```

---

### Get Contact Submissions

```http
GET /api/admin/contact-submissions
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "submissions": [
    {
      "id": 1234567890,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Question",
      "message": "Content...",
      "submittedAt": "2026-01-15T10:30:00Z"
    }
  ]
}
```

---

### Delete Contact Submission

```http
DELETE /api/admin/contact-submissions/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Submission deleted successfully"
}
```

---

### Save Events

```http
POST /api/admin/events
Authorization: Bearer <token>
Content-Type: application/json

{
  "events": [
    {
      "id": 1,
      "title": "Event Title",
      "date": "2026-01-01",
      "time": "6:00 PM",
      "location": "Campus",
      "description": "Description",
      "image": "/uploads/event.jpg",
      "category": "Cultural"
    }
  ]
}
```

---

### Save News

```http
POST /api/admin/news
Authorization: Bearer <token>
Content-Type: application/json

{
  "news": [
    {
      "id": 1,
      "title": "News Title",
      "date": "2026-01-01",
      "content": "Full content",
      "summary": "Brief summary",
      "category": "Announcement"
    }
  ]
}
```

---

### Save Team

```http
POST /api/admin/team
Authorization: Bearer <token>
Content-Type: application/json

{
  "team": [
    {
      "id": 1,
      "name": "Member Name",
      "position": "President",
      "major": "CS",
      "year": "Senior"
    }
  ]
}
```

---

### Save Gallery

```http
POST /api/admin/gallery
Authorization: Bearer <token>
Content-Type: application/json

{
  "gallery": [
    {
      "id": 1,
      "title": "Album Title",
      "description": "Album description",
      "date": "2026-01-01",
      "images": []
    }
  ]
}
```

---

### Upload Media

```http
POST /api/admin/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
```

**Supported Types:**
- Images: JPEG, PNG, GIF, WebP
- Videos: MP4, WebM, QuickTime

**Max File Size:** 50MB

**Response:**
```json
{
  "success": true,
  "url": "/uploads/1234567890-filename.jpg"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Invalid or expired token"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": "Too many submissions. Please try again later."
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Internal server error message"
}
```

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| Form submissions (`/api/contact`, `/api/join`) | 5 requests per 15 minutes |
| Login attempts (`/api/admin/login`) | 5 attempts per 15 minutes |
| General API | 100 requests per minute |

---

## CORS

The API allows requests from:
- `http://localhost:5173`
- `http://localhost:5174`
- `http://localhost:3000`
- `https://hinduyuvacusf.org`
- `https://hinduyuva-csuf.vercel.app`
- Custom URL via `FRONTEND_URL` environment variable

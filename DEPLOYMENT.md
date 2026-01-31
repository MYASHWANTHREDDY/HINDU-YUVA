# Deployment Guide for Hindu YUVA Website

This guide walks you through deploying the Hindu YUVA website to production.

## Overview

- **Frontend:** Deploy to Vercel (free tier available)
- **Backend:** Deploy to Railway or Render (free/paid tiers)

---

## 1. Prepare for Deployment

### 1.1 Generate Secure Credentials

Before deploying, generate secure credentials:

```bash
# Generate JWT Secret (use this in production)
openssl rand -base64 64

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
```

### 1.2 Create Strong Admin Password

Requirements:
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example: `MyS3cur3P@ssw0rd!2026`

---

## 2. Deploy Backend to Railway

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### 2.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your repository
4. Select the `server` folder as root directory

### 2.3 Configure Environment Variables
In Railway dashboard, go to Variables and add:

| Variable | Value |
|----------|-------|
| `PORT` | `3001` (Railway may override) |
| `ADMIN_PASSWORD` | Your strong password |
| `JWT_SECRET` | Your 64+ character secret |
| `FRONTEND_URL` | `https://your-app.vercel.app` |

### 2.4 Deploy
- Railway automatically deploys on push
- Note your backend URL (e.g., `https://hindu-yuva-backend.railway.app`)

---

## 3. Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### 3.2 Import Project
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (project root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3.3 Configure Environment Variables
In Vercel dashboard, go to Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend.railway.app` |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` (optional) |

### 3.4 Deploy
- Click "Deploy"
- Note your frontend URL (e.g., `https://hindu-yuva.vercel.app`)

### 3.5 Update Backend CORS
Go back to Railway and update `FRONTEND_URL` with your Vercel URL.

---

## 4. Alternative: Deploy to Render

### 4.1 Backend on Render
1. Go to [render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your repository
4. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - Add environment variables (same as Railway)

### 4.2 Frontend on Render
1. Create a new "Static Site"
2. Connect your repository
3. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
   - Add environment variables

---

## 5. Custom Domain Setup

### 5.1 Vercel Custom Domain
1. Go to Project Settings → Domains
2. Add your domain (e.g., `hinduyuvacusf.org`)
3. Update DNS records as instructed
4. SSL is automatic

### 5.2 Railway Custom Domain
1. Go to Settings → Networking
2. Add custom domain
3. Update DNS records
4. SSL is automatic

---

## 6. Post-Deployment Checklist

- [ ] Test frontend loads correctly
- [ ] Test backend health endpoint (`/api/health`)
- [ ] Test admin login at `/admin`
- [ ] Test contact form submission
- [ ] Test join form submission
- [ ] Test admin content management
- [ ] Verify rate limiting works
- [ ] Check CORS is configured correctly
- [ ] Verify HTTPS is working
- [ ] Test on mobile devices

---

## 7. Monitoring & Maintenance

### 7.1 View Logs
- **Railway:** Dashboard → Deployments → Logs
- **Vercel:** Dashboard → Deployments → Functions

### 7.2 Update Deployment
Just push to your main branch - both Vercel and Railway auto-deploy.

### 7.3 Rollback
Both platforms keep deployment history for easy rollback.

---

## 8. Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend
- Check browser console for specific CORS error
- Verify the URL includes the protocol (`https://`)

### 401 Unauthorized
- JWT token may have expired (24 hour limit)
- Login again to get a new token

### 429 Too Many Requests
- Rate limiting is working
- Wait 15 minutes for form endpoints
- Wait 1 minute for general API endpoints

### File Upload Issues
- Check file size (max 50MB)
- Ensure correct MIME type (images/videos only)
- Check `uploads` directory exists with write permissions

---

## 9. Security Reminders

1. **Never commit** `.env` files with real credentials
2. **Rotate JWT secrets** periodically
3. **Change admin password** if compromised
4. **Keep dependencies updated** (`npm audit fix`)
5. **Monitor** for unusual activity
6. **Backup** data files regularly

---

## 10. File Storage Note

Currently, uploaded files are stored on the server filesystem. For production scale:

Consider using:
- AWS S3
- Cloudinary
- Vercel Blob Storage

This ensures files persist across deployments and scale better.

---

## Support

For deployment issues:
1. Check platform documentation
2. Review deployment logs
3. Open an issue on GitHub

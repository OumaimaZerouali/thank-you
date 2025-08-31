# Quick Start Deployment Guide

## 🚀 Fastest Way to Deploy (Recommended)

### Step 1: Prepare Your Email Service (5 minutes)

1. **Set up Gmail App Password**:
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an App Password: Account → Security → App passwords
   - Save the 16-character password

### Step 2: Deploy Backend to Railway (10 minutes)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy Email Server**:
   ```bash
   cd /path/to/your/thank-you
   railway init
   railway up
   ```

3. **Set Environment Variables** in Railway dashboard:
   ```
   NODE_ENV=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   FROM_EMAIL=noreply@yourdomain.com
   ```

4. **Get Railway URL**: Copy the URL (e.g., `https://thank-you-cards-api.up.railway.app`)

### Step 3: Deploy Frontend to Vercel (5 minutes)

1. **Update production environment**:
   - Edit `environments/environment.production.ts`
   - Replace `https://thank-you-cards-api.up.railway.app/api` with your Railway URL

2. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **Update CORS**: Add your Vercel URL to email-server.js CORS settings

### Step 4: Configure Domain (Optional - 30 minutes)

1. **Purchase domain** (e.g., thankyoucards.com)
2. **Add custom domain** in Vercel dashboard
3. **Update environment variables** with your domain

## 🎯 Total Time: ~20 minutes + domain setup

## 💰 Cost Breakdown:
- Railway: $5/month (or free tier initially)
- Vercel: Free for personal projects
- Domain: ~$12/year (optional)
- **Total: $5/month or FREE initially**

---

## ⚡ Alternative: One-Click DigitalOcean Deploy

Use the `deploy/digitalocean-app.yaml` file for single-command deployment:

1. Fork your repo to GitHub
2. Connect to DigitalOcean App Platform
3. Use the yaml file for automatic configuration
4. Cost: ~$12/month for both frontend + backend

---

## 🔧 Pre-Deployment Checklist

- [ ] Gmail App Password created
- [ ] Firebase project is active
- [ ] Environment variables configured
- [ ] CORS domains updated
- [ ] Rate limiting configured (included)
- [ ] SSL certificates (automatic with hosting providers)

---

## 📝 Post-Deployment

1. **Test the application**: Send a test thank you card
2. **Monitor logs**: Check Railway/Vercel dashboards
3. **Set up monitoring**: Use built-in analytics
4. **Custom domain**: Point DNS to hosting providers

Your app will be live and ready to send beautiful thank you cards!

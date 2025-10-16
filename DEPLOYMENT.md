# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub account
- Vercel account (free)

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Restructured for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Follow the prompts and your app will be deployed!**

## Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start backend server:**

   ```bash
   npm run dev:server
   ```

3. **Start frontend (new terminal):**
   ```bash
   npm start
   ```

## Environment Variables

For production, you may want to set:

- `NODE_ENV=production` (automatically set by Vercel)

## Troubleshooting

### Socket.IO Connection Issues

- Make sure the `vercel.json` configuration is correct
- Check browser console for connection errors
- Verify the Socket.IO path configuration

### Build Errors

- Run `npm run build` locally to test
- Check for any missing dependencies
- Ensure all imports are correct

### Performance

- Documents are stored in memory (resets on deployment)
- Consider adding Redis for persistent storage in production
- Monitor Vercel function execution time (30s limit)

# Collaborative Text Editor

A real-time collaborative text editor built with React and Socket.IO. Share documents via URL and edit together in real-time.

## Features

- **Real-time collaboration**: Multiple users can edit the same document simultaneously
- **Link sharing**: Share documents by simply sharing the URL
- **Mobile responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **No database required**: Uses in-memory storage for simplicity
- **Rich text editing**: Powered by Quill.js with essential formatting tools

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local server (in one terminal):**
   ```bash
   npm run dev:server
   ```

3. **Start the React app (in another terminal):**
   ```bash
   npm start
   ```

4. **Open your browser:**
   - Go to `http://localhost:3000`
   - You'll be automatically redirected to a new document
   - Share the URL with others to collaborate in real-time

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Your app will be live at the provided URL!**

## How it works

- Each document has a unique URL (e.g., `/documents/abc-123`)
- Changes are synchronized in real-time using WebSockets
- Documents are stored in memory (data is lost when server restarts)
- Mobile-optimized interface with responsive design

## Mobile Features

- Touch-friendly toolbar
- Optimized layout for small screens
- Responsive text editor
- Connection status indicator

## Deployment

This project is configured for easy deployment on Vercel:

- **Frontend**: React app builds to static files
- **Backend**: Socket.IO runs as serverless functions
- **Real-time**: WebSocket connections work seamlessly on Vercel
- **Zero config**: Just run `vercel` to deploy

### Important Notes for Production

- Documents are stored in memory and will reset on each deployment
- For persistent storage, consider integrating a database like Redis or MongoDB
- The serverless functions have a 30-second timeout limit

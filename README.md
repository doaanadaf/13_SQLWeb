# 13_SQLWeb

MVC Web App with SQLite, Session Authentication, and YouTube Favorites.

## Features
- Register / Login / Logout (Session-based)
- Protected routes (requireAuth middleware)
- YouTube search page (/videos)
- Add/Remove favorites per user (saved in SQLite)

## Tech Stack
- Node.js + Express
- EJS templates
- SQLite
- express-session

## Project Structure (MVC)
- controllers/
- services/
- repositories/
- routes/
- views/
- config/

## Run Locally
```bash
npm install
npm run dev

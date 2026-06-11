#WSA
#SmartAuto Reply

SmartAuto Reply is an AI-powered customer automation web app with a backend API and a React frontend. It supports AI auto replies, bulk messaging, templates, subscription plans, analytics, and settings.

## Repository structure

- `backend/` - Node.js + Express API
- `frontend/` - React + Vite frontend
- `render.yaml` - Render deployment manifest
- `frontend/sample-contacts.csv` - sample contact file for bulk messaging

## Key files

- `backend/server.js` - main backend server entry point
- `backend/config/db.js` - MongoDB connection setup
- `backend/.env.example` - backend required environment variables
- `frontend/src/api.js` - frontend API client and base URL
- `frontend/.env.example` - frontend environment example
- `frontend/package.json` - frontend build and dependency config
- `backend/package.json` - backend scripts and dependencies

## Requirements

- Node.js 18.x (recommended for frontend compatibility)
- npm
- MongoDB connection
- OpenAI API key
- Stripe secret key

## Environment variables

### Backend (`backend/.env`)

Copy `backend/.env.example` and set values:

```env
MONGODB_URI=
JWT_SECRET=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Frontend (`frontend/.env.example`)

```env
VITE_API_URL=http://localhost:5000/api
```

## Local development

### 1) Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2) Run backend

```bash
cd backend
npm run dev
```

### 3) Run frontend

```bash
cd frontend
npm run dev
```

Visit the frontend dev URL shown by Vite (usually `http://localhost:5173`). The frontend will call the backend API at `/api`.

## Running both on the same host

This project can serve frontend build files from the backend.

### Build frontend

```bash
cd frontend
npm install
npm run build
```

### Start backend with frontend serving enabled

```bash
cd backend
set SERVE_FRONTEND=true
npm start
```

On Windows PowerShell use:

```powershell
$env:SERVE_FRONTEND='true'
npm start
```

Open:

```text
http://localhost:5000
```

## Production deployment on Render

This project includes `render.yaml` to deploy both services.

### Backend service (Web Service)

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment: `Node`
- Env vars:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `OPENAI_API_KEY`
  - `STRIPE_SECRET_KEY`
  - `FRONTEND_URL` = frontend URL

### Frontend service (Static Site)

- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Env vars:
  - `VITE_API_URL` = `https://<backend-service>.onrender.com/api`

### Single-service Render deployment

If you want one Render service for both frontend and backend, use the backend as the root and set a custom build command:

```bash
cd ../frontend && npm install && npm run build && cd ../backend && npm install
```

Start command:

```bash
npm start
```

Set env vars:

- `MONGODB_URI`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `SERVE_FRONTEND=true`
- `NODE_ENV=production`

## API overview

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/password-reset`
- `GET /api/auth/me`

### Messages
- `POST /api/messages/send`
- `POST /api/messages/ai-reply`
- `GET /api/messages/history`
- `POST /api/messages/retry/:id`
- `GET /api/messages/export`

### Templates
- `GET /api/templates`
- `POST /api/templates`
- `PUT /api/templates/:id`
- `DELETE /api/templates/:id`

### Subscription
- `GET /api/subscription/plans`
- `POST /api/subscription/checkout`
- `GET /api/subscription/status`

### Dashboard
- `GET /api/dashboard/stats`

### Settings
- `GET /api/settings`
- `PUT /api/settings`

## Notes

- `frontend/package.json` requires Node `18.x`.
- For Render deployments, do not rely on `frontend/.env.production`; use Render env vars.
- If the backend is serving frontend assets, `VITE_API_URL` can remain `/api`.

## Useful commands

```bash
# Backend development
cd backend && npm run dev

# Frontend development
cd frontend && npm run dev

# Build frontend
cd frontend && npm run build

# Run backend production
cd backend && npm start
```

## Sample data

Use `frontend/sample-contacts.csv` to load contact data on the Bulk Messaging page.

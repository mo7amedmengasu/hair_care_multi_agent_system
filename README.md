# Hair Care Multi-Agent System

A full-stack application featuring a modern React chatbot UI, a Node/Express backend for user/session management (MongoDB), and a FastAPI-based AI service that generates HTML responses and supports image analysis.

## Overview
- Frontend: Vite + React (modern CSS, axios)
- Backend: Node.js + Express + Mongoose (users, chats, sessions)
- AI Service: FastAPI + LangGraph + OpenAI/Gemini, returns HTML answers
- Auth Flow: Register → Login → Chat (protected route)
- Sessions: Sidebar listing past sessions; create new session (logout)
- Image Upload: Uploads to `AI_service/app/images` and passes `images/<filename>` to AI

## Project Structure
```
AI_service/
  app/
    main.py
    routs.py
    agents.py
    graph.py
    models.py
    images/
back_end/
  server.js
  controllers/
  models/
  routs/
front_end/
  vite-project/
    src/
      api/
      components/
      pages/
      styles/
```

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- MongoDB running locally (`mongodb://localhost:27017/Zedny_db`)
- API keys (if using OpenAI/Gemini): set environment variables in `AI_service/app`
  - `OPENAI_API_KEY`
  - `GOOGLE_API_KEY` (if using Gemini image analysis)

## Setup & Run

1) Backend (users & chats)
```powershell
cd D:\Zedny_intern\first_project\back_end
npm install
npm install cors
nodemon server.js
```
Server runs at `http://localhost:3000`.

2) AI Service
```powershell
cd D:\Zedny_intern\first_project\AI_service\app
pip install -r ..\requirements.txt
uvicorn main:app --reload --port 8000
```
AI runs at `http://localhost:8000`.

3) Frontend
```powershell
cd D:\Zedny_intern\first_project\front_end\vite-project
npm install
npm install axios react-router-dom
npm run dev
```
Frontend dev server runs at Vite default (e.g., `http://localhost:5173`).

## API Endpoints

Backend (Node)
- `POST /api/users/register` → create user
- `POST /api/users/login` → login
- `POST /api/chats/save` → save message `{ userId, userMessage, aiResponse }`
- `GET /api/chats/user/:userId` → all sessions & chats
- `GET /api/chats/user/:userId/session/:sessionId` → specific session
- `POST /api/chats/logout/:userId` → create new session

AI Service (FastAPI)
- `POST /upload-image` (multipart) → saves to `app/images`, returns `{ image_path: 'images/<name>' }`
- `POST /get-final-answer` (JSON) → returns `{ final_answer: '<html>' }`
  - Required fields: `{ task: string, image_path: string, history: Array<{ userMessage, aiMessage }> }`

## Frontend Notes
- Auth is handled via `localStorage.user` and a protected route `/chat`.
- Chat renders the AI answer as HTML using `dangerouslySetInnerHTML`.
- Image upload uses a file input; the returned `image_path` is sent to the AI.

## Environment & CORS
- Backend enables CORS for `http://localhost:5173`.
- AI service enables CORS similarly.

## Architecture
Add your architecture diagram image below (exported PNG/JPG):

![Agent Architecture](./agent_arch.png)

> Replace the path with your actual diagram file.

## Troubleshooting
- 422 from `/get-final-answer`: ensure you send `{ task, image_path: '', history: [] }` at minimum.
- 500 from AI: verify image path exists and API keys are set.
- Login 401: confirm user exists; registration normalizes email to lowercase.

## License
Private/internal project. Do not distribute.

# ShopEasy: Full-Stack E-commerce App

A full-stack e-commerce app built with React (Vite), Node/Express and MongoDB.

**Live demo:** <your Vercel link>
**API:** <your Render link>

## Features
- Register and login with JWT authentication (React Context, token in localStorage)
- Browse items fetched from the API, with search by title or seller
- Item details page (`/details/:id`)
- Cart that persists across reloads, with remove and clear all
- Success/error alerts with Notistack
- Responsive UI with Bootstrap

## Tech Stack
React, Vite, React Router DOM, Axios, Notistack, Context API, Bootstrap, Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## Run Locally

### 1. Backend
```bash
cd server
npm install
```
Create `server/.env`:
```
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<any long random string>
PORT=5000
```
```bash
npm run seed   # fills the database with sample items
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
```
Create `client/.env`:
```
VITE_API_URL=http://localhost:5000/api
```
```bash
npm run dev
```
Open http://localhost:5173

## API Endpoints
| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Create an account |
| POST | /api/auth/login | Log in, returns a JWT |
| GET | /api/items?search= | List items, optional search |
| GET | /api/items/:id | Get one item |
🎬 MOVIE RATING WEBSITE

A full-stack web app to read, create, update, and delete film reviews with authentication. Developed on the **MERN stack**, this project illustrates basic CRUD operations, secure login, and MongoDB integration.

🔥 Features

- ✅ User Registration and Login
- 🔐 Password hashing using bcrypt
- 🔑 JWT-based authentication with 7-day session expiry
- 🎥 Add, View, Update, Delete Movies
- ⭐ Rate and Review Movies
- 📦 MongoDB for persistent storage using Mongoose
- 🧭 Clean API structure (RESTful)

🛠️ Tech Stack

- **Frontend:** React.js, Axios, Tailwind CSS (optional)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, bcrypt

 🖇Project Structure

movie-rating-app/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/AuthContext.js
│ │ └── utils/api.js
│ └── package.json
├── server/ # Node.js + Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── utils/
│ └── server.js
└── README.md

📌 API Endpoints
POST /api/auth/register – Register user
POST /api/auth/login – Login user
GET /api/movies/ – Get all movies
POST /api/movies/ – Add movie
PUT /api/movies/:id – Update movie
DELETE /api/movies/:id – Delete movie


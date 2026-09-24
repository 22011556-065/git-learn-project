# Student Register (Node.js + Express + MongoDB)

A small website to add students and view them in a list. Every student is saved to MongoDB, including the date they were added (`createdAt`).

## Files

```
student-app/
├── server.js          # Express app + routes
├── models/Student.js  # Mongoose schema
├── views/index.ejs    # Add-student form + student table
├── public/style.css   # Styling
├── .env                # MongoDB connection string (edit this)
└── package.json
```

## Setup

1. Make sure MongoDB is running locally (or use a connection string from MongoDB Atlas).
2. Install dependencies:
   ```
   npm install
   ```
3. Edit `.env` if needed — by default it connects to:
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/studentDB
   ```
   For MongoDB Atlas, replace it with your Atlas connection string, e.g.:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/studentDB
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` in your browser.

## What it does

- **GET /** — shows the add-student form and a table of all students, newest first.
- **POST /students** — adds a new student (name, roll number, class, email) to MongoDB. The date is stored automatically via the `createdAt` field.
- **POST /students/:id/delete** — deletes a student.
- **GET /api/students** — returns all students as JSON (useful for testing with curl/Postman).

## Notes

- Requires Node.js 18+ and a running MongoDB instance.
- To auto-restart on file changes during development: `npm run dev` (uses nodemon).

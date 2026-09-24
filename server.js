require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/studentDB';

// ---- View engine & middleware ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- Connect to MongoDB ----
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---- Routes ----

// Show all students + add form
app.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.render('index', { students, error: null });
  } catch (err) {
    res.render('index', { students: [], error: 'Could not load students.' });
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  try {
    const { name, rollNumber, className, email } = req.body;
    await Student.create({ name, rollNumber, className, email });
    res.redirect('/');
  } catch (err) {
    console.error('Error adding student:', err);
    try {
      const students = await Student.find().sort({ createdAt: -1 });
      res.render('index', { students, error: 'Failed to add student. Check the form fields.' });
    } catch (dbErr) {
      console.error('Database connection timed out or failed:', dbErr);
      res.render('index', { students: [], error: 'Failed to add student due to database connection issues.' });
    }
  }
});

// Delete a student
app.post('/students/:id/delete', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// Optional JSON API (handy for testing with curl/Postman)
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error('Error fetching API students:', err);
    res.status(500).json({ error: 'Could not load students due to a database connection error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

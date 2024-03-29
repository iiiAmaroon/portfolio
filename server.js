const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql*125#**',
  database: 'feedback'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Endpoint to handle feedback submission
app.post('/submit-feedback', (req, res) => {
  const { name, email, comment } = req.body;
  const feedback = { name, email, comment };

  db.query('INSERT INTO feedback SET ?', feedback, (err, result) => {
    if (err) {
      console.error('Error submitting feedback:', err);
      res.status(500).send('Error submitting feedback');
    } else {
      console.log('Feedback submitted successfully');
      res.status(200).send('Feedback submitted successfully');
    }
  });
});

// Endpoint to get all feedback entries
app.get('/admin/feedback', (req, res) => {
    db.query('SELECT * FROM feedback', (err, results) => {
      if (err) {
        console.error('Error fetching feedback:', err);
        res.status(500).send('Error fetching feedback');
      } else {
        res.json(results);
      }
    });
  });
  

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

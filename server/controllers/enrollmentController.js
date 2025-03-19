const db = require('../config/db');

exports.enrollInCourse = (req, res) => {
  console.log("request recieved!")
  const { email, course_id } = req.body;
  console.log(email,course_id)
  db.query('INSERT INTO enrollment (email, course_id) VALUES (?, ?)', [email, course_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Enrollment successful' });
  });
};

exports.getUserEnrollments = (req, res) => {
  console.log("recieved request")
  db.query('SELECT * FROM enrollment WHERE email = ?', [req.params.email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(results)
    res.json(results);
  });
};
const db = require('../config/db');

exports.enrollInCourse = (req, res) => {
  const { email, course_id } = req.body;

  db.query('INSERT INTO enrollment (email, course_id) VALUES (?, ?)', [email, course_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Enrollment successful' });
  });
};

exports.getUserEnrollments = (req, res) => {
  db.query('SELECT * FROM enrollment WHERE email = ?', [req.params.email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

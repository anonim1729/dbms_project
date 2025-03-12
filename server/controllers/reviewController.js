const db = require('../config/db');

exports.addReview = (req, res) => {
  const { course_id, user_email, rating, review } = req.body;

  db.query(
    'INSERT INTO ratings_reviews (course_id, user_email, rating, review) VALUES (?, ?, ?, ?)',
    [course_id, user_email, rating, review],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Review added successfully' });
    }
  );
};

exports.getReviewsForCourse = (req, res) => {
  db.query(
    'SELECT * FROM ratings_reviews WHERE course_id = ?',
    [req.params.course_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

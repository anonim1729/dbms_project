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

exports.getReviews = (req, res) => {
  db.query(
    'SELECT * FROM ratings_reviews LIMIT 6',
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Update Review
exports.updateReview = (req, res) => {
  const { course_id, user_email, rating, review } = req.body;

  if (!rating || !review) {
    return res.status(400).json({ error: 'Rating and review are required' });
  }

  db.query(
    'UPDATE ratings_reviews SET rating = ?, review = ? WHERE course_id = ? AND user_email = ?',
    [rating, review, course_id, user_email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Review not found for this user' });
      }
      res.json({ message: 'Review updated successfully' });
    }
  );
};

// Delete Review
exports.deleteReview = (req, res) => {
  const { course_id, user_email } = req.params;

  db.query(
    'DELETE FROM ratings_reviews WHERE course_id = ? AND user_email = ?',
    [course_id, user_email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Review not found for this user' });
      }
      res.json({ message: 'Review deleted successfully' });
    }
  );
};

exports.getInstructorRatings = (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT c.course_id) AS total_courses,
      COUNT(DISTINCT e.email) AS total_students,
      AVG(r.rating) AS average_rating,
      COUNT(r.review) AS total_reviews
    FROM courses c
    LEFT JOIN enrollment e ON c.course_id = e.course_id
    LEFT JOIN ratings_reviews r ON c.course_id = r.course_id
    WHERE c.instructor_email = ?
  `;
  console.log('here......');
  db.query(query, [req.params.email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {}); // Return empty object if no data found
  });
};

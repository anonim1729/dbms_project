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
  db.query('SELECT * FROM enrollment WHERE email = ?', [req.params.email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log(results)
    res.json(results);
  });
};

exports.getEnhancedEnrollments = (req, res) => {
  const { email } = req.params;
  
  const query = `
    SELECT 
      c.*,
      COUNT(cv.video_url) AS video_count,
      SUM(cv.duration) AS total_duration
    FROM enrollment e
    JOIN courses c ON e.course_id = c.course_id
    LEFT JOIN course_videos cv ON c.course_id = cv.course_id
    WHERE e.email = ?
    GROUP BY c.course_id
  `;

  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Enrollment controller
exports.checkEnrollment = (req, res) => {
  const { email, courseId } = req.params;
  db.query(
    'SELECT EXISTS(SELECT 1 FROM enrollment WHERE email = ? AND course_id = ?) AS isEnrolled',
    [email, courseId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ isEnrolled: results[0].isEnrolled });
    }
  );
};
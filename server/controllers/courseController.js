const db = require('../config/db');

exports.createCourse = (req, res) => {
  const { course_name, description, instructor_email, category_name, thumbnail } = req.body;

  let query = 'INSERT INTO courses (course_name, description, instructor_email, category_name';
  let values = [course_name, description, instructor_email, category_name];

  if (thumbnail) {
    query += ', thumbnail) VALUES (?, ?, ?, ?, ?)';
    values.push(thumbnail);
  } else {
    query += ') VALUES (?, ?, ?, ?)';
  }

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Course created successfully', course_id: result.insertId });
  });
};


exports.getCourses = (req, res) => {
  const userEmail = req.body.email;

  db.query('CALL get_courses_with_aggregates(?)', [userEmail], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    // Stored procedures return a 2D array; the result is in results[0]
    res.json(results[0]);
  });
};




exports.getCourseById = (req, res) => {
  const courseId = req.params.id;
  db.query(`
    SELECT 
      c.*, 
      (SELECT AVG(rating) FROM ratings_reviews WHERE course_id = c.course_id) AS average_rating,
      (SELECT COUNT(*) FROM course_videos WHERE course_id = c.course_id) AS video_count,
      (SELECT SUM(duration) FROM course_videos WHERE course_id = c.course_id) AS total_duration
    FROM courses c
    WHERE c.course_id = ?
  `, [courseId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(result[0]);
  });
};

exports.deleteCourse = (req, res) => {
  db.query('DELETE FROM courses WHERE course_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Course deleted successfully' });
  });
};


exports.getInstructorCourses = (req, res) => {
  const { email } = req.params;
  const query = `
   SELECT 
    c.*, 
    COUNT(DISTINCT e.email) AS enrollment_count,
    AVG(r.rating) AS average_rating,
    (SELECT SUM(duration) FROM course_videos WHERE course_id = c.course_id) AS total_duration
FROM courses c
LEFT JOIN enrollment e ON c.course_id = e.course_id
LEFT JOIN ratings_reviews r ON c.course_id = r.course_id
WHERE c.instructor_email = ?
GROUP BY c.course_id;
 `;
 
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


const db = require('../config/db');

exports.getUserProfile = (req, res) => {
  db.query('SELECT email, f_name, l_name, ph_no, account_type, dob, gender FROM users WHERE email = ?', [req.params.email], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
};

exports.updateUserProfile = (req, res) => {
  const { f_name, l_name, ph_no, dob, gender } = req.body;

  db.query(
    'UPDATE users SET f_name = ?, l_name = ?, ph_no = ?, dob = ?, gender = ? WHERE email = ?',
    [f_name, l_name, ph_no, dob, gender, req.params.email],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Profile updated successfully' });
    }
  );
};

exports.getInstructors = (req, res) => {        //getting all the mails of email with count(courseid)
  const query = `
    SELECT 
      u.email,
      u.f_name,
      u.l_name,
      COUNT(c.course_id) AS course_count
    FROM users u
    LEFT JOIN courses c ON u.email = c.instructor_email
    WHERE u.account_type = 'instructor'
    GROUP BY u.email
    ORDER BY course_count DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "error from controller" });
    res.json(results);
  });
};

exports.getInstructorByEmail = (req, res) => {            //getting instructor details
  const query = `
    SELECT 
      u.*,
      COUNT(c.course_id) AS course_count
    FROM users u
    LEFT JOIN courses c ON u.email = c.instructor_email
    WHERE u.email = ? AND u.account_type = 'instructor'
    GROUP BY u.email
  `;

  db.query(query, [req.params.email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Instructor not found" });
    res.json(results[0]);
  });
};

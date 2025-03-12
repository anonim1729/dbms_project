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

const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { email, f_name, l_name, ph_no, account_type, dob, gender, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO users (email, f_name, l_name, ph_no, account_type, dob, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, f_name, l_name, ph_no, account_type, dob, gender, password],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ email: user.email, account_type: user.account_type }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({ token, user });
  });
};

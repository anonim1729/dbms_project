const db = require('../config/db');

exports.createCategory = (req, res) => {
  const { category_name, admin_email } = req.body;

  db.query(
    'INSERT INTO categories (category_name, admin_email) VALUES (?, ?)',
    [category_name, admin_email],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Category created successfully' });
    }
  );
};

exports.getCategories = (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.deleteCategory = (req, res) => {
  db.query('DELETE FROM categories WHERE category_name = ?', [req.params.category_name], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Category deleted successfully' });
  });
};

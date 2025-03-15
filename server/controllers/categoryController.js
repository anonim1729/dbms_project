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

// server/controllers/categoryController.js
exports.getCategories = (req, res) => {
  const query = `
    SELECT 
      c.category_name, 
      c.created_at,
      COUNT(co.course_id) AS course_count
    FROM categories c
    LEFT JOIN courses co ON c.category_name = co.category_name
    GROUP BY c.category_name
    ORDER BY c.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.deleteCategory = (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({ error: 'Missing category_name' });
  }

  db.query('DELETE FROM categories WHERE category_name = ?', [category_name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  });
};

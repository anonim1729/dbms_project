const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.delete('/delete', deleteCategory);

module.exports = router;

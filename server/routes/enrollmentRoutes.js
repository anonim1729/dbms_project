const express = require('express');
const { enrollInCourse, getUserEnrollments } = require('../controllers/enrollmentController');
const router = express.Router();

router.post('/', enrollInCourse);
router.get('/:email', getUserEnrollments);

module.exports = router;

const express = require('express');
const { addReview, getReviewsForCourse } = require('../controllers/reviewController');
const router = express.Router();

router.post('/', addReview);
router.get('/:course_id', getReviewsForCourse);

module.exports = router;

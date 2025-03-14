const express = require('express');
const { addReview, getReviewsForCourse, deleteReview, updateReview } = require('../controllers/reviewController');
const router = express.Router();

router.post('/', addReview);
router.get('/:course_id', getReviewsForCourse);
router.put('/update', updateReview);  
router.delete('/delete/:course_id/:user_email', deleteReview);

module.exports = router;

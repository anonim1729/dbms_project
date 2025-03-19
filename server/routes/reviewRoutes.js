const express = require('express');
const { addReview, getReviewsForCourse, deleteReview, updateReview, getInstructorRatings, getReviews } = require('../controllers/reviewController');
const router = express.Router();

router.post('/', addReview);
router.get('/', getReviews);
router.get('/:course_id', getReviewsForCourse);
router.put('/update', updateReview);  
router.delete('/delete/:course_id/:user_email', deleteReview);
router.get("/instructor/:email", getInstructorRatings);

module.exports = router;

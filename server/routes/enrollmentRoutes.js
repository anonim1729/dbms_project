const express = require('express');
const { enrollInCourse, getUserEnrollments, getEnhancedEnrollments, checkEnrollment } = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware,enrollInCourse);
router.get('/:email',authMiddleware, getUserEnrollments);
router.get('/enhanced/:email',authMiddleware,getEnhancedEnrollments);
router.get('/check/:email/:courseId', checkEnrollment);


module.exports = router;

const express = require('express');
const { createCourse, getCourses, getCourseById, deleteCourse ,getInstructorCourses} = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',authMiddleware, createCourse);
router.get('/', getCourses);
router.get('/instructor/:email',getInstructorCourses);
router.get('/:id', getCourseById);
router.delete('/:id', deleteCourse);

module.exports = router;

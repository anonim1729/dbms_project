const express = require('express');
const { createCourse, getCourses, getCourseById, deleteCourse ,getInstructorCourses} = require('../controllers/courseController');
const router = express.Router();

router.post('/', createCourse);
router.get('/', getCourses);
router.get('/instructor/:email', getInstructorCourses);
router.get('/:id', getCourseById);
router.delete('/:id', deleteCourse);

module.exports = router;

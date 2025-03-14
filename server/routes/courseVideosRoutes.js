const express = require('express');
const router = express.Router();
const courseVideosController = require('../controllers/courseVideosController');

// Routes
router.post('/add', courseVideosController.addVideo);
router.get('/:course_id', courseVideosController.getVideosByCourse);
router.delete('/delete', courseVideosController.deleteVideo);
router.put('/update', courseVideosController.updateVideo);
module.exports = router;

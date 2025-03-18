const express = require('express');
const { getUserProfile, updateUserProfile, getInstructors, getInstructorByEmail } = require('../controllers/userController');
const router = express.Router();

router.get("/instructors", getInstructors);
router.get("/instructors/:email", getInstructorByEmail);
router.get('/:email', getUserProfile);
router.put('/:email', updateUserProfile);

module.exports = router;

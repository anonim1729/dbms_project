const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

router.get('/:email', getUserProfile);
router.put('/:email', updateUserProfile);

module.exports = router;

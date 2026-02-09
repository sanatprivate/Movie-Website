const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    getUsers,
    upgradeUserToPremium,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.route('/')
    .get(protect, admin, getUsers);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/upgrade')
    .put(protect, upgradeUserToPremium);

module.exports = router;

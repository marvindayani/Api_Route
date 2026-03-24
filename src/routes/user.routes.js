const express = require('express');
const userController = require('../controllers/user.controller');


const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();
router.get('/profile', authMiddleware, userController.getUserProfile);
router.patch('/update-profile', authMiddleware, userController.updateUserProfile);

module.exports = router;

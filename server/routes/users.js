const express = require("express");
const {
  getAllUsers,
  getTotalUsers,
  getUsersLeaderboard,
  getUserbyID,
  updateUser
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Require User Authentication
// router.use(requireAuth);

router.get('/', getAllUsers);
router.get('/total', getTotalUsers);
router.get('/leaderboard/:id', getUsersLeaderboard);
router.get('/:id', getUserbyID);
router.patch('/:id', updateUser);

module.exports = router;
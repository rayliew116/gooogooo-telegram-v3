const express = require("express");

// Controller Functions
const { getAllAdmins, createAdmin, loginAdmin } = require('../controllers/adminController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginAdmin);

// router.use(requireAuth);
router.get('/', getAllAdmins);
router.post('/create', createAdmin);

module.exports = router;
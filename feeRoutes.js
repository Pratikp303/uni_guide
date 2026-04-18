const express = require('express');
const router = express.Router();

// ✅ SAFE IMPORT
const feeController = require('../controllers/feeController');

// 🔐 IMPORT MIDDLEWARES
const protect = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all fees
router.get('/', feeController.getFees);

// 🔍 search by course name
router.get('/search-course', feeController.searchFeesByCourseName);

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE fee (ADMIN ONLY)
router.post('/', protect, adminOnly, feeController.createFee);

module.exports = router;
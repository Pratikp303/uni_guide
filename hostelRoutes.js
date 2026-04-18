const express = require('express');
const router = express.Router();

const {
  getHostels,
  createHostel,
  getHostelById
} = require('../controllers/hostelController');

// 🔐 IMPORT MIDDLEWARES
const protect = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all hostels / search
router.get('/', getHostels);

// GET hostel by ID
router.get('/:id', getHostelById);

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE hostel (ADMIN ONLY)
router.post('/', protect, adminOnly, createHostel);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
  getHostels,
  createHostel,
  getHostelById
} = require('./hostelController'); // ✅ Fixed: Removed ../controllers/

// 🔐 IMPORT MIDDLEWARES
const protect = require('./authMiddleware'); // ✅ Fixed: Removed ../middlewares/
const adminOnly = require('./adminMiddleware'); // ✅ Fixed: Removed ../middlewares/

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

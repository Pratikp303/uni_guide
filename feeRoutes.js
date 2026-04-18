const express = require('express');
const router = express.Router();

const {
  getFees,
  createFee,
  getFeeById
} = require('./feeController'); // ✅ Fixed: Points to main folder

// 🔐 IMPORT MIDDLEWARES
const protect = require('./authMiddleware'); // ✅ Fixed
const adminOnly = require('./adminMiddleware'); // ✅ Fixed

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all fees
router.get('/', getFees);

// GET fee by ID
router.get('/:id', getFeeById);

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE fee (ADMIN ONLY)
router.post('/', protect, adminOnly, createFee);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  getFees,
  createFee,
  searchFeesByCourseName // ✅ Swapped to the correct function
} = require('./feeController'); // ✅ Points to main folder

// 🔐 IMPORT MIDDLEWARES
const protect = require('./authMiddleware'); 
const adminOnly = require('./adminMiddleware'); 

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all fees
router.get('/', getFees);

// 🔍 SEARCH fees (Replaced the invalid getFeeById route)
router.get('/search', searchFeesByCourseName); 

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE fee (ADMIN ONLY)
router.post('/', protect, adminOnly, createFee);

module.exports = router;

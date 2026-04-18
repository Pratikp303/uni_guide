const express = require('express');
const router = express.Router();

const { getUniversities, createUniversity, searchUniversities } = require('./universityController'); 
const protect = require('./authMiddleware'); 
const adminOnly = require('./adminMiddleware');

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all universities
router.get('/', getUniversities);

// 🔍 SEARCH universities
router.get('/search', searchUniversities);

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE university (ADMIN ONLY)
router.post('/', protect, adminOnly, createUniversity);

module.exports = router;

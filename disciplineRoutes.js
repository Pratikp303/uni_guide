const express = require('express');
const router = express.Router();

const {
  getDisciplines,
  createDiscipline,
  searchDisciplines
} = require('./disciplineController'); // ✅ Fixed: Points to main folder

// 🔐 IMPORT MIDDLEWARES
const protect = require('./authMiddleware'); // ✅ Fixed
const adminOnly = require('./adminMiddleware'); // ✅ Fixed

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all disciplines
router.get('/', getDisciplines);

// 🔍 SEARCH disciplines
router.get('/search', searchDisciplines);

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE discipline (ADMIN ONLY)
router.post('/', protect, adminOnly, createDiscipline);

module.exports = router;

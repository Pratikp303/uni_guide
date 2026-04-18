const express = require('express');
const router = express.Router();

const {
  getDisciplines,
  createDiscipline,
  searchDisciplines
} = require('../controllers/disciplineController');

// 🔐 IMPORT MIDDLEWARES
const protect = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

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
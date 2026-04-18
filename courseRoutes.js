const express = require('express');
const router = express.Router();

const {
  getCourses,
  createCourse,
  searchCourses
} = require('../controllers/courseController');

// 🔐 IMPORT MIDDLEWARES
const protect = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

// ==============================
// PUBLIC ROUTES
// ==============================

// GET all courses
router.get('/', getCourses);

// 🔍 SEARCH courses
router.get('/search', searchCourses);

// ==============================
// 🔒 PROTECTED ROUTES
// ==============================

// CREATE course (ADMIN ONLY)
router.post('/', protect, adminOnly, createCourse);

module.exports = router;
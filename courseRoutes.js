const express = require('express');
const router = express.Router();

const {
  getCourses,
  createCourse,
  searchCourses
} = require('./courseController'); // ✅ Fixed: Removed ../controllers/

// 🔐 IMPORT MIDDLEWARES
const protect = require('./authMiddleware'); // ✅ Fixed: Removed ../middlewares/
const adminOnly = require('./adminMiddleware'); // ✅ Fixed: Removed ../middlewares/

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

const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  getUsers
} = require('../controllers/authController');

// ✅ IMPORT VALIDATOR
const { body, validationResult } = require('express-validator');

// ==============================
// VALIDATION MIDDLEWARE
// ==============================
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ==============================
// AUTH ROUTES
// ==============================

// SIGNUP
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  validate,
  signup
);

// LOGIN
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

// GET USERS (optional: you can protect this later)
router.get('/users', getUsers);

module.exports = router;
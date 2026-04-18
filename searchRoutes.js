const express = require('express');
const router = express.Router();

const { masterSearch } = require('../controllers/searchController');

// 🔥 MASTER SEARCH
router.get('/', masterSearch);

module.exports = router;
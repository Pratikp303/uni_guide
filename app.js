const express = require('express');
const cors = require("cors");
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ IMPORT ROUTES 
// Fixed: Removed './routes/' because the files are in your main directory
const universityRoutes = require('./universityRoutes');
const disciplineRoutes = require('./disciplineRoutes');
const courseRoutes = require('./courseRoutes');
const feeRoutes = require('./feeRoutes');
const hostelRoutes = require('./hostelRoutes');
const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');

// ✅ USE ROUTES
app.use('/api/v1/universities', universityRoutes);
app.use('/api/v1/disciplines', disciplineRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/fees', feeRoutes);
app.use('/api/v1/hostels', hostelRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/search', searchRoutes);

// ✅ TEST ROUTE
app.get('/', (req, res) => {
    res.send("API is running perfectly! 🚀");
});

module.exports = app;

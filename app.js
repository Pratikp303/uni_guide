const express = require('express');
const cors = require("cors");
const app = express();

// ✅ MIDDLEWARE
// In production, you might want to allow your specific frontend URL
app.use(cors({
    origin: ["http://localhost:3000", "https://your-frontend-link.vercel.app"], 
    credentials: true 
}));
app.use(express.json());

// ✅ IMPORT ROUTES (Fixed paths)
const universityRoutes = require('./routes/universityRoutes');
const disciplineRoutes = require('./routes/disciplineRoutes');
const courseRoutes = require('./routes/courseRoutes');
const feeRoutes = require('./routes/feeRoutes');
const hostelRoutes = require('./routes/hostelRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

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
    res.send("API Running 🚀");
});

// ✅ EXPORT
module.exports = app;s

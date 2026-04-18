require('dotenv').config(); // This MUST be the first line
const app = require('./app');
const mongoose = require('mongoose');

// Use the Environment Variable from Render
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    
    // Render provides the PORT automatically
    const PORT = process.env.PORT || 5000;
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop the server if DB fails
  });

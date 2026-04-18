const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
  name: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  accreditation: String,
  establishedYear: Number,
  type: String,
});

module.exports = mongoose.model('University', universitySchema);
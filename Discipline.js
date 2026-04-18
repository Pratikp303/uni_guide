const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: String,
  description: String
});

// ✅ THIS LINE IS VERY IMPORTANT
module.exports = mongoose.model('Discipline', disciplineSchema);
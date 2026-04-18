const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  universityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true
  },
  disciplineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discipline',
    required: true
  },
  title: String,
  degreeType: String,
  duration: String,
  studyMode: String,
  eligibilityCriteria: String
});

module.exports = mongoose.model('Course', courseSchema);
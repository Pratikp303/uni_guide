const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  occupancy: String,     // Single / Double
  costPerYear: Number,
  ac: Boolean
});

const hostelSchema = new mongoose.Schema({
  universityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University',
    required: true
  },
  name: String,           // Boys Hostel Block A
  type: String,           // On-Campus / Off-Campus
  facilities: [String],   // WiFi, AC, Mess, Gym
  roomTypes: [roomTypeSchema]
});

module.exports = mongoose.model('Hostel', hostelSchema);
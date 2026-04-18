const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  components: [
    {
      name: String,           // e.g. Tuition Fee
      amount: Number,         // e.g. 50000
      frequency: String       // e.g. Per Semester / One Time
    }
  ],
  totalEstimatedCost: Number
});

module.exports = mongoose.model('Fee', feeSchema);
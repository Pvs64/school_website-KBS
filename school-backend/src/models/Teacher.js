const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add teacher name'],
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Please add qualification']
  },
  designation: {
    type: String,
    required: [true, 'Please add designation']
  },
  section: {
    type: String,
    enum: ['Primary', 'Middle', 'High', 'Administration'],
    default: 'Primary'
  },
  subjects: [{
    type: String
  }],
  photoUrl: {
    type: String,
    default: 'default-teacher.jpg'
  },
  experience: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', teacherSchema);

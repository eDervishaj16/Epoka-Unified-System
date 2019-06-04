const mongoose = require('mongoose');

notificationObj = {
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
};
studentObj = {
  id: mongoose.Schema.Types.ObjectId,
  grade: [{
    grade: Number,
    weight: Number,
  }],
  attendance: [Boolean]
}





const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  faculty: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true
  },

  students: {
    type: [studentObj]
  },
  notifications: {
    type: [notificationObj]
  },
  timetable: []



});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
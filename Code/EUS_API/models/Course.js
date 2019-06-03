const mongoose = require('mongoose');


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
    type: [mongoose.Schema.Types.ObjectId]
  },
  notifications: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  timetable: [],
  


});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
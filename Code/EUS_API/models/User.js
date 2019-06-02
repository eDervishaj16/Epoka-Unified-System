const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type:Number,
    default:3
  }
//Add class id array


});

const User = mongoose.model('User', UserSchema);
module.exports = User;

const mongoose = require('mongoose');


const ClassSchema = new mongoose.Schema({
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
    students:{
        type:[Schema.Types.ObjectId]
    },
    materials:{
        type:[Schema.Types.ObjectId]
    }


});
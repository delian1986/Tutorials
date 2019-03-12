const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    unique:true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isListed:{
    type:Boolean,
    required:true
  },
  lectures: [{
    type:Schema.Types.ObjectId,
    ref:'Lecture'
  }]
});

module.exports = mongoose.model('Course', courseSchema);
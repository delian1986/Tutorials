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
    default:false
  },
  lectures: [{
    type:Schema.Types.ObjectId,
    ref:'Lecture'
  }],
  usersEnrolled:[{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

module.exports = mongoose.model('Course', courseSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  videoUrl:{
      type:String,
      required:true
  },
  course: {
    type:Schema.Types.ObjectId,
    ref:'Course'
  }
});

module.exports = mongoose.model('Lecture', lectureSchema);
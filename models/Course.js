const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lectures: [{
    type:Schema.Types.ObjectId,
    ref:'Lecture'
  }]
});

module.exports = mongoose.model('Course', courseSchema);
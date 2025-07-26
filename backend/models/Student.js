const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  mobNo: String,
  email: String,
  password: String,
  course: String,
  totalFee: String,
  pendingFee: String,
  duration: String,
  batch: String,
  year: String
});

module.exports = mongoose.model('Student', studentSchema);

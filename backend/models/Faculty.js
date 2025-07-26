const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: String,
  isAdmin: Boolean,
  role: String
});

module.exports = mongoose.model('Faculty', facultySchema);

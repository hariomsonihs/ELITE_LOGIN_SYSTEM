const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hariomsoni0818:Elite%4012321@cluster0.mx9ealq.mongodb.net/studentdb');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ DB connection failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;

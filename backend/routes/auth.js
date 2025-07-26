const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

router.post('/login', async (req, res) => {
  const { emailOrMobile, password } = req.body;
  console.log("📥 Login Attempt:", emailOrMobile, password);

  try {
    const student = await Student.findOne({
      $or: [
        { email: emailOrMobile },
        { mobNo: emailOrMobile }
      ],
      password: password
    });

    if (student) {
      console.log("✅ Logged in as student:", student.email);
      return res.json({ role: "student", data: student });
    }

    const faculty = await Faculty.findOne({ email: emailOrMobile, password });

    if (faculty) {
      const role = faculty.isAdmin ? 'admin' : 'faculty';
      console.log(`✅ Logged in as ${role}:`, faculty.email);
      return res.json({ role, data: faculty });
    }

    console.log("❌ Invalid credentials for:", emailOrMobile);
    return res.status(401).json({ message: "Invalid credentials" });

  } catch (error) {
    console.error("💥 Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

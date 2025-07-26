const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

// === Students ===
router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.put('/student/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/student/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

// === Faculties ===
router.get('/faculties', async (req, res) => {
  const faculties = await Faculty.find();
  res.json(faculties);
});

router.put('/faculty/:id', async (req, res) => {
  const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/faculty/:id', async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: 'Faculty deleted' });
});

// Add student
router.post('/student', async (req, res) => {
  const newStudent = await Student.create(req.body);
  res.json(newStudent);
});

// Add faculty
router.post('/faculty', async (req, res) => {
  const newFaculty = await Faculty.create(req.body);
  res.json(newFaculty);
});


module.exports = router;

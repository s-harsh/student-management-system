const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST a student
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// PUT - update a student
router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE - delete a student
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
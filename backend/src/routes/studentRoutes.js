import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Add student
router.post("/add", async (req, res) => {
  try {
    const std = await Student.create(req.body);
    res.json({ success: true, student: std });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

// Get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json({ success: true, students });
});

// Update student
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ success: true, student: updated });
});

// Delete student
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;

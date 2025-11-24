import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Add course
router.post("/add", async (req, res) => {
  const course = await Course.create(req.body);
  res.json({ success: true, course });
});

// Get all courses
router.get("/", async (req, res) => {
  const course = await Course.find();
  res.json({ success: true, course });
});

export default router;

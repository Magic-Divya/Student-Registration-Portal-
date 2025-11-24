const Course = require('../models/Course');

exports.createCourse = async (req,res) => {
  const course = await Course.create(req.body);
  res.json(course);
};

exports.listCourses = async (req,res) => {
  const courses = await Course.find().sort({ name:1 });
  res.json(courses);
};

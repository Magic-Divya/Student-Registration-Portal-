const User = require('../models/User');
const Course = require('../models/Course');


exports.getAllStudents = async (req, res) => {
const students = await User.find({ role: 'student' });
res.json(students);
};


exports.approveStudent = async (req, res) => {
const student = await User.findByIdAndUpdate(
req.params.id,
{ status: 'approved' },
{ new: true }
);
res.json(student);
};


exports.createCourse = async (req, res) => {
const course = await Course.create(req.body);
res.json(course);
};
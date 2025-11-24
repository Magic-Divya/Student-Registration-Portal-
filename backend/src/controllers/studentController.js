const User = require('../models/User');

// Create (admin or student self)
exports.createStudent = async (req,res) => {
  try {
    const data = req.body;
    const student = await User.create(data);
    // emit new student event
    req.app.get('io').emit('student-created', { id: student._id, firstName: student.firstName });
    res.json(student);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// List with search & pagination
exports.listStudents = async (req,res) => {
  try {
    const { q = '', page = 1, limit = 10 } = req.query;
    const filter = {
      role: 'student',
      $or: [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { usn: { $regex: q, $options: 'i' } }
      ]
    };
    const skip = (Number(page)-1) * Number(limit);
    const [items, total] = await Promise.all([
      User.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt:-1 }),
      User.countDocuments(filter)
    ]);
    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Get single
exports.getStudent = async (req,res) => {
  const student = await User.findById(req.params.id);
  res.json(student);
};

// Update
exports.updateStudent = async (req,res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete
exports.deleteStudent = async (req,res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

// Approve (admin)
exports.approveStudent = async (req,res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  req.app.get('io').emit('student-approved', { id: updated._id, firstName: updated.firstName });
  res.json(updated);
};

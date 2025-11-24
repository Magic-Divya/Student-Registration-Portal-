const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
  try {
    const { firstName, lastName, email, password, usn } = req.body;
    if (!email || !password) return res.status(400).json({ message:'Email and password required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already used' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hash, usn });
    // notify admins via Socket.IO
    const io = req.app.get('io');
    io.emit('new-registration', { id: user._id, firstName: user.firstName, email: user.email });
    res.json({ message: 'Registered', user });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message:'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn:'7d' });
    res.json({ token, user });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

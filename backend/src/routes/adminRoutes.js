const router = require('express').Router();
const auth = require('../middleware/auth');
const {
getAllStudents,
approveStudent,
createCourse
} = require('../controllers/adminController');


router.get('/students', auth, getAllStudents);
router.patch('/approve/:id', auth, approveStudent);
router.post('/course', auth, createCourse);


module.exports = router;
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  usn: String,
  course: String,
  year: Number,
});

export default mongoose.model("Student", studentSchema);

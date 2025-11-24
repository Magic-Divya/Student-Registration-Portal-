import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model("Course", courseSchema);

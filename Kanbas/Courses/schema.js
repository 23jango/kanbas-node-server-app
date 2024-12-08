import mongoose from "mongoose";

//defines constraints of the course data type
const courseSchema = new mongoose.Schema(
 {
   name: String,
   number: String,
   startDate: Date,
   endDate: Date,
   department: String,
   credits: Number,
   description: String,
 },
 { collection: "courses" }
);
export default courseSchema;
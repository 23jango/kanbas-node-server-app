import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "AssignmentModel" },
    available: String,
    due: String,
    startDate: String,
    endDate: String,
    dueDate: String,
    points: Number,
    description: String,
    //the ref property set to the value CourseModel is the same value as the name of the courses model stored in the courses collection, declared in an earlier section. The ref property establishes that the primary key stored in course refers to a document stored in the courses collection, effectively implementing a one to many relation.

  },
  { collection: "assignments" }
);
export default assignmentSchema;
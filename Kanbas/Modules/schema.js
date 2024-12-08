import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    //the ref property set to the value CourseModel is the same value as the name of the courses model stored in the courses collection, declared in an earlier section. The ref property establishes that the primary key stored in course refers to a document stored in the courses collection, effectively implementing a one to many relation.

  },
  { collection: "modules" }
);
export default schema;


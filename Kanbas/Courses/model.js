import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("CourseModel", schema);
export default model;

//the mongoose model file provides functions like find, create, updateOne, delete, in order to interact with the data
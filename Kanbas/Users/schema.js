import mongoose from "mongoose"; //load mongoose library

const userSchema = new mongoose.Schema({ //create schema

    //String field that is required and unique
    username: { type: String, required: true, unique: true },
    //string field that is required, but not unique
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
  },
  { collection: "users" } // store data in "users" collection
);

export default userSchema;

//implement a DAO to retrieve all courses from the Database.
//import Database from "../Database/index.js";
import model from "./model.js";


export function findAllCourses() {
  return model.find();
}

//filters the course by its ID and then filters out all enrollments by the course's ID
// export function deleteCourse(courseId) {
//   const { courses, enrollments } = Database;
//   //const { courses, enrollments } = model.find();
//   Database.courses = courses.filter((course) => course._id !== courseId);
//   Database.enrollments = enrollments.filter(
//     (enrollment) => enrollment.course !== courseId
// );}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 


//to retireve courses that current student is enrolled in
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  // { courses, enrollments } = model.find();
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}

//creates a new course and adds it to the Database. The new course is passed in the HTTP body from the client and is appended to the end of the courses array in the Database. The new course is given a new unique identifier and sent back to the client in the response.
export function createCourse(course) {
  delete course._id;
  return model.create(course);
  // const newCourse = { ...course, _id: Date.now().toString() };
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
}

//update by looking for courses ID and then updates
export function updateCourse(courseId, courseUpdates) {
  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // Object.assign(course, courseUpdates);
  // return course;
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}


//When a course is created, it needs to be associated with the creator. In a new Enrollments/dao.js file, implement enrollUserInCourse to enroll, or associate, a user to a course.
import Database from "../Database/index.js";
import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course"); //populate("course") function replaces the course primary key value in the enrollments document with the actual course document from the courses collection corresponding to the key's value.
  return enrollments.map((enrollment) => enrollment.course); //enrollments.map() operation unwraps the enrollments array and returns a new array with just the course objects.
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}


export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}


export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: Date.now(), user: userId, course: courseId });
// }

// export function UnenrollUserFromCourse(userId, courseId) {
//   const { enrollments } = Database;
//   Database.enrollments = enrollments.filter(
//     (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
//   );

// }

export function getEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

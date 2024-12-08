////implement a DAO to retrieve all courses from the Database.
import model from "./model.js";



export function findAssignmentsForCourse(courseId) {
  return model.find({ course: courseId });
}
//retrieve assignment through course ID


//acepts new assignment as a parameter, and then sets its primary key and appends new assingment to the databases assignment array
export function createAssignment(assignment) {
  delete assignment._id;
  return model.create(assignment);
}

//delete an assignment from the database through filtering its id
export function deleteAssignment(assignmentId) {
  // const { assignments } = Database;
  // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
  return model.deleteOne({ _id: assignmentId });
 }
 
 export function updateAssignment(assignmnetId, assignmentUpdates) {
  // const { assignments } = Database;
  // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  // Object.assign(assignment, assignmentUpdates);
  // return assignment;
  return model.updateOne({ _id: moduleId}, moduleUpdates);
}


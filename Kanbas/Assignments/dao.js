import Database from "../Database/index.js";


export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignments) => assignments.course === courseId);
}
//retrieve assignment through course ID


//acepts new assignment as a parameter, and then sets its primary key and appends new assingment to the databases assignment array
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];
  return newAssignment;
}

//delete an assignment from the database through filtering its id
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
 }
 
 export function updateAssignment(assignmnetId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}


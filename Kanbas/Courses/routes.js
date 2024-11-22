import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js";
import * as enrollmentDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {



  //for enrollments, to enroll in a course
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body; // Extract the user ID from the request body

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    enrollmentDao.enrollUserInCourse(userId, courseId);
    res.status(201).send({ message: "User enrolled successfully" });
  });


  //for enrollments, to unenroll from a course for a user
  app.delete("/api/courses/:courseId/enrollments", async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body; // Extract the user ID from the request body

    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }

    const status = await enrollmentDao.UnenrollUserFromCourse(courseId, userId);
    res.send(status);

  });

  //this is for modules get
  //retrieves  modules from course through the course ID
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  //for assignment to get
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });



  //parses the ID of the course and then uses the update course function in the DAO to update the course with the updates in the HTTP REQUEST body.
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });


  //delete route that parses the course's ID from the URL and uses the deleteCourse DAO function. if successful, then send 204 status
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });

  //Use the DAO to implement a route that retrieves all the courses.
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  //for modules update
  //sets the modules course id to the course ID for modules to know what course the module belongs to. then 
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module); //uses the DAO function to create the new module and respond with the new module
    res.send(newModule);
  });


  //for assignment update
  //sets the assignment course id to the course ID for assignments to know what course the assignment belongs to. then 
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = modulesDao.createAssignment(assignment); //uses the DAO function to create the new module and respond with the new module
    res.send(newAssignment);
  });




}


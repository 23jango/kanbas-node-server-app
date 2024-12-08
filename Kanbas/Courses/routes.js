import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentDao from "../Assignments/dao.js";
import * as enrollmentDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {

//for people tab under course, to get only users enrolled in that course
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);




  app.get("/api/courses/:courseId", async (req, res) => {
    const { cid } = req.params;
    try {
      const course = await Course.findById(cid); // Example: MongoDB query
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });
 


  //creating a course into the database on mongoose
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);

    const currentUser = req.session["currentUser"];

    //automatically enroll user in course if user created course
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });

  //for enrollments, to enroll in a course
  app.get("/api/courses/:courseId/enrollments", async (req, res) => {
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
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  //for assignment to get
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  //parses the ID of the course and then uses the update course function in the DAO to update the course with the updates in the HTTP REQUEST body.
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  //delete route that parses the course's ID from the URL and uses the deleteCourse DAO function. if successful, then send 204 status
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  //Use the DAO to implement a route that retrieves all the courses.
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  //for modules update
  //sets the modules course id to the course ID for modules to know what course the module belongs to. then
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module); //uses the DAO function to create the new module and respond with the new module
    res.send(newModule);
  });

  //for assignment update
  //sets the assignment course id to the course ID for assignments to know what course the assignment belongs to. then
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await modulesDao.createAssignment(assignment); //uses the DAO function to create the new module and respond with the new module
    res.send(newAssignment);
  });
}


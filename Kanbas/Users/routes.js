import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
// let currentUser = null;
export default function UserRoutes(app) {
  //a restful API that can make users make new users!
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  //uses the enrollements dao to fetch courses that the user is enrolled in stored in mongodb
  const findCoursesForUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    //if admin, respond with all courses
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    if (uid === "current") {
      uid = currentUser._id;
    }
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };
  app.get("/api/users/:uid/courses", findCoursesForUser);

  //uses the DAO from enrollments to implement post route
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);

  //uses the DAO from enrollments to implement delete route
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

  //makes the deletuser option available from the DAO as a restful API for integration with the user interface which encodes the id of the user to remove as a path parameter.
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  //The signup route expects a user object with at least the properties username and password. The DAO's findUserByUsername is called to check if a user with that username already exists. If such a user is found a 400 error status is returned along with 1an error message for display in the user interface. If the username is not already taken the user is inserted into the database and stored in the currentUser server variable. The response includes the newly created user. The signup route is mapped to the api/users/signup path.
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    console.log("Received request at /api/users/signin"); // Confirm route is hit
    console.log("Request body:", req.body); // Confirm body is parsed
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }

    console.log(req.body);
  };

  const profile = async (req, res) => {
    //If a user has already signed in, the currentUser can be retrieved from the session by using the profile route as shown below. If there is no currentUser, an error is returned.
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };

  const signout = async (req, res) => {
    // currentUser = null;
    req.session.destroy(); //Users can be signed out by destroying the session.
    res.sendStatus(200);
  };

  //retrieve courses in the user routes-- since enrolled courses are retrieved within the context of currently logged in user
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  //create a new course and then enroll the currentUser in the new course. Respond with the newCourse so it can be rendered in the user interface.
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);

  // - the DAO function by the same name is now made available by a restful API through here
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  //responds with a collection of users retrieved from the database
  const findAllUsers = async (req, res) => {
    //searching for a specific role
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  //make the DAO function available as a RESTful Web API. Map a route that accepts a user's primary key as a path parameter, passes the ID and request body to the DAO function and responds with the status.
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      req.session["currentUser"] = { ...currentUser, ...userUpdates };
      //If a user updates their profile, then the session must be kept in synch.
    }
    res.json(currentUser);
  };
  app.put("/api/users/:userId", updateUser);

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

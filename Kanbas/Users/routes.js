import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
// let currentUser = null;
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };

  //make the DAO function available as a RESTful Web API. Map a route that accepts a user's primary key as a path parameter, passes the ID and request body to the DAO function and responds with the status.
  const updateUser = (req, res) => { 
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser; //If a user updates their profile, then the session must be kept in synch.
    res.json(currentUser);

  };


  //The signup route expects a user object with at least the properties username and password. The DAO's findUserByUsername is called to check if a user with that username already exists. If such a user is found a 400 error status is returned along with an error message for display in the user interface. If the username is not already taken the user is inserted into the database and stored in the currentUser server variable. The response includes the newly created user. The signup route is mapped to the api/users/signup path.
  const signup = (req, res) => {
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };


  const signin = (req, res) => {
    console.log("Received request at /api/users/signin"); // Confirm route is hit
    console.log("Request body:", req.body); // Confirm body is parsed
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);

    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }

    console.log(req.body)
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


  const signout = (req, res) => {
    // currentUser = null;
    req.session.destroy(); //Users can be signed out by destroying the session.
    res.sendStatus(200);
  };


  //retrieve courses in the user routes-- since enrolled courses are retrieved within the context of currently logged in user
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

  //create a new course and then enroll the currentUser in the new course. Respond with the newCourse so it can be rendered in the user interface.
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };
  app.post("/api/users/current/courses", createCourse);




  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}

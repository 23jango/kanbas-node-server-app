import express from 'express'; // equivalent to import
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import "dotenv/config"; // import the new dotenv library to read .env file
import session from "express-session"; // import new server session library
import ModuleRoutes from "./Kanbas/Modules/routes.js";

import AssignmentRoutes from "./Kanbas/Assignments/routes.js";

import EnrollmentsRoutes from './Kanbas/Enrollments/routes.js';


const app = express() // create new express instance

app.use(
  cors({
    credentials: true, // support cookies
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
    //restrict network access to come only from the React application
  })
);// make sure cors is used right after creating the app
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") { // in production
  sessionOptions.proxy = true;// turn on proxy support
  sessionOptions.cookie = {// configure cookies for remote server
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));


// this is a default session configuration that works fine
// locally, but needs to be tweaked further to work in a
// remote server such as AWS, Render, or Heroku. See later
// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };
// app.use(
//   session(sessionOptions)
// );


app.use(express.json()); //endure this statement is after CORS call
//approach to encode the data as JSON in the HTTP request body which allows for arbitrarily large amounts of data as well as secure data encryption.

app.use(express.json()); // listen to http://localhost:4000 -- do all ur work after this line

UserRoutes(app); //The Node.js server implements uses routes to integrate with the user interface and implements DAOs to communicate with the Database. The server functions between these two layers, which is why it is often called the middle tier in a multi-tiered application.

CourseRoutes(app);

Lab5(app);// pass reference to express module
//Hello(app);// pass reference to express module
ModuleRoutes(app);

AssignmentRoutes(app);

EnrollmentsRoutes(app);

app.listen(process.env.PORT || 4000)


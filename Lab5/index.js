import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";

export default function Lab5(app) { // accept app reference to express module
  app.get("/lab5/welcome", (req, res) => { // create route to welcome users to Lab 5.
    res.send("Welcome to Lab 5"); // Here we are using the new arrow function syntax

  });
  PathParameters(app); //so pathparameters can work
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
};

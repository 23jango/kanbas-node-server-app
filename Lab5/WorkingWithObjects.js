const assignment = { // object state persists as long
// as server is running
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS", // changes to the object persist

  due: "2021-10-10", completed: false, score: 0,
}; // rebooting server resets the object

const module = { // object state persists as long
  // as server is running
    id: 1, name: "moduleOne",
    description: "an amazing module desciption", // changes to the object persist
    course: "Web Dev",
  }; // rebooting server resets the object

export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });
  //you can also modify
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;// changes to objects in the server

    assignment.title = newTitle; // persist as long as the server is running

    res.json(assignment);// rebooting the server resets the object state
  });
  //modify score
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;// changes to objects in the server

    assignment.score = newScore; // persist as long as the server is running

    res.json(assignment);// rebooting the server resets the object state
  });
  //modify completed
  app.get("/lab5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params;// changes to objects in the server

    assignment.completed = newCompleted; // persist as long as the server is running

    res.json(assignment);// rebooting the server resets the object state
  });

  //now modules

  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });
  //you can also modify
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;// changes to objects in the server

    module.name = newName; // persist as long as the server is running

    res.json(module);// rebooting the server resets the object state
  });
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;// changes to objects in the server

    module.description = newDescription; // persist as long as the server is running

    res.json(module);// rebooting the server resets the object state
  });

};// use .json() instead of .send() if you know
// the response is formatted as JSON


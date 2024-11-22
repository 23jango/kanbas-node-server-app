let todos = [ { id: 1, title: "Task 1", completed: false },  { id: 2, title: "Task 2", completed: true },
              { id: 3, title: "Task 3", completed: false },  { id: 4, title: "Task 4", completed: true }, ];
export default function WorkingWithArrays(app) {

  //make sure this is above the /lab5/todos/:id -- creating a todo - also this is the old way of doing things, and returns the whole list of all items, which we dont really need
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  //the "correct" way to implement creating a new todo- which basically uses post instead of get- for more formal http- does not respond with the entire todos array and instead only responds with the newly created todo object instance
  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body,  id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  //OLD
  //delete functionality
  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  });

  //NEW
  //deleting using actual DELETE
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));

    //the exercise below throws exceptions if the items being deleted or updated don't actually exist
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });

  //Note that this new implementation does not respond with the todos array, but instead responds with a simple OK status code of 200. 
  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  });



  app.get("/lab5/todos", (req, res) => {
    // refactors the /lab5/todos to handle the case when we want to filter the array by the completed query parameter.
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }

    res.json(todos);
  });

  //finding a particular todo with the ID (key)
  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  //updating the todo's title
  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });

  //updating the todo's description
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });

  //updating the todo's completed status
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed;
    res.json(todos);
  });


};

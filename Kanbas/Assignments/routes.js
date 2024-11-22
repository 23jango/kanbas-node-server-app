import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {

  //implement an HTTP PUT request handler that parses the ID of the course from the URL and the assignment updates from the HTTP request body. Use the DAO's updateassignment function to apply the updates to the assignment. If successful, respond with HTTP status 204.
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  });


 app.delete("/api/assignments/:assignmentId", async (req, res) => {
   const { assignmentId } = req.params;
   const status = await assignmentsDao.deleteAssignment(assignmentId);
   res.send(status);
  });


}


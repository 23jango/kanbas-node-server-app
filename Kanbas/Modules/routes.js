//Create a router file for the Modules and implement a route that handles an HTTP DELETE to remove a module by its ID. Parse the module's ID from the path and use the DAO's deleteModule function to remove the module from the Database. If successful, respond with status 204.


import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {

  //parses ID of the course through the URL and and module updates from the HTTP request body. use the DAO's updateModule to apply the updates to the module.
  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });



  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });
}

//import Database from "../Database/index.js";
import model from "./model.js";

//acepts new module as a parameter, and then sets its primary key and appends new module to the databases module array
export function createModule(module) {
  delete module._id;
  return model.create(module);
  // const newModule = { ...module, _id: Date.now().toString() };
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
}

//update a module by its ID
export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId}, moduleUpdates);
  // const { modules } = Database;
  // const module = modules.find((module) => module._id === moduleId);
  // Object.assign(module, moduleUpdates);
  // return module;
}

//remove a module by its ID
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
  // const { modules } = Database;
  // Database.modules = modules.filter((module) => module._id !== moduleId);
}



export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
  // const { modules } = Database;
  // return modules.filter((module) => module.course === courseId);
}

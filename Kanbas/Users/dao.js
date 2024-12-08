import model from "./model.js";

//retrieve all  users from user collection
export const findAllUsers = () => model.find();

//finding by users' first of last name
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  //creating a regular expression used to pattern match the firstName or lastName fields of the documents in the users collection
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }], //regex- regular expression
  });
};

export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

//retrieving user document through users primary key
export const findUserById = (userId) => model.findById(userId);

export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

//update a singluar user by getting its userID and updating the matching fields in the user parameter
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

//removes a single user from the database based on its primary key
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

//if yopu wanna insert a new user object into the users collection
export const createUser = (user) => {
  delete user._id // remove _id field if user wants to pass in a new one
  return model.create(user);
}

export const findUserByUsername = (username) =>
  model.findOne({ username: username });


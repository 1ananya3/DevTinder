const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailId: { type: String },
  password: { type: String },
  age: { type: Number },
  gender: { type: String },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;

//whenevr i refer to a model the name will start with capital letter - says that its a model/ its defining a collecton
//this is like a class (user class) = > whenever i create a collection it holds some data => this is like a user class and we are creating a small new instances of the user class whenever new user comes in
//model is basically class creates own instances
//schema is function on top of mongoose
//schema is telling what all info we are storing into database for a user collection

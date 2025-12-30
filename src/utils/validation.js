var validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 1 || lastName.length < 1) {
    throw new Error("Enter full name dont keep empty");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter valid password");
  }
};
const validateProfileEditData = (req) =>{
  const allowedEditFields=["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"]
  const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
  return isEditAllowed;
}

module.exports={validateSignUp,validateProfileEditData}
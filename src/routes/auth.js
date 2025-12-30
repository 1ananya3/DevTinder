const express = require("express")
const { validateSignUp } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");


const authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added succesfully");
  } catch (error) {
    res.status(500).send("Error saving the data : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) throw new Error("Invalid Credentials");
    const isPassowordValid = await user.verifyPassword(password)

    if (isPassowordValid) {
      const token = await user.getJWT()
      res.cookie("token", token,{ expires: new Date(Date.now() + 900000)});

      res.send("Login successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).send("Error saving the data : " + error.message);
  }
});

authRouter.post("/logout",async (req,res)=>{
    // res.cookie("token",null,{expires:new Date(Date.now())})
    // res.send();
    res.cookie("token",null,{expires:new Date(Date.now())}).send("Logout Successful")  //chain both method 
})

module.exports = authRouter ; //why did not i write {authRouter}
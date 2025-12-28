const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user")

app.post("/signup",async (req,res)=>{
    const userObj= {
        firstName:"Ananya",
        lastName:"Mohanta",
        emailId:"ananya@gmail.com",
        password:"abc@123"
    }
    const user = new User(userObj) 
    try {
        await user.save(); 
    res.send("User added succesfully")
    } catch (error) {
        res.status(500).send("Error saving the data",error.message)
    }
    
})



connectDB()
  .then(() => {
    console.log("Database connection successful!");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database can't be connected");
  });

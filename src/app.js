const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUp } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth} =require("./middlewares/auth")

//Ananya@123 dfkjk&fjs^wefhj
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

app.get("/profile",userAuth, async (req, res) => {
 try {
  const user =req.user
  res.send(user);
 } catch (error) {
  res.status(500).send("Error : "+error.message)
 }
});
app.post("/sendConnectionRequest",userAuth,(req,res)=>{
  const user=req.user
  console.log("sending request")
  res.send(user.firstName+" sending request")
})
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    console.log(userId);
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted succesfully");
  } catch (err) {
    res.status(500).send("User not found");
  }
});

app.patch("/user/:userId",userAuth ,async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (data?.skills.length > 10)
      throw new Error("Skills cant be more than 10");

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("User updated successfully");
    console.log(user);
  } catch (err) {
    res.status(500).send("Something went wrong : " + err.message);
  }
});

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

const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    // .populate("fromUserId", "firstName", "lastName");
    res.send({ message: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    res.status(500).send({ message: "Somethng went wrong " + error.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // A - B =accepted
    // B - C =accepted
    // status = accepted and fromUser and toUser is B

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", ["firstName", "lastName", "gender"])
      .populate("toUserId", ["firstName", "lastName", "gender"]);
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString())
        return row.toUserId;
      return row.fromUserId;
    });
    res.send({
      message: "COnnection found succesful",
      data: data,
    });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong " + error.message });
  }
});
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", "firstName")
      .populate("toUserId", "firstName");

    const hideUsersFromField = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromField.add(req.fromUserId);
      hideUsersFromField.add(req.toUserId);
    });
    // console.log(hideUsersFromField);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromField) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName, lastName, age, gender, photoUrl")
      .skip((page - 1) * limit)
      .limit(limit);
    // console.log(users)

    res.send({ message: "Data fetched successfully", data: users });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = userRouter;

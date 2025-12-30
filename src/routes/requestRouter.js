const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status))
        throw new Error("Invalid status type");

      const toUser = await User.findById(toUserId);
      if (!toUser) throw new Error("User not found");

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest)
        return res
          .status(400)
          .send({ message: "Already connection request exists" });
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.send({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data: data,
      });
    } catch (error) {
      res.status(500).send("error : " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestedId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        throw new Error("Status not allowed");

      const connectionRequest = ConnectionRequest.findOne({
        _id: requestedId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) throw new Error("Connection reuest not found");
      connectionRequest.status = status;
      const data = await connectionRequest.save()
      res.send({
        message: "Conenction Request " + status,
        data: data,
      });

      //requestid should be valid
    } catch (error) {
      res.status(500).send({ message: "error : " + error.message });
    }
  }
);

module.exports = requestRouter;

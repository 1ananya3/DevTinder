const express = require("express")
const {userAuth} =require("../middlewares/auth")

const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{
  const user=req.user
  console.log("sending request")
  res.send(user.firstName+" sending request")
})

module.exports = requestRouter
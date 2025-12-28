const express=require("express")

const app=express(); 

app.use("/",(req,res)=>{
    res.send("Hello from server!")  
})
app.use("/test",(req,res)=>{
    res.send("Hello from server for /test!")  
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
}) 
//handling any incoming request
//expressjs application -- this is like creating web server using express framwork
//listen on a port 
//request handler -callbak function

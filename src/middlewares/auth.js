const adminAuth = (req,res,next)=>{
    console.log("Admin auth checked")
 const token="xyz"
    const isAdminAuthorised = token === "xyz"
    if(!isAdminAuthorised)  res.status(401).send("unauthorised")
    else next()
}
const userAuth = (req,res,next)=>{
    console.log("User auth checked")
 const token="xyza"
    const isUserAuthorised = token === "xyz"
    if(!isUserAuthorised)  res.status(401).send("unauthorised")
    else next()
}
module.exports = {adminAuth,userAuth}
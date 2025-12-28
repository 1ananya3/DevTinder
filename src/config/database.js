const mongoose=require("mongoose")


const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://ananyamohanta80_db_user:IZn7muMidQY3hDzq@namastenode.trowgrn.mongodb.net/devTinder")
}
module.exports={connectDB}

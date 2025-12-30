const mongoose = require("mongoose");
var validator = require('validator');
const jwt = require("jsonwebtoken");
const { default: isEmail } = require("validator/lib/isEmail");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  emailId: { type: String, required: true, unique: true,lowercase:true,trim:true,
    validate(value)
    {
      if(!validator.isEmail(value)) {throw new Error("Email is not valid")}
    }
   },
  password: { type: String, required: true,
    validate(value){
      if(!validator.isStrongPassword(value)) throw new Error("password is not strong")
    }
   },
  age: { type: Number,min:18 },
  gender: { type: String ,
    validate(value){
      if(!["male",'female',"others"].includes(value)){
        throw new Error("Gender data is not validated succesfully!")
      }
    }
  },
  photoUrl: { type: String, default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" ,
    validate(value){
      if(!validator.isURL(value)) throw new Error("Photourl is not valid")
    }
  },
  about: { type: String, default: "This is is default about" },
  skills: { type: [String] }
},{timestamps:true});

userSchema.methods.getJWT= async function(){
  const user=this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder^1123",{ expiresIn: '1d' });
  return token;
}
userSchema.methods.verifyPassword = async function(passwordInputByUser){
  const user=this;
  const passwordHash = user.password
  const isPassowordValid = await bcrypt.compare(passwordInputByUser,passwordHash );
  return isPassowordValid
}
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;

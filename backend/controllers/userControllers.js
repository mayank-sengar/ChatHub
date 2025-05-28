import expressAsyncHandler from "express-async-handler";
import  User from "../models/userModel.js"
import { generateToken } from "../config/generateToken.js";


const registerUser= expressAsyncHandler(async (req,res)=>{
    const {name ,email, password, picture} = req.body
    if(!name.trim() || !email.trim() || !password){
    res.status(400);
    throw new Error("Please Enter all the fields");
    }

    const userExists =await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error ("User already registered")
    }


    const newUser = await User.create({
        name,
        email,
        password,
        picture
    })

    if(newUser){
        res.status(201).json({
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        picture : newUser.picture,
        token: generateToken(newUser._id)

        });       
    }
    else{
        res.status(400);
        throw new Error("User not found")
    }

})

const authUser= expressAsyncHandler(async (req,res)=>{
  const {email,password} =req.body
  console.log("Login attempt for email:", email);

  if(!email.trim() || !password){
    res.status(400)
    throw new Error("Email and password fields both are required")
  }
 

  const user=await User.findOne({email})
  console.log("User found:", user ? "Yes" : "No"); // Log if user was found

  if(user){
    try {
      const isMatch = await user.matchPassword(password);
      console.log("Password match:", isMatch ? "Yes" : "No"); // Log password match result
      
      if (isMatch) {
        res.status(200); 
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          token: generateToken(user._id),
        });
      }
    } catch (error) {
      console.error("Password match error:", error);
    }
  }

  res.status(401)
  throw new Error("Email or password is incorrect")
}
)

export {registerUser ,authUser}
import mongoose from "mongoose";
import bcrypt    from "bcrypt"

const userSchema = mongoose.Schema(
    {
      name:{
        type:String,
        required: true
      },
      email:{
        type:String,
        unique: true,
        required: true
      },
      password:{
       type:String,
        required: true 
      },
      picture:{
         type:String,
        required:true,
        default:"https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
      }

    },{
        timestamps:true,
    }
)
//pre =>> before 'save' saving
//next as it is middleware

userSchema.pre('save', async function (next){
  if(!this.isModified('password')) return next();
  const salt= await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
  next();
})


userSchema.methods.matchPassword = async function(inputpassword) {
  console.log('Stored hashed password:', this.password);
  console.log('Input password:', inputpassword);
  const isMatch = await bcrypt.compare(inputpassword, this.password);
  console.log('Password match result:', isMatch);
  return isMatch;
}

const User = mongoose.model("User",userSchema);

export default User


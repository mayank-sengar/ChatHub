import mongoose from "mongoose";

const connectDB =async() => {
    try{
     const conn=await mongoose.connect(process.env.MONGO_URI);
     
 //host name of db
     console.log(`MongoDB connected : ${conn.connection.host}` )
    }
    catch(err){
        console.log("Database connection error ",err);
        process.exit(1);
    }
};

export default connectDB;
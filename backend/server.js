import express from "express"
import chats from "./data/data.js"
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"

dotenv.config({ path: './backend/.env' });
const app = express();

app.use(express.json()); //to accept json data

app.use(cors());
connectDB();

app.get("/api/chats",(req,res)=>{

    res.json(chats);
})

app.get("/api/chats/:id",(req,res)=>{
    
    const singleChat=chats.find((c)=>
         c._id === req.params.id
    )

    res.json(singleChat);
})

app.use('/api/user',userRoutes)

app.use(notFound);
app.use(errorHandler);



app.listen(process.env.PORT || 8000, () => {
    console.log(`Server started at PORT ${process.env.PORT || 8000}`);
});
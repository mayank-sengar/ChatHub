import asyncHandler from 'express-async-handler'
import Chat from '../models/chatModel.js'
import User from '../models/userModel.js' // Import User model

//creating and fetching one-one chatt 

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body

    if (!userId) {
        console.log("UserId param not sent with request")
        return res.status(400).send({ message: "UserId param not sent with request" })
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { user: { $elemMatch: { $eq: req.user._id } } },
            { user: { $elemMatch: { $eq: userId } } }
        ],
    }).populate("users", "-password")
        .populate("lastMessage");

// Chat.populat() also => both runs fine as it is just a method call from the mongoose model 
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name picture email",
    });


    if (isChat.length > 0) {
        res.send(isChat[0])
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId,]
        };


        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat)
        }
        catch (error) {
            res.status(400).send({ message: error.message })
        }
    }

})

//to fetch all the chats the logged in user
const fetchChats=asyncHandler(async(req,res)=>{
     try{
    const allChat = await Chat.find({
        users:{$elemMatch :{$eq: req.user._id}}
    })//.then((result) => res.send(result)) //it .find() returns a promise 
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("groupAdmin")
    .sort({updatedAt:-1}) //-1 => ascending
    
    //doubt 
   allChat = await User.populate(allChat, {
        path: "latestMessage.sender",
        select: "name picture email",
    });

      return res.status(200).send(allChat);
    }
    catch(error){
        res.status(400).send({ message: error.message })
    }


})


const createGroupChat = asyncHandler (async (req,res)=>{
    if(!req.body.users || !req.body.name){
       return res.status(400).send({message : "Please fill all the fields"}); 
    }

    //Take the users field from the request body, 
    // which is expected to be a JSON string, 
    // and convert it into a JavaScript object or array.
    var users = JSON.parse(req.body.users);

    if(users.length <2){
     return res
     .status(400)
     .send("More than 2 users are required to form a group chat");
    }

     users.push(req.user);

     try{
        const groupChat = await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin: req.user,
        });

     const fullGroupChat = await Chat.findOne({_id : groupChat._id })
     .populate("users", "-password")
     .populate("groupAdmin","-password");

     res.status(200).json(fullGroupChat);


    } catch(error){
 res.status(400).send({ message: error.message })
    }


})

const renameGroup = asyncHandler(async(req,res)=>{
    const {chatId,newchatName}= req.body;

const updatename=await Chat.findByIdAndUpdate(
    //find
    chatId,
    //update
    {
        chatName: newchatName,
    },
    {
        //must to return a new chat 
        new:true,
    }

)
.populate("users" , "-password")
.populate("groupAdmin", "-password");

if(!updatename){
    return res.status(404).json({ message: "Chat not found" });
}
else{
    res.json(updatename);
}
})

const addToGroup=asyncHandler(async (req,res)=>{
  const {chatId,newMember} = req.body;
  
//   var newMember02=JSON.parse(newMember)


  const addMember=await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: newMember }
      },
      {
        new:true
      }
  ).populate("users" , "-password")
.populate("groupAdmin", "-password");


if(!addMember){
    return res.status(404).json({ message: "Chat not found" });
}
else{
    res.json(addMember);
}

});

const removeFromGroup=asyncHandler(async (req,res)=>{
  const {chatId,membertoremove} = req.body;
  
//   var membertoremove02=JSON.parse(membertoremove)


  const removeMember=await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: membertoremove }
      },
      {
        new:true
      }
  ).populate("users" , "-password")
.populate("groupAdmin", "-password");


if(!removeMember){
    return res.status(404).json({ message: "Chat not found" });
}
else{
    res.json(removeMember);
}

});

export { accessChat,fetchChats,createGroupChat,renameGroup,addToGroup,removeFromGroup }

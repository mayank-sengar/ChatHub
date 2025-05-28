import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { background } from '@chakra-ui/react';


const Chat = () => {
const [chats,setChats] = useState([]);
    const fetchChats= async ()=>{
       
            const { data } = await axios.get("/api/chats");
            setChats(data);
            console.log(data)
        
    }

    //whenever component is rendered function is called
    useEffect(()=>{
         fetchChats();
        }, [])
    
  return (
    <div>{chats.map(
        (chat)=>
            <div key={chat._id}>
                <div>{chat.chatName} </div>
               <div> {chat.isGroupChat?"Group":"contact"} </div>
                </div>
        
    )}</div>
  )
}

export default Chat
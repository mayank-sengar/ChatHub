import React,{useState} from 'react'
import { VStack ,FormControl, FormLabel,Input, InputGroup, InputRightElement,Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'



const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
const [isLoading,setisLoading]=useState(false);
const [showPassword, setShowPassword] = useState(false);


const toast = useToast();
const history = useHistory();

const submitHandler = async ()=>{
 setisLoading(true);
if( !email || !password){
  toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setisLoading(false);
      return;

}

try{
   const config = {
    headers: {
   "Content-type": "application/json",
  },
  };

   const {data} = await axios.post("/api/user/login",{email,password},config)

   localStorage.setItem("userInfo", JSON.stringify(data));
   setisLoading(false)
   //navigate
   history.push('/chats')
}
catch(err){
toast({
        title: "Error Occured",
        description: "Failed to register",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setisLoading(false)
      return;
}




}


const handlePasswordDisplay = () => setShowPassword(!showPassword);

  return (
    <VStack spacing='5px'  color='black'>

    <FormControl id='email' isRequired>
    <FormLabel>Email</FormLabel>
    <Input
    placeholder='Enter your email'
    onChange={(e)=> setEmail(e.target.value)}
    />
    
    </FormControl>

     <FormControl id='password' isRequired>
    <FormLabel>Password</FormLabel>
    <InputGroup>
    <Input
    type={showPassword?'text':'password'}
    placeholder='Enter your password'
    onChange={(e)=> setPassword(e.target.value)}
    />
    <InputRightElement width="4.5rem">
     <Button h="1.75rem" size="sm" onClick={handlePasswordDisplay}>
      {  showPassword ? "Hide" : "Show" }
     </Button>
    </InputRightElement>

    </InputGroup>
    </FormControl>

    



    <Button 
      bg="black" 
     color="white"
    _hover={{ bg: "gray.700" }}
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={isLoading}
        onClick={submitHandler}
     >

     Submit
    </Button>
    </VStack>
  );


}

export default Login
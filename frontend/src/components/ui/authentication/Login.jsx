import React,{useState} from 'react'
import { VStack ,FormControl, FormLabel,Input, InputGroup, InputRightElement,Button} from '@chakra-ui/react'



const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

const [showPassword, setShowPassword] = useState(false);



const submitHandler =()=>{

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
    onChange={(e)=> setEmail(e.target.value)}
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
        onClick={submitHandler}
     >

     Submit
    </Button>
    </VStack>
  );


}

export default Login
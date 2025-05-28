import React,{useState} from 'react'
import { VStack ,FormControl, FormLabel,Input, InputGroup, InputRightAddon, InputRightElement,Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


const SignUp = () => {
      const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [picture, setPicture] = useState();
 ;
const [showPassword, setShowPassword] = useState(false);
const [picLoading,setPicLoading] =useState(false);
const toast = useToast()


const postDetails=(pic) => {
setPicLoading(true);
if(pic === undefined){
 toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
}
 console.log(pic);

if(pic.type === "image/jpeg" || pic.type === "image/png"){
  //allows you to easily construct a set of key/value pairs 
  // representing form fields and their values

  //It's typically used when you want to send form data — especially files — via POST requests.
const data=new FormData();
data.append("file",pic);
data.append("upload_preset","ChatAPP")
fetch("https://api.cloudinary.com/v1_1/dsraat90g/image/upload", {
  method:"post",
  body : data,
})
.then((res) => res.json())
.then((data) => {
    console.log("Uploaded to Cloudinary:", data);
  if (data && data.url) {
    setPicture(data.url.toString());
  }
  setPicLoading(false);
  
})
.catch((err) => {
  console.log(err);
  setPicLoading(false);
});

}
else{
 
toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;

}


}

const submitHandler =async ()=>{
  

}
const handlePasswordDisplay = () => setShowPassword(!showPassword);

  return (
    <VStack spacing='5px'  color='black'>
    <FormControl id='first-name' isRequired>
    <FormLabel>Name</FormLabel>
    <Input
    placeholder='Enter your name'
    onChange={(e)=> setName(e.target.value)}
    />
    
    </FormControl>

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

    <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlePasswordDisplay}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>


    <FormControl id='picture' >
    <FormLabel>Upload your picture </FormLabel>
    <Input
    type="file"
    p={1.5}
    accept="image/*"
    //select 1st image if user enters multiple image
    onChange={(e)=> postDetails(e.target.files[0])}
    />
    
    </FormControl>

    <Button 
      bg="black" 
     color="white"
    _hover={{ bg: "gray.700" }}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}>
     
     Submit
    </Button>
    </VStack>
  );


};

export default SignUp
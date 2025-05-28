import React from 'react'
import { Container,Box,Text,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login  from '../components/ui/authentication/Login.jsx'
import SignUp  from '../components/ui/authentication/SignUp.jsx'
const Home = () => {
  return (
    //responsive 
    <Container maxW='wl' centerContent>
      {/* similar to div */}
    <Box display="flex"  justifyContent="center"  alignItems="center"  p={3} bg={"white"}
    w="30%" m="40px 0 15px 0" borderRadius ="lg" borderWidth="1px">
     <Text fontSize={"4xl"} fontFamily={"Work sans"} >Chat-Hub</Text>
    </Box>
  <Box bg="white" w="30%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs colorScheme={"grey"}>
  <TabList mb="1em" >
    <Tab w="50%">Login</Tab>
    <Tab w="50%">SignUp</Tab>
    
  </TabList>

  <TabPanels>
    <TabPanel>

     <Login/>

    </TabPanel>
    <TabPanel>

      <SignUp/>

    </TabPanel>
    
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

export default Home
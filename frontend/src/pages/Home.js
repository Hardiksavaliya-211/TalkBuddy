import {
  Box,
  Container,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
// import { useHistory } from "react-router";
import Login from "../components/Login";
import Signup from "../components/SignUp";
import { createBrowserHistory } from "history";
import { ChatContext } from "../context/Context";
import photo from "../asset/bg23.png";
function Home() {
  const history = createBrowserHistory();
  const { user } = ChatContext();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) window.location.href = "/chat1";
    // if (user) history.push("/chat1");
  }, [user]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="darkcyan"
        w="100%"
        padding={4}
        m="0 0 0px 0"
        color={"white"}
      >
        <Text
          fontSize="5xl"
          fontWeight={800}
          className="font-extrabold"
          fontFamily="revert"
        >
          TalkBuddy
        </Text>
      </Box>
      <Box m={5}>
        <Container bg={"lightblue"} maxW="xl" centerContent>
          <Image mt={8} src={photo} w={300} />
          <Box w="100%" p={5}>
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1em">
                <Tab color={"darkcyan"}>Login</Tab>
                <Tab color={"darkcyan"}>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { createBrowserHistory } from "history";

import { ChatContext } from "../context/Context";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = createBrowserHistory();
  const { setUser } = ChatContext();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/server/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chat1");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl p={1} id="email" isRequired>
        <FormLabel fontSize={19} color={"darkcyan"}>
          Email Address
        </FormLabel>
        <Input
          border={"2px"}
          borderColor={"white"}
          value={email}
          type="email"
          placeholder=" Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl p={1} id="password" isRequired>
        <FormLabel fontSize={19} color={"darkcyan"}>
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            border={"2px"}
            borderColor={"white"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        bg="darkcyan"
        width="100%"
        p={7}
        style={{ marginTop: 25 }}
        onClick={submitHandler}
        isLoading={loading}
        color={"white"}
        fontSize={20}
        fontWeight={600}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;

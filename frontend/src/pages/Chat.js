import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatContext } from "../context/Context.js";
import SlideDrawer from "./SlideDrawer.js";
import { Box } from "@chakra-ui/react";
import MyChat from "./MyChat.js";
import ChatBox from "./ChatBox.js";
import UserListItem from "../ChatUI/UserListItem.js";
const Chat = () => {
  const { user, selectedChat } = ChatContext();
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(() => {}, [fetchAgain, selectedChat]);
  return (
    <div style={{ width: "100%" }}>
      {user && <SlideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      ;
    </div>
  );
};

export default Chat;

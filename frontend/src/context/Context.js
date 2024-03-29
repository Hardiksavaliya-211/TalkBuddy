import React, { createContext, useContext, useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useNavigate } from "react-router";
const mainContext = createContext();

const Context = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [check, setCheck] = useState();
  const history = createBrowserHistory();
  useEffect(() => {
    console.log(user);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);
  return (
    <mainContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};

export const ChatContext = () => {
  return useContext(mainContext);
};

export default Context;

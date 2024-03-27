import { Button } from "@chakra-ui/react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./components/Login";
import My from "./pages/My";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/chat1" element={<Chat></Chat>}></Route>
        <Route path="/op" element={<My></My>}></Route>
      </Routes>
    </div>
  );
}

export default App;

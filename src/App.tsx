import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Signup_page from "./pages/signUp";
import Signin_page from "./pages/signIn";
import Chat_room from "./pages/chatRoom";
import { io } from "socket.io-client";
import { Protected } from "./protected/protect";

const socket = io(import.meta.env.VITE_HEADER, {
  transports: ["websocket"],
  autoConnect: false,
});

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup_page />} />
        <Route path='/login' element={<Signin_page />} />
        <Route path='/chartroom' element={<Chat_room socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

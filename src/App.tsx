import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/homepage";
import Signup_page from "./pages/signUp";
import Signin_page from "./pages/signIn";
import Chat_room from "./pages/chatRoom";
import { io } from "socket.io-client";
import { Protected } from "./protected/protect";
import ListingPage from "./pages/listings";
import MissingPersonForm from "./pages/addMissing";

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
        <Route path='/listings' element={<ListingPage />} />
        <Route path='/add' element={<MissingPersonForm />} />

        <Route
          path='/chartroom'
          element={
            <Protected>
              <Chat_room socket={socket} />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

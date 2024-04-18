import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/userAuth";
import { useState } from "react";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { state } = useAuth();
  const { logout } = useLogin();
  return (
    <div className='sticky top-0 left-0 w-screen p-3 bg-black text-white   flex flex-row justify-between items-center'>
      <Link to={"/"} className='font-medium text-2xl '>
        Finders
      </Link>
      <div className='font-medium  md:hidden' onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </div>
      {open && (
        <div className='absolute bottom-[-140px] right-0 bg-white p-2 rounded  shadow-md flex-col flex md:hidden'>
          <Link
            to={"/chartroom"}
            className='p-1 font-medium hover:bg-gray-100 rounded-md m-1 border-gray-500 text-gray-600'
          >
            Chats
          </Link>
          <Link
            to={"/listings"}
            className='p-1 font-medium hover:bg-gray-100 rounded-md m-1 border-gray-500 text-gray-600'
          >
            List
          </Link>
          {!state.user ? (
            <Link
              to={"/login"}
              className='border-green-500 bg-green-500 border-2 rounded px-2 mr-2 font-medium'
            >
              Login
            </Link>
          ) : (
            <div
              className='p-1 font-medium hover:bg-gray-100 rounded-md m-1 border-gray-500 text-gray-600'
              onClick={() => logout()}
            >
              Log out
            </div>
          )}
        </div>
      )}
      <div className='md:flex md:flex-row md:justify-evenly md:w-1/5 md:font-medium hidden '>
        <Link to={"/chartroom"}>Chats</Link>
        <Link to={"/listings"}>List</Link>
        {!state.user ? (
          <Link
            to={"/login"}
            className='border-green-500 hover:bg-green-500 border-2 rounded px-2 mr-2'
          >
            Login
          </Link>
        ) : (
          <div
            className='border-red-500 hover:bg-red-500 border-2 rounded px-2 mr-2'
            onClick={() => logout()}
          >
            Log out
          </div>
        )}
      </div>
    </div>
  );
};

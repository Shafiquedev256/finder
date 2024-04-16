import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/userAuth";

export const NavBar = () => {
  const { state } = useAuth();
  const { logout } = useLogin();
  return (
    <div className='sticky top-0 left-0 w-screen p-3 bg-black text-white  flex flex-row justify-between items-center'>
      <Link to={"/"} className='font-medium text-2xl '>
        Finders
      </Link>
      <div className='font-medium  md:hidden'>Menu</div>
      <div className='md:flex md:flex-row md:justify-between md:w-1/5 md:font-medium hidden '>
        <Link to={"/chartroom"}>Chats</Link>
        <Link to={"/"}>Donate</Link>
        {state.user && (
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

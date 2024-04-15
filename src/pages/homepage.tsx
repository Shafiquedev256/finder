import { NavBar } from "../components/navBar";
import addSvg from "../assets/add-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../context/userAuth";
const Home = () => {
  const { state } = useAuth();
  return (
    <div>
      <NavBar />
      <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center font-medium'>
        <div className='max-w-3xl text-center'>
          <h1 className='text-4xl font-bold text-gray-800 mb-6'>
            Welcome to Finders
          </h1>
          <p className='text-lg text-gray-600 mb-8'>
            Finders is here for you during difficult times. It's a platform
            where you can share information about missing loved ones or pets,
            helping to bring them home safely.
          </p>
          <div className='flex flex-row  justify-center items-center'>
            {state.user && (
              <Link
                to={"/"}
                className='flex flex-row  justify-center items-center mb-6 bg-green-700 w-fit text-white font-medium text-center rounded-md p-2'
              >
                <img src={addSvg} alt='Missing Person' />
                <span className='pr-3'>Missing Person </span>
              </Link>
            )}
          </div>
          <p className='text-lg text-gray-600 mb-8'>
            You're not alone in your search. Finders connects you with a caring
            community ready to lend support. Together, we can share hope and
            reunite families.
          </p>
          {!state.user && (
            <Link
              to={"/signup"}
              className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
            >
              SIGN UP
            </Link>
          )}
        </div>
        <div id='how-it-works' className='mt-12 max-w-3xl text-center'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>
            How Finders Works
          </h2>
          <p className='text-lg text-gray-600 mb-8'>
            1. Share your story: Provide details about your missing loved one .
          </p>
          <p className='text-lg text-gray-600 mb-8'>
            2. Stay informed: Keep the community updated on any developments.
          </p>
          <p className='text-lg text-gray-600 mb-8'>
            3. Support each other: Share posts and spread the word to help bring
            loved ones home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

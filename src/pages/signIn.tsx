import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

type Validate = {
  userName: string;
  password: string;
};

const Signin_page = () => {
  const { login, errorMessage, isLoading } = useLogin();
  return (
    <Formik
      initialValues={{
        userName: "",
        password: "",
      }}
      validate={(values: Validate) => {
        const errors = {} as Validate;

        if (!values.userName) {
          errors.userName = "Required";
        } else if (values.userName.length > 20) {
          errors.userName = "Must be 20 characters or less";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password should contain altleast 6 charactors";
        }

        return errors;
      }}
      onSubmit={(values) => {
        login(values.userName, values.password);
      }}
    >
      <Form className='max-w-lg mx-auto bg-gray-900 shadow-md rounded-lg p-8 space-y-6'>
        <div className='text-white font-bold text-center text-2xl'>
          Welcome Back Finder !
        </div>
        {errorMessage && (
          <div className='w-[90%] h-fit bg-red-300 rounded-md p-2 text-center top-5  text-red-600 font-bold'>
            {errorMessage}
          </div>
        )}
        {/* user Name */}
        <div className='flex flex-col'>
          <label htmlFor='userName' className='text-gray-300'>
            User Name
          </label>
          <Field
            id='userName'
            name='userName'
            type='text'
            className='border border-gray-700 rounded-md px-3 py-2 mt-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500'
          />
          <ErrorMessage
            name='userName'
            component='div'
            className='text-red-500 text-sm'
          />
        </div>

        {/*password Address */}
        <div className='flex flex-col'>
          <label htmlFor='password' className='text-gray-300'>
            Password
          </label>
          <Field
            id='password'
            name='password'
            type='password'
            className='border border-gray-700 rounded-md px-3 py-2 mt-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500'
          />
          <ErrorMessage
            name='password'
            component='div'
            className='text-red-500 text-sm'
          />
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='  flex flex-row space-x-3 items-center justify-center bg-green-600 hover:bg-green-700 w-[100%] text-white rounded-md p-3 mt-4 focus:outline-none focus:bg-green-700 transition-colors duration-300'
        >
          {isLoading ? (
            <span className='p-2 border-t-2 border-t-white rounded-full animate-spin'></span>
          ) : (
            <span>Log In</span>
          )}
        </button>
        <div className='text-white'>
          Don't Have Account ?{" "}
          <Link to={"/signup"} className='text-blue-400 underline'>
            signUp
          </Link>{" "}
        </div>
      </Form>
    </Formik>
  );
};

export default Signin_page;

import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

type Validate = {
  FullName: string;
  userName: string;
  email: string;
  password: string;
  location: string;
};

const Signup_page = () => {
  const { signup, errorMessage, isLoading } = useSignup();
  return (
    <Formik
      initialValues={{
        FullName: "",
        userName: "",
        email: "",
        password: "",
        location: "",
      }}
      validate={(values: Validate) => {
        const errors = {} as Validate;

        if (!values.FullName) {
          errors.FullName = "Required";
        } else if (values.FullName.length > 20) {
          errors.FullName = "Must be 15 characters or less";
        }

        if (!values.userName) {
          errors.userName = "Required";
        } else if (values.userName.length > 10) {
          errors.userName = "Must be 20 characters or less";
        }

        if (!values.location) {
          errors.location = "Required";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password should contain altleast 6 charactors";
        }

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        return errors;
      }}
      onSubmit={(values) => {
        signup(
          values.FullName,
          values.userName,
          values.email,
          values.password,
          values.location
        );
      }}
    >
      <Form className='max-w-lg mx-auto relative bg-gray-900 shadow-md rounded-lg p-8 space-y-6'>
        {/* First Name */}
        <div className='text-white font-bold text-center text-2xl'>
          Become a Finder Today
        </div>
        {errorMessage && (
          <div className='w-[90%] h-fit bg-red-300 rounded-md p-2 text-center top-5  text-red-600 font-bold'>
            {errorMessage}
          </div>
        )}
        <div className='flex flex-col'>
          <label htmlFor='FullName' className='text-gray-300'>
            Full Name
          </label>
          <Field
            id='FullName'
            name='FullName'
            type='text'
            className='border border-gray-700 rounded-md px-3 py-2 mt-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500'
          />
          <ErrorMessage
            name='FullName'
            component='div'
            className='text-red-500 text-sm'
          />
        </div>

        {/* userName */}
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

        {/* Email Address */}
        <div className='flex flex-col'>
          <label htmlFor='email' className='text-gray-300'>
            Email Address
          </label>
          <Field
            id='email'
            name='email'
            type='email'
            className='border border-gray-700 rounded-md px-3 py-2 mt-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500'
          />
          <ErrorMessage
            name='email'
            component='div'
            className='text-red-500 text-sm'
          />
        </div>

        {/* Location */}
        <div className='flex flex-col'>
          <label htmlFor='location' className='text-gray-300'>
            Location
          </label>
          <Field
            id='location'
            name='location'
            type='location'
            className='border border-gray-700 rounded-md px-3 py-2 mt-1 bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500'
          />
          <ErrorMessage
            name='location'
            component='div'
            className='text-red-500 text-sm'
          />
        </div>

        {/* Password */}
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
            <span> Sign Up</span>
          )}
        </button>
        <div className='text-white'>
          Already a member ?{" "}
          <Link to={"/login"} className='text-blue-400 underline'>
            Log in
          </Link>{" "}
        </div>
      </Form>
    </Formik>
  );
};

export default Signup_page;

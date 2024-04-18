import { Formik, Field, Form, ErrorMessage } from "formik";
import { useUpload } from "../hooks/useUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface MissingPersonFormData {
  fullName: string;
  age: string;
  gender: string;
  lastSeenLocation: string;
  dateLastSeen: string;
  description: string;
  contactName: string;
  contactNumber: string;
}

const MissingPersonForm: React.FC = () => {
  const navigate = useNavigate();
  const { upload, uploadedImage } = useUpload();
  const initialValues: MissingPersonFormData = {
    fullName: "",
    age: "",
    gender: "",
    lastSeenLocation: "",
    dateLastSeen: "",
    description: "",
    contactName: "",
    contactNumber: "",
  };

  const handleSubmit = async (values: MissingPersonFormData) => {
    if (!uploadedImage) {
      alert("PLEASE ADD IMAGE BEFORE SUBMITTING");
      return;
    }
    const missing = {
      url: uploadedImage,
      fullName: values.fullName,
      age: values.age,
      gender: values.gender,
      lastSeenLocation: values.lastSeenLocation,
      dateLastSeen: values.dateLastSeen,
      description: values.description,
      contactName: values.contactName,
      contactNumber: values.contactNumber,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HEADER}user/add/missing`,
        missing
      );
      const res = await response.data;
      console.log(res);
      if (res) {
        alert("Report submitted successfully!");
        console.log();
        navigate("/");
      } else {
        alert("Error submitting report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Error submitting report");
    }
  };

  return (
    <div className='bg-gray-100'>
      <Formik
        initialValues={initialValues}
        validate={(values: MissingPersonFormData) => {
          const errors: Partial<MissingPersonFormData> = {};

          // Validate full name
          if (!values.fullName) {
            errors.fullName = "required ";
          }

          // Validate age
          if (!values.age) {
            errors.age = " ";
          } else if (isNaN(Number(values.age))) {
            errors.age = "Invalid age";
          }

          // Validate gender
          if (!values.gender) {
            errors.gender = " required";
          }

          // Validate last seen location
          if (!values.lastSeenLocation) {
            errors.lastSeenLocation = " required";
          }

          // Validate date last seen
          if (!values.dateLastSeen) {
            errors.dateLastSeen = "required ";
          }

          // Validate description
          if (!values.description) {
            errors.description = "required ";
          }

          // Validate contact name
          if (!values.contactName) {
            errors.contactName = " required";
          }

          // Validate contact number
          if (!values.contactNumber) {
            errors.contactNumber = "required ";
          }

          return errors;
        }}
        onSubmit={handleSubmit}
      >
        <Form className='max-w-lg mx-auto bg-white shadow-md rounded-lg p-8 space-y-6'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>
            Report a Missing Person
          </h2>
          {upload()}
          <div className='flex flex-col'>
            <label htmlFor='fullName' className='mb-1 font-medium'>
              Full Name
            </label>
            <Field
              id='fullName'
              name='fullName'
              type='text'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='fullName'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='age' className='mb-1 font-medium'>
              Age
            </label>
            <Field
              id='age'
              name='age'
              type='text'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='age'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='gender' className='mb-1 font-medium'>
              Gender
            </label>
            <Field
              id='gender'
              name='gender'
              type='text'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='gender'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='lastSeenLocation' className='mb-1 font-medium'>
              Last Seen Location
            </label>
            <Field
              id='lastSeenLocation'
              name='lastSeenLocation'
              type='text'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='lastSeenLocation'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='dateLastSeen' className='mb-1 font-medium'>
              Date Last Seen
            </label>
            <Field
              id='dateLastSeen'
              name='dateLastSeen'
              type='date'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='dateLastSeen'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='description' className='mb-1 font-medium'>
              Description
            </label>
            <Field
              id='description'
              name='description'
              as='textarea'
              rows={3}
              className='bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md p-4'
            />
            <ErrorMessage
              name='description'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='contactName' className='mb-1 font-medium'>
              Your Name
            </label>
            <Field
              id='contactName'
              name='contactName'
              type='text'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='contactName'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='contactNumber' className='mb-1 font-medium'>
              Your Contact Number
            </label>
            <Field
              id='contactNumber'
              name='contactNumber'
              type='tel'
              className='p-2 outline-none bg-gray-100 focus:bg-white my-1 border-gray-300 focus:outline-1 focus:border-0 focus:outline-green-500 rounded-md'
            />
            <ErrorMessage
              name='contactNumber'
              component='div'
              className='text-red-600 text-sm'
            />
          </div>

          <button
            type='submit'
            className='bg-green-500 w-full text-white font-semibold p-4 rounded focus:bg-green-600'
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default MissingPersonForm;

import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from "../../api/accountApi";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const ErrorMessage = ({ message, details }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
    <div className="flex items-center">
      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="font-bold">System Error</p>
    </div>
    <p className="mt-2">{message}</p>
    {details && <p className="text-sm mt-1 text-red-600">{details}</p>}
    <div className="mt-3 text-sm">
      <p>Please try one of the following:</p>
      <ul className="list-disc ml-5 mt-1">
        <li>Refresh the page and try again</li>
        <li>Clear your browser cache</li>
        <li>Contact support if the problem persists</li>
      </ul>
    </div>
  </div>
);

const Login = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    authLogin(response);

    // Get user roles from response
    const userRoles = response.result.role.replace('[', '').replace(']', '').split(', ');

    // Redirect based on role
    if (userRoles.includes('ROLE_STUDENT')) {
      navigate('/');
    } else if (userRoles.includes('ROLE_MENTOR')) {
      navigate('/appointment-list-mentor');
    } else if (userRoles.includes('ROLE_LECTURE')) {
      navigate('/home-lecturer');
    }

  };

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const response = await login(values.username, values.password);
      console.log('API Response:', response); // Log full response

      if (response && response.isSuccess) {
        if (response.result) {
          console.log('Login successful:', response.result);
          handleLoginSuccess(response); // Pass the entire response
        } else {
          console.error('Invalid response structure:', response);
          throw new Error('Invalid response data structure');
        }
      } else {
        console.error('Login failed:', response?.message);
        throw new Error(response?.message || 'Login failed');
      }
    } catch (err) {
      console.group('Login Error Details');
      console.error('Error object:', err);
      console.error('Stack trace:', err.stack);

      let errorMessage;
      if (err.response) {
        console.error('API Error Response:', {
          status: err.response.status,
          data: err.response.data,
          headers: err.response.headers
        });
        const statusCode = err.response.status;
        switch (statusCode) {
          case 500:
            errorMessage = {
              type: 'system',
              message: 'A critical system error has occurred',
              details: 'Our servers are currently experiencing issues. Our team has been notified.'
            };
            break;
          case 503:
            errorMessage = {
              type: 'system',
              message: 'Service Temporarily Unavailable',
              details: 'The system is under maintenance. Please try again in a few minutes.'
            };
            break;
          default:
            errorMessage = {
              type: 'system',
              message: 'An unexpected error occurred',
              details: err.response.data?.message || 'Please try again later'
            };
        }
      } else if (err.request) {
        console.error('Network Error:', err.request);
        errorMessage = {
          type: 'system',
          message: 'Connection Error',
          details: 'Unable to connect to the server. Please check your internet connection.'
        };
      } else {
        console.error('Unknown Error:', err.message);
        errorMessage = {
          type: 'system',
          message: 'Login Error',
          details: err.message || 'An unexpected error occurred during login.'
        };
      }
      console.groupEnd();
      setStatus(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:backdrop-blur-sm"
      style={{
        backgroundImage: "url('/login.jpg')",
        backgroundSize: '100% 100%'
      }}>
      <div className="relative bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-lg w-96 border border-white/20">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">LOGIN</h2>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form>
              {status && status.type === 'system' && (
                <ErrorMessage message={status.message} details={status.details} />
              )}

              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Username</label>
                <div className="flex items-center border rounded-md bg-white px-3">
                  <PersonOutlineIcon className="text-gray-500" />
                  <Field
                    name="username"
                    type="text"
                    className="w-full p-2 bg-transparent focus:outline-none"
                    placeholder="Enter username"
                  />
                </div>
                {errors.username && touched.username && (
                  <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-black font-medium mb-2">Password</label>
                <div className="flex items-center border rounded-md bg-white px-3">
                  <LockOutlinedIcon className="text-gray-500" />
                  <Field
                    name="password"
                    type="password"
                    className="w-full p-2 bg-transparent focus:outline-none"
                    placeholder="Enter password"
                  />
                </div>
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              <div className="text-right mb-4">
                <a href="#" className="text-black text-sm">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-orange-500 text-white py-2 rounded-md transition cursor-pointer
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

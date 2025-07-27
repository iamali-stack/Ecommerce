import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";


export default function Login() {
  const navigate=useNavigate()
  const [apiError, setApiError] = useState(""); 
  //form validation
    const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'Email must be a valid email'),
  password: Yup.string().required('password is required')});

     async function submitForm(values) {
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === "success") {
        localStorage.setItem('usertoken', data?.token);
        navigate('/home');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data?.message);
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
     
    },
    validationSchema: schema,
    onSubmit: submitForm,
    
  });
  
    return (
      <form onSubmit={formik.handleSubmit}>

  <div className=" w-full flex items-center justify-center p-4 mb-8">
      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl p-8 ">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 ">
              <span className="text-green-500">Fresh</span>Cart
            </h1>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm text-start font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                  placeholder="Enter your email"
                   value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                    {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                      </svg>
                      <span>{formik.errors.email || "Incorrect email or password"}</span>
                    </div>
                  )}
              </div>
            </div>


            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm text-start font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                  placeholder="Enter your password"
                  value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password &&  (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                      </svg>
                      <span>{formik.errors.password}</span>
                    </div>
                  )}
                     {apiError && (
  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-center">
    {apiError}
  </div>
)}

              </div>
              
              {/* Forgot Password Link */}
              <Link to="/forgetpassword"><div className="text-left mt-8 text-green-600">
                <p>Forgot Password?</p>
                  
                
              </div></Link>
            </div>

           
           <button type="submit"
              className="w-full !bg-white text-green-600 border !border-green-500 rounded py-3 px-4 font-semibold text-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition duration-300"
            >
              Login
            </button>
          </div>

          {/* Sign Up Link */}
        <div className="mt-8 flex items-center gap-1 text-gray-600">
  <p className="text-start">New to FreshCart?</p>
  <Link to="/register">  <span className="text-end text-green-600">Create an account</span>
</Link>
</div>

        </div>
      </div>
    </div>
  
      </form>
  );
};
  


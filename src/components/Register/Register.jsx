import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from 'yup';


export default function Register() {
  const navigate = useNavigate();
  //form validation
  const schema = Yup.object().shape({
    name: Yup.string().required('name is required').min(3, 'min 3 characters').max(6, 'max 6 letters'),
    email: Yup.string().required('email is required').email('email must be a valid email'),
    password: Yup.string()
  .required('Password is required')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must be at least 8 characters, include uppercase, lowercase, number, and special character'
  ),
rePassword: Yup.string()
  .required('Confirm password is required')
  .oneOf([Yup.ref('password')], 'Passwords must match'),

    phone: Yup.string()
      .required('phone is required')
      .matches(/^01[0125][0-9]{8}$/, 'phone must be a valid phone number'),
  });

  async function submitForm(values) {
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      if (data.message === "success") {
        localStorage.setItem('usertoken', data?.token);
        navigate('/home');
      }
    } catch (error) {
      // handle error (show message, etc.)
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: submitForm,
    
  });
console.log(schema)

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full flex items-center justify-center p-4 mb-8">
        <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
            {/* Logo */}
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                <span className="text-green-500">Fresh</span>Cart
              </h1>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">Create your account</h2>
              <p className="text-gray-600">Sign up to start shopping</p>
            </div>

            {/* Register Form */}
            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                      </svg>
                      <span>{formik.errors.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                      </svg>
                      <span>{formik.errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Password and Confirm Password Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                      </svg>
                      <span>{formik.errors.password}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                  {formik.touched.rePassword && formik.errors.rePassword && (
                    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                      </svg>
                      <span>{formik.errors.rePassword}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                    </svg>
                    <span>{formik.errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Register Button */}
              <button type="submit"   className="w-full bg-white text-green-600 border border-green-500 rounded-xl py-3 px-4 font-semibold text-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition duration-300">

                Register
              </button>
            </div>

            {/* Already Have Account */}
            <div className="mt-8 flex gap-1 text-gray-600">
              <p className="text-start">Already have an account?</p>
              <Link to="/login">
                <span className="text-end text-green-600 hover:text-green-700 transition-colors">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

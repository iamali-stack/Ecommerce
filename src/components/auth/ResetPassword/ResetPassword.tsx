import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function ResetPassword() {
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const email = localStorage.getItem('resetEmail');


  const formik = useFormik({
    initialValues: {
      email:email ,
      newPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
          email: values.email,
          newPassword: values.newPassword,
        });
        if (data.token.length>1) {
        localStorage.setItem('usertoken', data?.token);
          navigate('/home');

        }
      } catch (error: any) {
        const backendError = error?.response?.data?.message;
        formik.setErrors({ newPassword: backendError });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Enter New Password
          </h2>
          <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl bg-white-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                placeholder="Enter your email"
                value={email || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && (formik.errors.email) && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                  </svg>
                  <span>{formik.errors.email}</span>
                </div>
)}
            </div>
          <div className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm text-start font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative group">
                <input
                  type="password"
                  id="password"
                  name="newPassword"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                  placeholder="Enter your password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                    </svg>
                    <span>{formik.errors.newPassword}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full !bg-white text-green-600 border !border-green-500 rounded py-3 px-4 font-semibold text-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition duration-300"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

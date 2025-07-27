import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function VerifyRestCode() {
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    resetCode: Yup.string()
      .matches(/^[A-Za-z0-9]{6}$/, 'Reset code must contain at least 6 alphanumeric characters'),
  });

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: schema,
    onSubmit: submitForm,
  });

  async function submitForm(values: { resetCode: string }) {
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      if (data.status === "Success") {
        navigate('/resetpassword');
        console.log("success")
      }
    } catch (error: any) {
      const backendError = error?.response?.data?.message;
      formik.setErrors({ resetCode: backendError });
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900">
            Please enter your verification code
          </h2>
          <div className="mt-8 space-y-6">
            <div>
              <input
                id="resetCode"
                name="resetCode"
                type="text"
                autoComplete="off"
                required
                className="w-full px-4 py-3 border-2 border-gray-400 rounded-xl bg-white-50 focus:bg-white focus:outline-none focus:border-green-500 transition-all duration-300"
                placeholder="Enter the reset code"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.resetCode && formik.errors.resetCode && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12A9 9 0 11 3 12a9 9 0 0118 0z" />
                  </svg>
                  <span>{formik.errors.resetCode}</span>
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full !bg-white text-green-600 border !border-green-500 rounded py-3 px-4 font-semibold text-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white transition duration-300"
              >
                Verify Code 
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

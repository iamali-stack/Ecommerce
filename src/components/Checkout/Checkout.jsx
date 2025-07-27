import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Cart/cartSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
  const dispatch = useDispatch();
  const cartId = useSelector((state) => state.cart.cartId);
  const [loading, setLoading] = useState(false);

  const payOnline = async (val) => {
    if (!cartId) {
      toast.error("Cart ID is missing. Please refresh the page or try again later.");
      console.warn("cartId is null or undefined. Ensure the cart is initialized correctly.");
      return;
    }

    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress: val },
        {
          headers: {
            token: localStorage.getItem("usertoken"),
          },
        }
      );
      if (data.status === "success") {
        dispatch(clearCart()); // ✅ بعد الدفع امسح الكارت
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error("Error creating checkout session");
    }
  };

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: Yup.object({
      details: Yup.string()
        .required("Details is required")
        .min(3, "details min length is 3"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      await payOnline(values);
      setLoading(false);
    },
  });

  return (
    
    <div className="relative bg-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Full-page loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-75 flex items-center justify-center">
          <svg
            className="animate-spin h-12 w-12 text-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
            ></path>
          </svg>
        </div>
      )}

      <div className="w-full max-w-6xl">
        <div className="p-8 bg-white rounded-md">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Shipping Address</h2>
            {/* DETAILS */}
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <input
                id="details"
                name="details"
                type="text"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-4 py-3 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
              {formik.touched.details && formik.errors.details && (
                <div className="bg-red-100 border border-red-400 text-red-700 font-medium px-4 py-2 rounded mt-2 text-sm">
                  {formik.errors.details}
                </div>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-4 py-3 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="bg-red-100 border border-red-400 text-red-700 font-medium px-4 py-2 rounded mt-2 text-sm">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            {/* CITY */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City:
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-4 py-3 mt-1 block w-full rounded-md border border-gray-300 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
              />
              {formik.touched.city && formik.errors.city && (
                <div className="bg-red-100 border border-red-400 text-red-700 font-medium px-4 py-2 rounded mt-2 text-sm">
                  {formik.errors.city}
                </div>
              )}
            </div>

            {/* PAY NOW BUTTON */}
            <div>
              <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                className={`border border-green-500 text-green-600 text-base px-5 py-2 rounded-md hover:bg-green-600 hover:text-white transition ${
                  !formik.isValid || !formik.dirty
                    ? 'opacity-50 cursor-not-allowed border-green-600 text-green-600'
                    : 'text-green-600 hover:bg-green-600 hover:text-white border-green-600'
                }`}
              >
                Pay now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

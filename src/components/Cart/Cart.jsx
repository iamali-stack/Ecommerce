import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../Spinner/Spinner";
import {
  incrementQty,
  decrementQty,
  deleteFromCart,
  clearCart,
  setCartItems,
  setCartMeta,
} from "./cartSlice";
import { useNavigate } from "react-router-dom"; // ✅ جديد
import useGetCart from "../../Hooks/useGetCart";
import useDeleteItem from "../../Hooks/deleteproduc";
import useClearCart from "../../Hooks/useClearCart";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ جديد
  const { items, total } = useSelector((state) => state.cart);
  const { data, isLoading, isSuccess } = useGetCart();
  const deleteProductMutation = useDeleteItem("cart");
  const clearCartMutation = useClearCart();

  useEffect(() => {
    if (isSuccess && data?.data?.data?.products) {
      const cartData = data.data.data;
      const cartItems = cartData.products.map((p) => ({
        id: p.product.id,
        title: p.product.title,
        price: p.price,
        quantity: p.count,
        imageCover: p.product.imageCover,
      }));
      dispatch(setCartItems(cartItems));
      if (!cartData._id) {
        console.warn("cartId is missing in the API response.");
        return;
      }
      dispatch(setCartMeta({
        cartId: cartData._id,
        total: cartData.totalCartPrice,
      }));
    }
  }, [isSuccess, data, dispatch]);

  const handleRemove = (productId) => {
    dispatch(deleteFromCart(productId));
    deleteProductMutation.mutate(productId);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    clearCartMutation.mutate();
  };

  if (isLoading || !isSuccess) {
    return (
     <Spinner />
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-4">
      <ShoppingCart size={64} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-4">Looks like you haven’t added anything yet.</p>
        <Link to="/products">
        <button className="border border-green-500 text-green-600 text-base px-5 py-2 rounded-md hover:bg-green-600 hover:text-white transition">
          Explore Products
        </button>
      </Link>
    </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Your Cart</h1>
        <button
          onClick={() => navigate("/checkout")} // ✅ يوديك على صفحة الدفع
          className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-xl text-base font-medium transition-all duration-200"
        >
          Checkout
        </button>
      </div>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8 gap-2 text-gray-700 text-base">
        <p>
          <span className="font-medium">Total Items:</span>{" "}
          <span className="text-green-600 font-semibold">{items.length}</span>
        </p>
        <p>
          <span className="font-medium">Total Price:</span>{" "}
          <span className="text-green-600 font-bold text-lg">{total} EGP</span>
        </p>
      </div>

      {/* Items List */}
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between bg-white rounded-2xl border border-gray-200 shadow-sm p-5 gap-4"
          >
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-40 h-40 rounded-xl object-cover"
            />
            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold text-gray-900 truncate">{item.title}</h3>
              <p className="text-green-600 text-sm mb-2">{item.price} EGP</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => dispatch(decrementQty(item.id))}
                    className="w-8 h-8 text-green-600 hover:bg-green-50 text-lg font-bold flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-gray-800 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQty(item.id))}
                    className="w-8 h-8 text-green-600 hover:bg-green-50 text-lg font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center transition"
                >
                  <i className="fa-solid fa-trash mr-1"></i> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Button */}
      <div className="mt-10 text-center">
        <button
          onClick={handleClearCart}
          className="bg-transparent text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
        >
          Clear Your Cart
        </button>
      </div>
    </div>
  );
}

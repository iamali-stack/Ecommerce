import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Cart/cartSlice';
import { removeFromWishlist, setWishlistItems } from './WishlistSlice';
import useHandleApi from '../../Hooks/handleApi';
import useDeleteProductWishlist from '../../Hooks/deleteprodwishlist';
import useGetWishlist from '../../Hooks/useGetWishlist';
import { Heart } from "lucide-react";
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-hot-toast';


export default function WishList() {
  const dispatch = useDispatch();
    const cartMutation = useHandleApi("cart");
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const deleteWishlistMutation = useDeleteProductWishlist();
  const { data, isLoading, isError } = useGetWishlist();

  useEffect(() => {
    if (data?.data) {
      dispatch(setWishlistItems(data.data));
    }
  }, [data, dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
    deleteWishlistMutation.mutate(productId);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    cartMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success('It has been successfully added to cart', {
          duration: 2000,
          position: 'top-right'
        });
      }
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load wishlist.</p>;
  if (wishlistItems.length === 0) return <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-4">
      <Heart size={64} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
      <p className="text-gray-500 mb-4">Start adding your favorite items!</p>
      <Link to="/products">
        <button className="border border-green-500 text-green-600 text-base px-5 py-2 rounded-md hover:bg-green-600 hover:text-white transition">
          Explore Products
        </button>
      </Link>
    </div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-600">My Wishlist</h2>

      {wishlistItems.map(item => (
        <div
          key={item.id}
          className="bg-gray-50 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between mb-6 shadow-sm"
        >
          {/* Image */}
          <div className="w-32 h-32 flex-shrink-0 mb-4 sm:mb-0">
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-1 sm:px-8 text-center sm:text-left">
            <h3 className="font-semibold text-lg sm:text-xl mb-1 line-clamp-2">{item.title}</h3>
            <p className="text-green-600 font-bold text-lg mb-2">{item.price} EGP</p>

            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 flex items-center justify-center sm:justify-start hover:underline text-base"
            >
              <i className="fa-solid fa-trash mr-1"></i>
              Remove
            </button>
          </div>

          {/* Add to Cart Button */}
          <div className="sm:mt-0 mt-4">
            <button
              onClick={() => handleAddToCart(item)}
              className="border border-green-500 text-green-600 text-base px-5 py-2 rounded-md hover:bg-green-600 hover:text-white transition"
            >
              + Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


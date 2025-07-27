import { useState } from 'react';
import useGetApi from '../../Hooks/getApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Cart/cartSlice';
import { addToWishlist } from '../WishList/WishlistSlice';
import useHandleApi from '../../Hooks/handleApi';
import { Link } from "react-router-dom";
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-hot-toast';

export default function Products() {
  const dispatch = useDispatch();
  const wishlistMutation = useHandleApi("wishlist");
  const cartMutation = useHandleApi("cart");
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleAddToWishlist = (product) => {
    if (!product?.id) return;
    dispatch(addToWishlist(product));
    wishlistMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success('Added to wishlist', {
          duration: 3000,
          position: 'top-right'
        });
      }
    });
  };

  const { data, isLoading, error } = useGetApi('products');
  const products = data?.data?.data || [];

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;
  if (error) return toast.error('Failed to load products', {
    duration: 3000,
    position: 'top-right'
  });

  return (
    <>
      <h1 className="text-4xl font-semibold text-center mt-10 mb-6 text-green-600">
        All Products
      </h1>

      <div className="max-w-md mx-auto mb-12 px-4">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="max-w-7xl px-4 sm:px-6 mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center">
         {filteredProducts.map((product) => (
  <Link
    to={`/products/${product.id}`}
    key={product.id}
    className="relative bg-white rounded-xl flex flex-col items-center border border-transparent transition-all duration-300 hover:border-green-600 hover:shadow-[0_0_0.7rem_#22c55e] group"
  >
    <button
      onClick={(e) => {
        e.preventDefault(); // علشان متتنقلش عند الضغط على القلب
        const btn = e.currentTarget;
        btn.classList.toggle("text-red-500");
        btn.innerText = btn.innerText === "♡" ? "♥" : "♡";
        handleAddToWishlist(product);
      }}
      className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-red-500 transition duration-300"
    >
      ♡
    </button>

    <img
      alt={product.title}
      src={product.imageCover}
      className="w-full h-72 object-cover rounded-t-xl"
    />

    <div className="flex-1 w-full p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-green-600 font-medium">{product.category.name}</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-gray-900 font-bold text-base">{product.price} EGP</span>
          <div className="text-yellow-500 text-sm mt-1">
            ★ {product.ratingsAverage?.toFixed(1) || "N/A"}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault(); // علشان متتنقلش عند الضغط على الزر
          handleAddToCart(product);
        }}
        className="mt-4 bg-green-600 text-white font-medium py-2 rounded-md transition duration-300 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
      >
        + Add to Cart
      </button>
    </div>
  </Link>
))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-12">No products match your search.</p>
        )}
      </div>
    </>
  );
}

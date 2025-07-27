"use client"

import { addToCart } from "../../components/Cart/cartSlice"
import { useDispatch } from "react-redux"
import useHandleApi from "../../Hooks/handleApi"
import { addToWishlist } from "../WishList/WishlistSlice"
import { useEffect, useState } from "react"
import axios from "axios"
import { Star, ShoppingCart, Heart } from "lucide-react"
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast"
export default function ProductDetails() {
  
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState("")
  const [isInWishlist, setIsInWishlist] = useState(false)
  const dispatch = useDispatch()
  const cartMutation = useHandleApi("cart")
  const wishlistMutation = useHandleApi("wishlist")
  const { id: productId } = useParams();

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
   setIsInWishlist(!isInWishlist)
    wishlistMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success('Added to wishlist', {
          duration: 3000,
          position: 'top-right'
        });
      }
    });
  };




  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((data) => {
        const productData = data?.data?.data
        setProduct(productData)
        setSelectedImage(productData?.imageCover || "")
      })
      .catch((error) => {
        console.log("error", error)
      })
  }, [])

  if (!product) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <img
            src={selectedImage || product.imageCover || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-[300px] sm:h-[400px] object-contain rounded-lg border"
          />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[product.imageCover, ...product.images].map((img) => {
              const isSelected = selectedImage === img
              return (
                <img
                  key={img}
                  src={img || "/placeholder.svg"}
                  alt="Product"
                  className={`w-20 h-20 object-cover border-2 rounded-md flex-shrink-0 cursor-pointer ${
                    isSelected ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              )
            })}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">{product.title}</h1>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="text-base text-gray-600 font-semibold">{product.ratingsAverage}</span>
          </div>

          <div className="text-2xl font-bold text-green-600">{product.price} EGP</div>

          <div className="bg-white border rounded-lg shadow-sm p-4 space-y-2 text-sm">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-600">Brand:</span>
              <span className="font-medium">{product.brand.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">{product.category.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-600">Subcategory:</span>
              <span className="font-medium">{product.subcategory.map((s) => s.name).join(", ")}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
              onClick={() => handleAddToCart(product)}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Heart Wishlist Button - Filled heart with red background when clicked */}
            <button
              className="w-12 h-12 border-2 border-gray-300 bg-transparent rounded-md flex items-center justify-center transition-colors"
              onClick={() => handleAddToWishlist(product)}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isInWishlist ? "fill-red-500 text-red-500" : "fill-transparent text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

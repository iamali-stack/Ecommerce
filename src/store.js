import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./components/Cart/cartSlice";
import wishlistReducer from "./components/WishList/WishlistSlice"; // Assuming you have a wishlistSlice

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

// 1️⃣ تحميل البيانات من localStorage
const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // ⬇️ تعيين العناصر بناءً على الداتا الجاية من السيرفر
    setWishlistItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    // ➕ إضافة منتج للمفضلة
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(item => item.id === product.id);
      if (!exists) {
        state.items.push({ ...product, quantity: 1 });
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },

    // ❌ إزالة منتج من المفضلة
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    // 🗑️ مسح كل المنتجات من المفضلة
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  }
});

// 🧠 تصدير الأكشنز والريديوسر
export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

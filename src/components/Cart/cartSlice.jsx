import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    numOfCartItems: 0,
    cartId: null, // جديد
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      state.total += product.price;
      state.numOfCartItems += 1;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.total = action.payload.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      state.numOfCartItems = action.payload.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    setCartMeta: (state, action) => {
      state.cartId = action.payload.cartId;
      state.total = action.payload.total;
    },
    incrementQty: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
        state.numOfCartItems += 1;
      }
    },
    decrementQty: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
        state.numOfCartItems -= 1;
      }
    },
    deleteFromCart: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) {
        state.total -= item.price * item.quantity;
        state.items = state.items.filter((p) => p.id !== item.id);
        state.numOfCartItems -= item.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.numOfCartItems = 0;
      state.cartId = null;
    },
  },
});

export const {
  addToCart,
  setCartItems,
  setCartMeta,
  incrementQty,
  decrementQty,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

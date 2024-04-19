import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.push({ ...newItem, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const idToRemove = action.payload.id;
      return state.filter((item) => item.id !== idToRemove);
    },
    increaseQuantity(state, action) {
      const idToIncrease = action.payload.id;
      const itemToIncrease = state.find((item) => item.id === idToIncrease);
      if (itemToIncrease) {
        itemToIncrease.quantity++;
      }
    },
    decreaseQuantity(state, action) {
      const idToDecrease = action.payload.id;
      const itemToDecrease = state.find((item) => item.id === idToDecrease);
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity--;
      }
    },
  },
});

export const selectCartItems = (state) => state.cart;

export const selectTotalPrice = (state) =>
  Math.round(
    state.cart.reduce((total, item) => {
      // Calculate discounted price based on discount percentage
      const discountedPrice =
        item.price - (item.price * item.discountPercentage) / 100;
      return total + discountedPrice * item.quantity;
    }, 0)
  );

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import accountReducer from "./AccountSlice";
import productReducer from "./ProductsSlice";
import cartReducer from "./CartSlice"

export const store = configureStore({
  reducer: {
    users: accountReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

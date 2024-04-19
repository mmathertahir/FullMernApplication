import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getproducts } from "./actions";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const ProductsSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: (builder) => {},
  extraReducers: (builder) => {
    builder
      .addCase(getproducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
      

        state.loading = false;
        state.products = action.payload;

        console.log(state.products, "My Books");
      });
  },
});

export default ProductsSlice.reducer;

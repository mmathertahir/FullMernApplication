import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../Axios/Axios";
import axios from "axios";
import baseURL from "../Axios/Axios";
import { createBook, getBooks, deleteBook } from "./actions";

const initialState = {
  bookdata: [],
  loading: false,
  error: null,
};
export const UserSlice = createSlice({
  name: "BooKDataSlice",
  initialState,
  reducers: (builder) => {},
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload, " Created Data");
      })

      .addCase(getBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookdata = action.payload;

        console.log(state.bookdata, "My Books");
      })

      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;

        console.log("deletee ", action.payload.data);
        state.bookdata.data = state.bookdata.data.filter(
          (item) => item._id !== action.payload.data._id
        );
      });
  },
});

export default UserSlice.reducer;

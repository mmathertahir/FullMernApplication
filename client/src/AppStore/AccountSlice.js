import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./actions";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const AccountSlice = createSlice({
  name: "AccountSlice",
  initialState,
  reducers: (builder) => {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload, " Created Data");
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload, " User Login Successfull");
      });
  },
});

export default AccountSlice.reducer;

import { baseURL } from "../Axios/Axios";
import { userURL } from "../Axios/Axios";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBook = createAsyncThunk("createbook", async (data) => {
  return axios({
    url: `${baseURL}/create_book`,
    method: "post",
    data: data,
  })
    .then((response) => {
      console.log("Book Added Successfully:", response.data);
      return { payload: response.data };
    })
    .catch((error) => {
      console.error("Error creating book:", error);
      throw error;
    });
});

export const deleteBook = createAsyncThunk("deletebook", async (bookId) => {
  return axios({
    url: `${baseURL}/delete_book/${bookId}`,
    method: "delete",
  })
    .then((response) => {
      console.log(`Book with ID ${bookId} deleted successfully`);
      return { data: response.data };
    })
    .catch((error) => {
      console.error("Error in Deleted  Books:", error);
      throw error;
    });
});

export const getBooks = createAsyncThunk("getbook", async (data) => {
  return axios({
    url: `${baseURL}/get_book`,
    method: "get",
    data: data,
  })
    .then((response) => {
      console.log("Book Data Get Successfully", response.data);
      return { data: response.data };
    })
    .catch((error) => {
      console.error("Error in Get Books:", error);
      throw error;
    });
});

export const createUser = createAsyncThunk("createuser", async (data) => {
  console.log(data, "Data in Api");
  return axios({
    url: `${userURL}/register`,
    method: "post",
    data: data,
  })
    .then((response) => {
      console.log("User Register Successfully:", response.data);
      return { payload: response.data };
    })
    .catch((error) => {
      console.error("Error in Register user:", error);
      throw error;
    });
});

export const loginUser = createAsyncThunk("loginuser", async (data) => {
  return axios({
    url: `${userURL}/login`,
    method: "post",
    data: data,
  })
    .then((response) => {
      console.log("User Login Successfully:", response.data);
      return { payload: response.data };
    })

    .catch((error) => {
      console.error("Error in Login  user:", error);
      throw error;
    });
});

export function formatISODate(inputDate) {
  const dateObject = new Date(inputDate);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export const getproducts = createAsyncThunk("getproducts", async (data) => {
  return axios({
    url: `https://dummyjson.com/products`,
    method: "get",
    data: data,
  })
    .then((response) => {
      console.log("Products  Get Successfully", response.data);
      return { data: response.data };
    })
    .catch((error) => {
      console.error("Error in Getting Products:", error);
      throw error;
    });
});

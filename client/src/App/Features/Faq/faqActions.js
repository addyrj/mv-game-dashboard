import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../Services/AxiosInstance";

export const getAllFaqCategories = createAsyncThunk("faq/getAllFaqCategories", async ({ page }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/faq/get-all-faq-categories?page=${page}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const createNewFaqCategory = createAsyncThunk("faq/createNewFaqCategory", async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.post("/faq/create-new-faq-category", data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const deleteFaqCategory = createAsyncThunk("faq/deleteFaqCategory", async ({ categoryId }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.delete(`/faq/delete-faq-category?categoryId=${categoryId}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getSingleCategory = createAsyncThunk("faq/getSingleCategory", async ({ categoryId }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/faq/get-single-faq-category?categoryId=${categoryId}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const updateFaqCategory = createAsyncThunk("faq/updateCategory", async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.patch("/faq/update-faq-category", data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getAllFaqCategoriesList = createAsyncThunk("faq/getAllFaqCategoriesList", async (_, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get("/faq/get-all-faq-categories-list");
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const createNewFaqPost = createAsyncThunk("faq/createNewFaqPost", async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.post("/faq/create-new-faq-post", data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getAllFaqPosts = createAsyncThunk("faq/getAllFaqPosts", async ({ page }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/faq/get-all-faq-posts?page=${page}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getSingleFaqPost = createAsyncThunk("faq/getSingleFaqPost", async ({ postId }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/faq/get-single-faq-post?postId=${postId}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const updatePost = createAsyncThunk("faq/updatePost", async (data, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.patch("/faq/update-post", data);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const deleteFaqPost = createAsyncThunk("faq/deleteFaqPost", async ({ postId }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.delete(`/faq/delete-faq-post?postId=${postId}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

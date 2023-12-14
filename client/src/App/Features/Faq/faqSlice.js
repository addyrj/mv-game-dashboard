import { createSlice } from "@reduxjs/toolkit";
import {
   createNewFaqCategory,
   getAllFaqCategories,
   deleteFaqCategory,
   getSingleCategory,
   updateFaqCategory,
   getAllFaqCategoriesList,
   createNewFaqPost,
   getAllFaqPosts,
   getSingleFaqPost,
   updatePost,
   deleteFaqPost,
} from "./faqActions";

const INITAL_STATE = {
   newFaqCategory: null,
   newFaqCategoryLoading: false,
   newFaqCategoryError: null,
   allFaqCategories: null,
   allFaqCategoriesLoading: false,
   allFaqCategoriesError: null,
   deleteFaqSingleCategory: null,
   deleteFaqSingleCategoryLoading: false,
   deleteFaqSingleCategoryError: null,
   singleCategory: null,
   singleCategoryLoading: false,
   singleCategoryError: null,
   updateFaqCategoryLoading: false,
   updateFaqCategoryError: null,
   allFaqCategoriesList: null,
   allFaqCategoriesListLoading: false,
   allFaqCategoriesListError: null,
   newPostSaved: null,
   newPostSavedLoading: false,
   newPostSavedError: null,
   allFaqPosts: null,
   allFaqPostsLoading: false,
   allFaqPostsError: null,
   singleFaqPost: null,
   singleFaqPostLoading: false,
   singleFaqPostError: null,
   updatePostInfo: null,
   updatePostLoading: false,
   updatePostError: null,
   deleteFaqPostLoading: false,
   deleteFaqPostError: null,
};

const faqSlice = createSlice({
   name: "faq",
   initialState: INITAL_STATE,
   reducers: {
      categoryInfo: (state) => {
         state.singleCategory = null;
         state.singleCategoryError = null;
         state.singleCategoryLoading = false;
      },
      removePostInfo: (state) => {
         state.singleFaqPost = null;
         state.singleFaqPostLoading = false;
         state.singleCategoryError = null;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(createNewFaqCategory.pending, (state) => {
            state.newFaqCategory = null;
            state.newFaqCategoryLoading = true;
            state.newFaqCategoryError = null;
         })
         .addCase(createNewFaqCategory.rejected, (state, action) => {
            state.newFaqCategory = null;
            state.newFaqCategoryLoading = false;
            state.newFaqCategoryError = action.error.message;
         })
         .addCase(createNewFaqCategory.fulfilled, (state, action) => {
            state.newFaqCategory = action.payload.data;
            state.newFaqCategoryLoading = false;
            state.newFaqCategoryError = null;
         });

      bulder
         .addCase(getAllFaqCategories.pending, (state) => {
            state.allFaqCategories = null;
            state.allFaqCategoriesLoading = true;
            state.allFaqCategoriesError = null;
         })
         .addCase(getAllFaqCategories.rejected, (state, action) => {
            state.allFaqCategories = null;
            state.allFaqCategoriesLoading = false;
            state.allFaqCategoriesError = action.error.message;
         })
         .addCase(getAllFaqCategories.fulfilled, (state, action) => {
            state.allFaqCategories = action.payload.data;
            state.allFaqCategoriesLoading = false;
            state.allFaqCategoriesError = null;
         });

      bulder
         .addCase(deleteFaqCategory.pending, (state) => {
            state.deleteFaqSingleCategory = null;
            state.deleteFaqSingleCategoryLoading = true;
            state.deleteFaqSingleCategoryError = null;
         })
         .addCase(deleteFaqCategory.rejected, (state, action) => {
            state.deleteFaqSingleCategory = null;
            state.deleteFaqSingleCategoryLoading = false;
            state.deleteFaqSingleCategoryError = action.error.message;
         })
         .addCase(deleteFaqCategory.fulfilled, (state, action) => {
            if (action.payload?.data && !!action.payload?.data?.categoryId) {
               state.allFaqCategories = {
                  ...state.allFaqCategories,
                  categories: state.allFaqCategories.categories.filter((el) => el?._id !== action.payload?.data?.categoryId),
               };
               state.deleteFaqSingleCategory = action.payload.data;
               state.deleteFaqSingleCategoryLoading = false;
               state.deleteFaqSingleCategoryError = null;
            }
         });

      bulder
         .addCase(getSingleCategory.pending, (state) => {
            state.singleCategory = null;
            state.singleCategoryLoading = true;
            state.singleCategoryError = null;
         })
         .addCase(getSingleCategory.rejected, (state, action) => {
            state.singleCategory = null;
            state.singleCategoryLoading = false;
            state.singleCategoryError = action.error.message;
         })
         .addCase(getSingleCategory.fulfilled, (state, action) => {
            state.singleCategory = action.payload.data;
            state.singleCategoryLoading = false;
            state.singleCategoryError = null;
         });

      bulder
         .addCase(updateFaqCategory.pending, (state) => {
            state.updateFaqCategoryLoading = true;
            state.updateFaqCategoryError = null;
         })
         .addCase(updateFaqCategory.rejected, (state, action) => {
            state.updateFaqCategoryLoading = false;
            state.updateFaqCategoryError = action.error.message;
         })
         .addCase(updateFaqCategory.fulfilled, (state, action) => {
            state.updateFaqCategoryLoading = false;
            state.updateFaqCategoryError = null;
         });

      bulder
         .addCase(getAllFaqCategoriesList.pending, (state) => {
            state.allFaqCategoriesList = null;
            state.allFaqCategoriesListLoading = true;
            state.allFaqCategoriesListError = null;
         })
         .addCase(getAllFaqCategoriesList.rejected, (state, action) => {
            state.allFaqCategoriesList = null;
            state.allFaqCategoriesListLoading = false;
            state.allFaqCategoriesListError = action.error.message;
         })
         .addCase(getAllFaqCategoriesList.fulfilled, (state, action) => {
            state.allFaqCategoriesList = action.payload?.data;
            state.allFaqCategoriesListLoading = false;
            state.allFaqCategoriesListError = null;
         });

      bulder
         .addCase(createNewFaqPost.pending, (state) => {
            state.newPostSaved = null;
            state.newPostSavedLoading = true;
            state.newPostSavedError = null;
         })
         .addCase(createNewFaqPost.rejected, (state, action) => {
            state.newPostSaved = null;
            state.newPostSavedLoading = false;
            state.newPostSavedError = action.error.message;
         })
         .addCase(createNewFaqPost.fulfilled, (state, action) => {
            state.newPostSaved = action.payload.data;
            state.newPostSavedLoading = false;
            state.newPostSavedError = null;
         });

      bulder
         .addCase(getAllFaqPosts.pending, (state) => {
            state.allFaqPosts = null;
            state.allFaqPostsLoading = true;
            state.allFaqPostsError = null;
         })
         .addCase(getAllFaqPosts.rejected, (state, action) => {
            state.allFaqPosts = null;
            state.allFaqPostsLoading = false;
            state.allFaqPostsError = action.error.message;
         })
         .addCase(getAllFaqPosts.fulfilled, (state, action) => {
            state.allFaqPosts = action.payload.data;
            state.allFaqPostsLoading = false;
            state.allFaqPostsError = null;
         });

      bulder
         .addCase(getSingleFaqPost.pending, (state) => {
            state.singleFaqPost = null;
            state.singleFaqPostLoading = true;
            state.singleFaqPostError = null;
         })
         .addCase(getSingleFaqPost.rejected, (state, action) => {
            state.singleFaqPost = null;
            state.singleFaqPostLoading = false;
            state.singleFaqPostError = action.error.message;
         })
         .addCase(getSingleFaqPost.fulfilled, (state, action) => {
            state.singleFaqPost = action.payload.data;
            state.singleFaqPostLoading = false;
            state.singleFaqPostError = null;
         });

      bulder
         .addCase(updatePost.pending, (state) => {
            state.updatePostInfo = null;
            state.updatePostLoading = true;
            state.updatePostError = null;
         })
         .addCase(updatePost.rejected, (state, action) => {
            state.updatePostInfo = null;
            state.updatePostLoading = false;
            state.updatePostError = action.error.message;
         })
         .addCase(updatePost.fulfilled, (state, action) => {
            state.updatePostInfo = action.payload.data;
            state.updatePostLoading = false;
            state.updatePostError = null;
         });

      bulder
         .addCase(deleteFaqPost.pending, (state) => {
            state.updatePostInfo = null;
            state.deleteFaqPostLoading = true;
            state.updatePostError = null;
         })
         .addCase(deleteFaqPost.rejected, (state, action) => {
            state.deleteFaqPostLoading = false;
            state.deleteFaqPostError = action.error.message;
         })
         .addCase(deleteFaqPost.fulfilled, (state, action) => {
            if (action.payload?.data && !!action.payload?.data?.postId) {
               state.allFaqPosts = {
                  ...state.allFaqPosts,
                  posts: state.allFaqPosts?.posts.filter((el) => el?._id !== action.payload?.data?.postId),
               };
               state.deleteFaqPostLoading = false;
               state.deleteFaqPostError = null;
            }
         });
   },
});

export const { categoryInfo, removePostInfo } = faqSlice.actions;

export default faqSlice.reducer;

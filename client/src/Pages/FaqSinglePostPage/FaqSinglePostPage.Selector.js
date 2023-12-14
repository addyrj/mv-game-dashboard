import { createSelector } from "@reduxjs/toolkit";

const faqReducer = (state) => state.faq;

export const allFaqCategoriesListSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqCategoriesList);

export const allFaqCategoriesListLoadingSelector = createSelector(
   [faqReducer],
   (faqSlice) => faqSlice.allFaqCategoriesListLoading
);

export const allFaqCategoriesListErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqCategoriesListError);

export const newPostSavedLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.newPostSavedLoading);

export const newPostSavedErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.newPostSavedError);

export const singleFaqPostSelector = createSelector([faqReducer], (faqSlice) => faqSlice.singleFaqPost);

export const updatePostLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.updatePostLoading);

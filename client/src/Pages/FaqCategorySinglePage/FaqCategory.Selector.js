import { createSelector } from "@reduxjs/toolkit";

const faqReducer = (state) => state.faq;

export const newFaqCategorySelector = createSelector([faqReducer], (faqSlice) => faqSlice.newFaqCategory);

export const newFaqCategoryLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.newFaqCategoryLoading);

export const newFaqCategoryErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.newFaqCategoryError);

export const singleCategorySelector = createSelector([faqReducer], (faqSlice) => faqSlice.singleCategory);

export const singleCategoryLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.singleCategoryLoading);

export const singleCategoryErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.singleCategoryError);

export const updateFaqCategoryLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.updateFaqCategoryLoading);

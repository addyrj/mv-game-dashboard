import { createSelector } from '@reduxjs/toolkit';

const faqReducer = (state) => state.faq;

export const allFaqCategoriesSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqCategories);

export const allFaqCategoriesLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqCategoriesLoading);

export const allFaqCategoriesErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqCategoriesError);

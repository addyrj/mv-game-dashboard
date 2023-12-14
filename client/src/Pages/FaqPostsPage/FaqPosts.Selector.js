import { createSelector } from "@reduxjs/toolkit";

const faqReducer = (state) => state.faq;

export const allFaqPostsSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqPosts);

export const allFaqPostsLoadingSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqPostsLoading);

export const allFaqPostsErrorSelector = createSelector([faqReducer], (faqSlice) => faqSlice.allFaqPostsError);

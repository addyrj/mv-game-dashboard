import { createSlice } from '@reduxjs/toolkit';
import {
   getAllUserRoles,
   deleteUserRole,
   createUserRole,
   getSingleUserRole,
   updateSingleRole,
   uploadGameAvatar,
   getAllAvatars,
   deleteSingleAvatar,
   getAllUsers,
   getGamesUploadResult,
   filterGameUploadDataResult,
   getUserRole,
} from './adminActions';

const INITAL_STATE = {
   roles: null,
   getRolesLoading: false,
   getRolesError: null,
   deleteSingleRoleError: null,
   deleteSingleRoleLoading: false,
   newRoleInsertInfo: null,
   newRoleInsertLoading: false,
   newRoleInsertError: null,
   newRoleInsertInvalidErrors: null,
   singleRole: null,
   singleRoleLoading: false,
   singleRoleError: null,
   updateSingleRoleInfo: null,
   updateSinglRoleLoading: false,
   updateSingleRoleError: null,
   gameAvatarUploadInfo: null,
   gameAvatarUploadLoading: false,
   gameAvatarUploadError: null,
   gameAvatar: null,
   gameAvatarLoading: false,
   gameAvatarError: null,
   deleteSingleAvatarLoading: false,
   deleteSingleAvatarError: null,
   users: null,
   userLoading: false,
   userErrors: null,
   gameStatus: null,
   gameStatusLoading: false,
   gameStatusError: null,
   gameStatusFilterData: null,
   gameStatusFilterDataError: null,
   showSetPasswordPopup: false,
   userRole: null,
   userRoleLoading: false,
   userRoleError: null,
};

const adminSlice = createSlice({
   name: 'admin',
   initialState: INITAL_STATE,
   reducers: {
      removeSingleRoleInfo: (state) => {
         state.updateSingleRoleInfo = null;
         state.singleRole = null;
         state.newRoleInsertInfo = null;
      },
      removeAvatarInfo: (state) => {
         state.gameAvatarUploadInfo = null;
         state.gameAvatarUploadError = null;
      },
      showAndHidePwdPopupHandler: (state, action) => {
         state.showSetPasswordPopup = action.payload;
      },
      setUserRoles: (state, action) => {
         state.userRole = action.payload;
      },
   },
   extraReducers: (bulder) => {
      bulder
         .addCase(getAllUserRoles.pending, (state) => {
            state.roles = null;
            state.getRolesLoading = true;
            state.getRolesError = null;
         })
         .addCase(getAllUserRoles.rejected, (state, action) => {
            state.roles = null;
            state.getRolesLoading = false;
            state.getRolesError = action.error.message;
         })
         .addCase(getAllUserRoles.fulfilled, (state, action) => {
            state.roles = action.payload.data;
            state.getRolesLoading = false;
            state.getRolesError = null;
         });

      bulder
         .addCase(deleteUserRole.pending, (state) => {
            state.deleteSingleRoleError = null;
            state.deleteSingleRoleLoading = true;
         })
         .addCase(deleteUserRole.rejected, (state, action) => {
            state.deleteSingleRoleError = action.error.message;
            state.deleteSingleRoleLoading = false;
         })
         .addCase(deleteUserRole.fulfilled, (state, action) => {
            state.deleteSingleRoleError = null;
            state.deleteSingleRoleLoading = false;
            state.roles = {
               ...state.roles,
               roles: state.roles?.roles.filter((el) => el._id !== action.payload?.data?.roleId),
            };
         });

      bulder
         .addCase(createUserRole.pending, (state) => {
            state.newRoleInsertInfo = null;
            state.newRoleInsertLoading = true;
            state.newRoleInsertError = null;
         })
         .addCase(createUserRole.rejected, (state, action) => {
            state.newRoleInsertInfo = null;
            state.newRoleInsertLoading = false;
            state.newRoleInsertError = action.error.message;
         })
         .addCase(createUserRole.fulfilled, (state, action) => {
            if (action.payload?.data?.status === 422) {
               state.newRoleInsertLoading = false;
               state.newRoleInsertInvalidErrors = action.payload?.data;
            } else {
               state.newRoleInsertInfo = action.payload.data;
               state.newRoleInsertLoading = false;
               state.newRoleInsertError = null;
               state.newRoleInsertInvalidErrors = null;
            }
         });

      bulder
         .addCase(getSingleUserRole.pending, (state) => {
            state.singleRole = null;
            state.singleRoleLoading = true;
            state.singleRoleError = null;
         })
         .addCase(getSingleUserRole.rejected, (state, action) => {
            state.singleRole = null;
            state.singleRoleLoading = false;
            state.singleRoleError = action.error.message;
         })
         .addCase(getSingleUserRole.fulfilled, (state, action) => {
            state.singleRole = action.payload.data;
            state.singleRoleLoading = false;
            state.singleRoleError = null;
         });

      bulder
         .addCase(updateSingleRole.pending, (state) => {
            state.updateSingleRoleInfo = null;
            state.updateSinglRoleLoading = true;
            state.updateSingleRoleError = null;
         })
         .addCase(updateSingleRole.rejected, (state, action) => {
            state.updateSingleRoleInfo = null;
            state.updateSinglRoleLoading = false;
            state.updateSingleRoleError = action.error.message;
         })
         .addCase(updateSingleRole.fulfilled, (state, action) => {
            state.updateSingleRoleInfo = action.payload.data;
            state.updateSinglRoleLoading = false;
            state.updateSingleRoleError = null;
         });

      bulder
         .addCase(getAllAvatars.pending, (state) => {
            state.gameAvatar = null;
            state.gameAvatarLoading = true;
            state.gameAvatarError = null;
         })
         .addCase(getAllAvatars.rejected, (state, action) => {
            state.gameAvatar = null;
            state.gameAvatarLoading = false;
            state.gameAvatarError = action.error.message;
         })
         .addCase(getAllAvatars.fulfilled, (state, action) => {
            state.gameAvatar = action.payload.data;
            state.gameAvatarLoading = false;
            state.gameAvatarError = null;
         });

      bulder
         .addCase(uploadGameAvatar.pending, (state) => {
            state.gameAvatarUploadInfo = null;
            state.gameAvatarUploadLoading = true;
            state.gameAvatarUploadError = null;
         })
         .addCase(uploadGameAvatar.rejected, (state, action) => {
            state.gameAvatarUploadInfo = null;
            state.gameAvatarUploadLoading = false;
            state.gameAvatarUploadError = action.error.message;
         })
         .addCase(uploadGameAvatar.fulfilled, (state, action) => {
            state.gameAvatarUploadInfo = action.payload.data;
            state.gameAvatarUploadLoading = false;
            state.gameAvatarUploadError = null;
            state.gameAvatar = {
               ...state.gameAvatar,
               avatars: [action.payload?.data?.avatar, ...state.gameAvatar?.avatars],
            };
         });

      bulder
         .addCase(deleteSingleAvatar.pending, (state) => {
            state.deleteSingleAvatarLoading = true;
            state.deleteSingleAvatarError = null;
         })
         .addCase(deleteSingleAvatar.rejected, (state, action) => {
            state.deleteSingleAvatarLoading = false;
            state.deleteSingleAvatarError = null;
         })
         .addCase(deleteSingleAvatar.fulfilled, (state, action) => {
            state.deleteSingleAvatarLoading = false;
            state.deleteSingleAvatarError = null;
            state.gameAvatar = {
               ...state.gameAvatar,
               avatars: state.gameAvatar?.avatars.filter((el) => el._id !== action.payload?.data?.id),
            };
         });

      bulder
         .addCase(getAllUsers.pending, (state) => {
            state.users = null;
            state.userLoading = true;
            state.userErrors = null;
         })
         .addCase(getAllUsers.rejected, (state, action) => {
            state.users = action.error.message;
            state.userLoading = false;
            state.userErrors = null;
         })
         .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload?.data;
            state.userLoading = false;
            state.userErrors = null;
         });

      bulder
         .addCase(getGamesUploadResult.pending, (state) => {
            state.gameStatus = null;
            state.gameStatusLoading = true;
            state.gameStatusError = null;
         })
         .addCase(getGamesUploadResult.rejected, (state, action) => {
            state.gameStatus = null;
            state.gameStatusLoading = false;
            state.gameStatusError = action.error.message;
         })
         .addCase(getGamesUploadResult.fulfilled, (state, action) => {
            state.gameStatus = action.payload?.data;
            state.gameStatusLoading = false;
            state.gameStatusError = null;
         });

      bulder
         .addCase(getUserRole.pending, (state) => {
            state.userRole = null;
            state.userRoleLoading = true;
            state.userRoleError = null;
         })
         .addCase(getUserRole.rejected, (state, action) => {
            state.userRole = null;
            state.userRoleLoading = false;
            state.userRoleError = action.error.message;
         })
         .addCase(getUserRole.fulfilled, (state, action) => {
            state.userRole = action.payload?.data?.items;
            state.userRoleLoading = false;
            state.userRoleError = null;
         });

      bulder
         .addCase(filterGameUploadDataResult.rejected, (state, action) => {
            state.gameStatusFilterData = null;
            state.gameStatusFilterDataError = action.error.message;
         })
         .addCase(filterGameUploadDataResult.fulfilled, (state, action) => {
            state.gameStatusFilterData = action.payload?.data;
            state.gameStatusFilterDataError = null;
         });
   },
});

export const { removeSingleRoleInfo, removeAvatarInfo, showAndHidePwdPopupHandler, setUserRoles } = adminSlice.actions;

export default adminSlice.reducer;

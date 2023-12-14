import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../Services/AxiosInstance';

export const getUserRole = createAsyncThunk('admin/getUserRole', async ({ userId }, { rejectWithValue }) => {
   try {
      const response = await axiosInstance.get(`/user-role/get-roles?userId=${userId}`);
      return response;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getAllUserRoles = createAsyncThunk('admin/getAllUserRoles', async ({ page }, { rejectWithValue }) => {
   try {
      const userRolesInfo = await axiosInstance.get(`/user-role/get-all-user-rools?page=${page}`);
      return userRolesInfo;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const deleteUserRole = createAsyncThunk('admin/deleteUserRole', async ({ roleId }, { rejectWithValue }) => {
   try {
      const deleteRoleResponse = await axiosInstance.delete(`/user-role/delete-single-role?roleId=${roleId}`);
      return deleteRoleResponse;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const createUserRole = createAsyncThunk(
   'admin/createUserRole',
   async ({ roleName, description }, { rejectWithValue }) => {
      try {
         const insertNewRoleRes = await axiosInstance.post(
            '/user-role/insert-new-user-role',
            { roleName, description },
            {
               validateStatus: false,
            }
         );

         return insertNewRoleRes;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getSingleUserRole = createAsyncThunk(
   'admin/getSingleUserRole',
   async ({ roleId }, { rejectWithValue }) => {
      try {
         const singleRoleResponse = await axiosInstance.get(`/user-role/get-single-user-role?roleId=${roleId}`);
         return singleRoleResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const updateSingleRole = createAsyncThunk('admin/updateSingleRole', async (data, { rejectWithValue }) => {
   try {
      const updateRoleRespose = await axiosInstance.patch('/user-role/update-single-role', data);
      return updateRoleRespose;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const uploadGameAvatar = createAsyncThunk(
   'admin/uploadGameAvatar',
   async ({ formData }, { rejectWithValue }) => {
      try {
         const avatarRespose = await axiosInstance.post('/admin/insert-new-game-avatar', formData, {
            headers: {
               'Content-type': 'multipart/form-data',
            },
         });

         return avatarRespose;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllAvatars = createAsyncThunk('admin/getAllAvatars', async (_, { rejectWithValue }) => {
   try {
      const avatarLists = await axiosInstance.get('/admin/get-avatars');
      return avatarLists;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const deleteSingleAvatar = createAsyncThunk(
   'admin/deleteSingleAvatar',
   async ({ avatarId }, { rejectWithValue }) => {
      try {
         const deleteAvatarResponse = await axiosInstance.delete(`/admin/delete-single-avatar?avatarId=${avatarId}`);
         return deleteAvatarResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async ({ page }, { rejectWithValue }) => {
   try {
      const usersResponse = await axiosInstance.get(`/admin/get-all-login-users?page=${page}`);
      return usersResponse;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const filterGameUploadDataResult = createAsyncThunk(
   'admin/filterGameUploadDataResult',
   async ({ filter }, { rejectWithValue }) => {
      try {
         const filterGameResultResponse = await axiosInstance.get(
            `/admin/get-games-result-filter-data?filter=${filter}`
         );
         return filterGameResultResponse;
      } catch (err) {
         if (err) {
            throw err;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const getUserLoginResults = createAsyncThunk('admin/getUserLoginResults', async (_, { rejectWithValue }) => {
   try {
      const userInfoRespose = await axiosInstance.get('/admin/get-user-login-results');
      return userInfoRespose;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

export const getGamesUploadResult = createAsyncThunk('admin/getGamesUploadResult', async (_, { rejectWithValue }) => {
   try {
      const gamesUploadResultRespose = await axiosInstance.get('/admin/get-games-upload-result');

      return gamesUploadResultRespose;
   } catch (err) {
      if (err) {
         throw err;
      }
      return rejectWithValue(err.response.data);
   }
});

import React, { useEffect } from 'react';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { MenuItem } from '@mui/material';
import {
   newGameCategorySelector,
   newGameCategoryLoadingSelector,
   newGameCategoryErrorSelector,
   singleGameCategorySelector,
   singleGameCategoryErrorSelector,
   updateGameCategoryLoadingSelector,
   singleGameCategoryLoadingSelector,
} from './PostNewCategory.Selector';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { postNewGameCategory, updateGameCategory } from '../../App/Features/Games/GameActions';
import { message } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import useRoles from '../../Hooks/useRoles';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
import { Switch } from 'antd';

const Schema = yup.object({
   name: yup
      .string()
      .required('Game category name is required')
      .min(2, 'Must be exactly 2 digits')
      .max(30, 'Must be exactly 30 digits'),
});

const Status = [
   { value: 'Publish', label: 'Publish' },
   { value: 'Draft', label: 'Draft' },
];

function PostNewCategoryComponent() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
   } = useForm({
      defaultValues: {
         CategoryStatus: 'Draft',
         showCategory: false,
      },
      resolver: yupResolver(Schema),
   });
   const naviation = useNavigate();
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin },
   } = useRoles();

   const newGameCategory = useSelector(newGameCategorySelector);
   const newGameCategoryError = useSelector(newGameCategoryErrorSelector);
   const newGameCategoryLoading = useSelector(newGameCategoryLoadingSelector);
   const singleGameCategory = useSelector(singleGameCategorySelector);
   const singleGameCategoryError = useSelector(singleGameCategoryErrorSelector);
   const updateGameCategoryLoading = useSelector(updateGameCategoryLoadingSelector);
   const singleGameCategoryLoading = useSelector(singleGameCategoryLoadingSelector);

   const onSubmit = function (data) {
      if (!isAdmin) {
         return naviation('/dashboard/auth/login');
      }

      if (!data?.CategoryStatus) {
         return message.info('game category status is required');
      }

      if (singleGameCategory) {
         dispatch(
            updateGameCategory({
               ...data,
               status: data?.CategoryStatus,
               categoryId: singleGameCategory?.category?._id,
            })
         );
      } else {
         dispatch(postNewGameCategory({ ...data, status: data?.CategoryStatus }));
      }
   };

   useEffect(() => {
      if (!!singleGameCategory) {
         setValue('name', singleGameCategory?.category?.name);
         setValue('description', singleGameCategory?.category?.description);
         setValue('CategoryStatus', singleGameCategory?.category?.status);
         setValue('showCategory', singleGameCategory?.category?.showCategory);
      }
   }, [singleGameCategory]);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Box
            sx={{
               '& > :not(style)': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
         >
            <TextField
               {...register('name')}
               label="Game Category Name"
               variant="outlined"
               helperText="Do not exceed 30 character when entring the game category name"
               InputLabelProps={{
                  shrink: true,
               }}
            />
            {!!errors?.name?.message ? <p className="error_cl text-sm">{errors?.name?.message}</p> : null}
            <Controller
               name="CategoryStatus"
               control={control}
               render={({ field: { onChange, value } }) => (
                  <TextField
                     select
                     label="Select"
                     helperText="Please select your category status"
                     value={value}
                     onChange={(e) => onChange(e.target.value)}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  >
                     {Status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                           {option.label}
                        </MenuItem>
                     ))}
                  </TextField>
               )}
            />
            <div className="flex">
               <Controller
                  control={control}
                  name="showCategory"
                  render={({ field: { onChange, value } }) => (
                     <Switch checkedChildren="Yes" onChange={onChange} checked={value} unCheckedChildren="No" />
                  )}
               />
            </div>
            <TextField
               {...register('description')}
               label="Description"
               multiline
               rows={10}
               InputLabelProps={{
                  shrink: true,
               }}
            />
            <div className="flex">
               {!!singleGameCategoryLoading ? (
                  <SpinnerComponent />
               ) : (
                  <CustomButtonComponent
                     btnCl={'Publish'}
                     text={!!singleGameCategory ? 'Update' : 'Save'}
                     type={'submit'}
                     isLoading={!!singleGameCategory ? updateGameCategoryLoading : newGameCategoryLoading}
                  />
               )}
            </div>
            {!!newGameCategoryError ? <p className="error_cl text-sm">{newGameCategoryError}</p> : null}
            {!!newGameCategory ? <p className="text-sm text-gray-600">{newGameCategory}</p> : null}
            {!!singleGameCategoryError ? <p className="error_cl text-sm">{singleGameCategoryError}</p> : null}
         </Box>
      </form>
   );
}

export default PostNewCategoryComponent;

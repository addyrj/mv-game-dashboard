import React, { useEffect, useRef } from 'react';
import * as styled from './FaqSinglePostPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useRoles from '../../Hooks/useRoles';
import { useDispatch, useSelector } from 'react-redux';
import {
   createNewFaqPost,
   getAllFaqCategoriesList,
   getSingleFaqPost,
   updatePost,
} from '../../App/Features/Faq/faqActions';
import { Switch, message } from 'antd';
import MenuItem from '@mui/material/MenuItem';
import {
   allFaqCategoriesListSelector,
   allFaqCategoriesListLoadingSelector,
   allFaqCategoriesListErrorSelector,
   newPostSavedLoadingSelector,
   newPostSavedErrorSelector,
   singleFaqPostSelector,
   updatePostLoadingSelector,
} from './FaqSinglePostPage.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { useParams } from 'react-router';
import { removePostInfo } from '../../App/Features/Faq/faqSlice';
import * as DOMPurify from 'dompurify';
import JoditEditor from 'jodit-react';

const schema = yup.object({
   heading: yup.string().required('Post heading is reuqired'),
   categoryId: yup.string().required('Category id is required'),
});

function FaqSinglePostPage() {
   const {
      setValue,
      formState: { errors },
      control,
      handleSubmit,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         heading: '',
         isDefault: false,
         metaData: '',
         categoryId: '',
      },
   });

   const editor = useRef(null);
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const param = useParams();

   const allFaqCategoriesList = useSelector(allFaqCategoriesListSelector);
   const allFaqCategoriesListLoading = useSelector(allFaqCategoriesListLoadingSelector);
   const allFaqCategoriesListError = useSelector(allFaqCategoriesListErrorSelector);
   const newPostSavedLoading = useSelector(newPostSavedLoadingSelector);
   const newPostSavedError = useSelector(newPostSavedErrorSelector);
   const singleFaqPost = useSelector(singleFaqPostSelector);
   const updatePostLoading = useSelector(updatePostLoadingSelector);

   const onSubmit = function (data) {
      if (isAdmin) {
         if (!!param && param?.id) {
            dispatch(updatePost(Object.assign(data, { postId: param?.id })));
         } else {
            dispatch(createNewFaqPost(data));
         }
      } else {
         message.error('You need to login first');
      }
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllFaqCategoriesList());
      }

      if (isAdmin && !!param && param?.id) {
         dispatch(getSingleFaqPost({ postId: param?.id }));
      }
   }, [isAdmin, param]);

   useEffect(() => {
      if (!!singleFaqPost && singleFaqPost?.success && !!singleFaqPost?.item) {
         const { item } = singleFaqPost;
         setValue('heading', item?.heading);
         setValue('isDefault', item?.isDefault);
         setValue('categoryId', item?.categoryId);
         setValue('metaData', DOMPurify.sanitize(item?.metaData));
      }
   }, [singleFaqPost]);

   useEffect(() => {
      return () => {
         dispatch(removePostInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={!!param && param?.id ? 'Update faq post' : 'Create faq post'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
               <Box
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
               >
                  <div className="flex items-center space-x-2">
                     <div className="w-full">
                        <Controller
                           name="heading"
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <TextField
                                 className="w-full"
                                 value={value}
                                 onChange={onChange}
                                 label="Heading"
                                 variant="outlined"
                              />
                           )}
                        />
                        {!!errors?.heading?.message && <p className="text-sm error_cl">{errors?.heading.message}</p>}
                     </div>
                     <div className="w-full">
                        {!!allFaqCategoriesListLoading && <SpinnerComponent />}
                        {!!allFaqCategoriesListError && <p className="text-sm error_cl">{allFaqCategoriesListError}</p>}
                        {!!allFaqCategoriesList &&
                           allFaqCategoriesList?.success &&
                           !!allFaqCategoriesList?.items &&
                           allFaqCategoriesList?.items.length && (
                              <>
                                 <Controller
                                    name="categoryId"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                       <TextField
                                          value={value || ''}
                                          onChange={onChange}
                                          className="w-full"
                                          select
                                          label="Select"
                                          defaultValue={''}
                                       >
                                          {allFaqCategoriesList?.items.map((option) => (
                                             <MenuItem key={option._id} value={option._id}>
                                                {option.heading}
                                             </MenuItem>
                                          ))}
                                       </TextField>
                                    )}
                                 />
                                 {!!errors?.categoryId?.message && (
                                    <p className="text-sm error_cl">{errors?.categoryId.message}</p>
                                 )}
                              </>
                           )}
                     </div>
                  </div>
                  <div className="flex space-x-2 pb-3 pt-4">
                     <Controller
                        name="isDefault"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <Switch
                              checked={value}
                              onChange={onChange}
                              checkedChildren={'Yes'}
                              unCheckedChildren={'No'}
                           />
                        )}
                     />
                     <p className="text-gray-200">Is default</p>
                  </div>
                  <Controller
                     name="metaData"
                     control={control}
                     render={({ field: { onChange, value } }) => (
                        <JoditEditor ref={editor} value={value} tabIndex={1} onChange={onChange} />
                     )}
                  />
                  <div className="pt-3">
                     <div className="flex">
                        <CustomButtonComponent
                           isLoading={!!param && param?.id ? updatePostLoading : newPostSavedLoading}
                           type={'submit'}
                           text={!!param && param?.id ? 'Update' : 'Save'}
                           btnCl={'Publish'}
                        />
                     </div>
                     {!!newPostSavedError && <p className="text-sm error_cl">{newPostSavedError}</p>}
                  </div>
               </Box>
            </form>
         </div>
      </styled.div>
   );
}

export default FaqSinglePostPage;

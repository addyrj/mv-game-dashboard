import React, { useEffect } from 'react';
import * as styled from './FaqCategorySinglePage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Switch, message } from 'antd';
import QuillComponent from '../../Components/QuillComponent/QuillComponent';
import { useDispatch, useSelector } from 'react-redux';
import { createNewFaqCategory, getSingleCategory, updateFaqCategory } from '../../App/Features/Faq/faqActions';
import {
   newFaqCategoryLoadingSelector,
   newFaqCategoryErrorSelector,
   singleCategorySelector,
   singleCategoryErrorSelector,
   updateFaqCategoryLoadingSelector,
} from './FaqCategory.Selector';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { categoryInfo } from '../../App/Features/Faq/faqSlice';
import * as DOMPurify from 'dompurify';

const schema = yup.object({
   heading: yup.string().required('Heading is reuqired'),
});

function FaqCategorySinglePage() {
   const {
      control,
      formState: { errors },
      handleSubmit,
      setValue,
   } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
         heading: '',
         isShow: false,
         metadata: '',
      },
   });

   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const param = useParams();
   const dispatch = useDispatch();

   const newFaqCategoryLoading = useSelector(newFaqCategoryLoadingSelector);
   const newFaqCategoryError = useSelector(newFaqCategoryErrorSelector);
   const singleCategory = useSelector(singleCategorySelector);
   const singleCategoryError = useSelector(singleCategoryErrorSelector);
   const updateFaqCategoryLoading = useSelector(updateFaqCategoryLoadingSelector);

   const onSubmit = function (data) {
      if (isAdmin) {
         if (!!param && param?.id) {
            dispatch(updateFaqCategory(Object.assign(data, { _id: param?.id })));
         } else {
            dispatch(createNewFaqCategory(data));
         }
      } else {
         message.error('Please login with admin account');
      }
   };

   useEffect(() => {
      if (!!singleCategory && singleCategory?.success && singleCategory?.item) {
         const { item } = singleCategory;
         setValue('heading', item?.heading);
         setValue('isShow', item?.isShow);
         setValue('metadata', DOMPurify.sanitize(item?.metadata));
      }
   }, [singleCategory]);

   useEffect(() => {
      if (isAdmin && !!param && param?.id) {
         dispatch(getSingleCategory({ categoryId: param?.id }));
      }
   }, [isAdmin, param]);

   useEffect(() => {
      return () => {
         dispatch(categoryInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Create new faq Category'}
               subHeading={'Faq Category'}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
               <Box
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
               >
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
                  <div className="flex space-x-2 pb-3">
                     <Controller
                        name="isShow"
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
                     <p className="text-gray-200">Is show</p>
                  </div>
                  <Controller
                     name="metadata"
                     control={control}
                     render={({ field: { onChange, value } }) => <QuillComponent onChange={onChange} value={value} />}
                  />
                  <div className="pt-2">
                     <div className="flex">
                        <CustomButtonComponent
                           isLoading={!!param && param?.id ? updateFaqCategoryLoading : newFaqCategoryLoading}
                           type={'submit'}
                           text={!!param && param?.id ? 'Update' : 'Publish'}
                           btnCl={'Publish'}
                        />
                     </div>
                     {!!newFaqCategoryError ||
                        (!!singleCategoryError && (
                           <p className="error_cl text-sm">{newFaqCategoryError || singleCategoryError}</p>
                        ))}
                  </div>
               </Box>
            </form>
         </div>
      </styled.div>
   );
}

export default FaqCategorySinglePage;

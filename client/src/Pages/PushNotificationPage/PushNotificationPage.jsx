import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import * as styled from './PushNotificationPage.style';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import QuillComponent from '../../Components/QuillComponent/QuillComponent';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import {
   createNewSystemNotification,
   getSingleNotificationInfo,
   updateSingleNotification,
} from '../../App/Features/Notification/notificationActions';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const Schema = yup.object({
   heading: yup.string().required('heading must be required'),
});

function PushNotificationPage() {
   const {
      handleSubmit,
      formState: { errors },
      setValue,
      control,
   } = useForm({
      defaultValues: {
         heading: '',
         description: '',
      },
      resolver: yupResolver(Schema),
   });
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const navigation = useNavigate();
   const [BtnLoading, setBtnLoading] = useState(false);
   const params = useParams();

   const notificationMessage = function (response) {
      const responseData = response?.payload?.data;

      if (responseData) {
         if (responseData?.success) {
            message.success(responseData?.message);
         } else {
            message.error(responseData?.message);
         }
         setBtnLoading(false);
      }
   };

   const onSubmit = async function (data) {
      if (!isAdmin) {
         return navigation('/dashboard/auth/login');
      }
      setBtnLoading(true);

      if (params?.id) {
         const response = await dispatch(updateSingleNotification({ data, id: params?.id }));
         notificationMessage(response);
      } else {
         const response = await dispatch(createNewSystemNotification({ data: data }));
         notificationMessage(response);
      }
   };

   const fetchSingleNotification = async function () {
      const response = await dispatch(getSingleNotificationInfo({ notificationId: params?.id }));
      const data = response?.payload?.data;

      if (data) {
         setValue('heading', data?.notification?.heading);
         setValue('description', data?.notification?.description);
      } else {
         throw Error(data);
      }
   };

   useEffect(() => {
      if (isAdmin && params?.id) {
         fetchSingleNotification();
      }
   }, [isAdmin, params]);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               subHeading={`${params?.id ? 'Update' : 'Create'} system notifications`}
               pageName={`notification / ${params?.id ? 'Update' : 'create'}`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias.`}
            />
            <div className="mt-4">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                  >
                     <div className="w-full">
                        <Controller
                           name="heading"
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <TextField
                                 value={value}
                                 onChange={(e) => onChange(e.target.value)}
                                 className="w-full"
                                 label="Notification heading"
                                 variant="outlined"
                              />
                           )}
                        />
                        {!!errors?.heading?.message ? (
                           <p className="text-sm error_cl">{errors?.heading?.message}</p>
                        ) : null}
                     </div>
                     <div>
                        <Controller
                           name="description"
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <QuillComponent onChange={onChange} value={value} />
                           )}
                        />
                     </div>
                  </Box>
                  <div className="flex">
                     <CustomButtonComponent
                        text={params?.id ? 'update' : 'Save'}
                        btnCl={'Publish mt-4'}
                        type={'submit'}
                        isLoading={BtnLoading}
                     />
                  </div>
               </form>
            </div>
         </div>
      </styled.div>
   );
}

export default PushNotificationPage;

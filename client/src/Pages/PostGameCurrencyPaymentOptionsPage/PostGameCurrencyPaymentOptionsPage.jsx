import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { Switch } from 'antd';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { message } from 'antd';
import { GiPayMoney } from '@react-icons/all-files/gi/GiPayMoney';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import {
   insertPaymentMethodInfoSelector,
   insertPaymentMethodInfoLoadingSelector,
   insertPaymentMethodErrorSelector,
   updatePaymentOptionInfoSelector,
   updatePaymentOptionLoadingSelector,
   updatePaymentOptionErrorSelector,
   paymentFieldsSelector,
   paymentFieldsLoadingSelector,
   paymentFieldsErrorSelector,
} from './PostGameCurrency.Selector';
import {
   insertNewCurrencyPaymentOption,
   getSinglePaymentCurrencyOption,
   updatePaymentOption,
   getAllPaymentOptionFieldsList,
} from '../../App/Features/Payment/paymentActions';
import { useParams } from 'react-router-dom';
import { removeUpdatePaymentOptionInfo } from '../../App/Features/Payment/paymentSlice';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import AutoCompleteTagComponent from '../../Components/AutoCompleteTagComponent/AutoCompleteTagComponent';

const Schema = yup.object({
   name: yup.string().required('Game name is required'),
   min: yup
      .number('min must be number')
      .required('min number is reuqired')
      .positive()
      .integer()
      .min(50, 'Minimum payment threshold is 50'),
   max: yup
      .number('Max must be number')
      .required('Max numebr is required')
      .positive()
      .integer()
      .moreThan(yup.ref('min'), 'Max should be more then min'),
});

function PostGameCurrencyPaymentOptionsPage() {
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();
   const [ImagePreview, setImagePreview] = useState(null);
   const params = useParams();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
      getValues,
   } = useForm({
      defaultValues: {
         vipOnly: false,
         paymentOptionsFields: '',
      },
      resolver: yupResolver(Schema),
   });

   const insertPaymentMethodError = useSelector(insertPaymentMethodErrorSelector);
   const insertPaymentMethodInfo = useSelector(insertPaymentMethodInfoSelector);
   const insertPaymentMethodInfoLoading = useSelector(insertPaymentMethodInfoLoadingSelector);
   const updatePaymentOptionError = useSelector(updatePaymentOptionErrorSelector);
   const updatePaymentOptionLoading = useSelector(updatePaymentOptionLoadingSelector);
   const updatePaymentOptionInfo = useSelector(updatePaymentOptionInfoSelector);
   const paymentFields = useSelector(paymentFieldsSelector);
   const paymentFieldsLoading = useSelector(paymentFieldsLoadingSelector);
   const paymentFieldsError = useSelector(paymentFieldsErrorSelector);

   const imageHandler = function (event) {
      const imageFile = event.target.files[0];
      setValue('image', imageFile);
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         setImagePreview(imageSrc);
      }
   };

   const createFormData = function (data) {
      const formData = new FormData();
      formData.append('name', data?.name);
      formData.append('description', data?.description);
      formData.append('min', data?.min);
      formData.append('max', data?.max);
      formData.append('vipOnly', data?.vipOnly);
      formData.append('image', data?.image);
      formData.append('paymentFields', JSON.stringify(data?.paymentOptionsFields));

      return formData;
   };

   const onSubmit = function (data) {
      const formData = createFormData(data);

      if (!data?.paymentOptionsFields.length) {
         return message.error('Payment options fields is required');
      }

      if (!params?.id) {
         if (!ImagePreview) {
            return message.error('Payment options image is required');
         }
         dispatch(insertNewCurrencyPaymentOption({ formData }));
      }

      if (params?.id) {
         dispatch(updatePaymentOption({ formData, _id: params?.id }));
      }
   };

   const SinglePaymentOption = async function () {
      try {
         const response = await dispatch(getSinglePaymentCurrencyOption({ _id: params?.id }));
         const data = response?.payload?.data;

         if (data && data?.method.length) {
            const method = data?.method?.[0];

            setValue('name', method?._id.name);
            setImagePreview(method?._id.icon);
            setValue('vipOnly', method?._id.vipOnly);
            setValue('description', method?._id.description);
            setValue('min', method?._id.min);
            setValue('max', method?._id.max);
            setValue('paymentOptionsFields', method.paymentFields);
         }
      } catch (err) {
         console.log(err);
      }
   };

   useEffect(() => {
      if (isAdmin) {
         if (params?.id) {
            SinglePaymentOption();
         }

         dispatch(getAllPaymentOptionFieldsList());
      }

      return () => {
         dispatch(removeUpdatePaymentOptionInfo());
      };
   }, [isAdmin]);

   return (
      <div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               subHeading={params?.id ? 'Update payment option' : 'Create new payment options'}
               pageName={'Currency Payment'}
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
                  >
                     <div className="w-full flex items-center space-x-2">
                        <div className="w-full">
                           <TextField
                              label="Name"
                              className="w-full"
                              required
                              variant="outlined"
                              {...register('name')}
                              type={'text'}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                        </div>
                        <div className="w-full">
                           {paymentFieldsLoading && <SpinnerComponent />}
                           {paymentFieldsError && <p className="text-sm error_cl">{paymentFieldsError}</p>}
                           {!!paymentFields &&
                           paymentFields?.success &&
                           paymentFields?.items &&
                           paymentFields?.items.length ? (
                              <Controller
                                 name="paymentOptionsFields"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <AutoCompleteTagComponent
                                       setValue={setValue}
                                       getValues={getValues}
                                       items={paymentFields?.items}
                                       filed={'paymentOptionsFields'}
                                       value={value}
                                       label={'Fields'}
                                       placeholder={'Fields'}
                                       fieldName={'label'}
                                    />
                                 )}
                              />
                           ) : null}
                        </div>
                     </div>
                     <TextField
                        label="Description"
                        type={'text'}
                        multiline
                        rows={5}
                        {...register('description')}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     <div className="w-full flex items-center space-x-2">
                        <div className="w-full">
                           <TextField
                              label="Min deposit amount"
                              className="w-full"
                              required
                              variant="outlined"
                              {...register('min')}
                              type={'number'}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                           {!!errors?.min?.message ? <p className="text-sm error_cl">{errors?.min?.message}</p> : null}
                        </div>
                        <div className="w-full">
                           <TextField
                              label="Max deposit amount"
                              className="w-full"
                              required
                              variant="outlined"
                              {...register('max')}
                              type={'number'}
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                           {!!errors?.max?.message ? <p className="text-sm error_cl">{errors?.max?.message}</p> : null}
                        </div>
                     </div>
                     <div className="flex items-center space-x-4">
                        <p className="text-gray-200 text-sm font-medium mt-3">Vip only</p>
                        <Controller
                           name="vipOnly"
                           control={control}
                           render={({ field: { onChange, value } }) => (
                              <Switch
                                 className="mt-3"
                                 checkedChildren="Yes"
                                 unCheckedChildren="No"
                                 defaultChecked
                                 onChange={onChange}
                                 checked={value}
                              />
                           )}
                        />
                     </div>
                  </Box>
                  <div className="flex space_div">
                     <div>
                        <ImageUploadComponent
                           icon={<GiPayMoney />}
                           width={200}
                           label={'Game Image'}
                           height={200}
                           onChange={imageHandler}
                           preview={ImagePreview}
                           accept={'image/*'}
                        />
                     </div>
                  </div>
                  <div className="flex">
                     <CustomButtonComponent
                        type={'submit'}
                        text={params?.id ? 'Update' : 'Save'}
                        btnCl={'Publish mt-3'}
                        isLoading={params?.id ? updatePaymentOptionLoading : insertPaymentMethodInfoLoading}
                     />
                  </div>
                  {!!updatePaymentOptionInfo ? (
                     <p className="text-sm text-gray-300 mt-2">{updatePaymentOptionInfo?.message}</p>
                  ) : null}
                  {!!insertPaymentMethodError ? (
                     <p className="text-sm error_cl mt-2">{insertPaymentMethodError}</p>
                  ) : null}
                  {!!updatePaymentOptionError ? (
                     <p className="text-sm error_cl mt-2">{updatePaymentOptionError}</p>
                  ) : null}
                  {!!insertPaymentMethodInfo && insertPaymentMethodInfo?.success ? (
                     <p className="text-sm text-gray-300 mt-2">{insertPaymentMethodInfo?.message}</p>
                  ) : null}
               </form>
            </div>
         </div>
      </div>
   );
}

export default PostGameCurrencyPaymentOptionsPage;

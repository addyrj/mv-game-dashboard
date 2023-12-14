import React, { useState, useEffect } from 'react';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MenuItem from '@mui/material/MenuItem';
import CheckBoxComponent from '../CheckBoxComponent/CheckBoxComponent';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useDispatch } from 'react-redux';
import {
   createNewPaymentOptionField,
   getSinglePaymentOptionField,
   updatePaymentOptionField,
} from '../../App/Features/Payment/paymentActions';
import useRoles from '../../Hooks/useRoles';
import { message } from 'antd';
import { useParams } from 'react-router';

const currencies = [
   { value: 'text', label: 'Text' },
   { value: 'number', label: 'Number' },
   { value: 'boolean', label: 'Boolean' },
];

const Schema = yup.object({
   label: yup.string().required('Filed label is required'),
   labelKey: yup.string().required('Filed label key is required'),
   fieldType: yup.string().required('Filed field type is required'),
});

function CreatePaymentFieldsPage() {
   const {
      control,
      formState: { errors },
      setValue,
      handleSubmit,
   } = useForm({
      defaultValues: {
         label: '',
         labelKey: '',
         fieldType: '',
         hide: false,
         readOnly: false,
      },
      resolver: yupResolver(Schema),
   });
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const [loading, setLoading] = useState(false);
   const params = useParams();
   const editId = params?.id;

   const onSubmit = async function (data) {
      if (isAdmin) {
         setLoading(true);
         let response;

         if (!editId) {
            response = await dispatch(createNewPaymentOptionField(data));
         } else {
            response = await dispatch(updatePaymentOptionField({ ...data, fieldId: editId }));
         }

         const payload = response?.payload?.data;
         if (payload) {
            setLoading(false);

            if (payload?.success) {
               message.success(payload?.message);
            } else {
               message.error(payload?.message);
            }
         }
      }
   };

   const fetchSingleField = async function () {
      const response = await dispatch(getSinglePaymentOptionField({ fieldId: editId }));
      const data = response?.payload?.data;
      if (data && data?.success && data?.item) {
         const { item } = data;
         setValue('label', item?.label);
         setValue('labelKey', item?.labelKey);
         setValue('fieldType', item?.fieldType);
         setValue('hide', item?.hide);
         setValue('readOnly', item?.readOnly);
      }
   };

   useEffect(() => {
      if (editId) {
         fetchSingleField();
      }
   }, []);

   return (
      <div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               heading={`Payment Fields ${editId && 'edit'}`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <div className="mt-5">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                  >
                     <div className="flex items-center space-x-2">
                        <div className="w-full">
                           <Controller
                              name="label"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    value={value}
                                    onChange={onChange}
                                    label="Field label"
                                    variant="outlined"
                                    className="w-full"
                                    type={'text'}
                                    required
                                 />
                              )}
                           />
                           {!!errors && errors?.label && errors?.label?.message && (
                              <p className="text-sm error_cl">{errors?.label?.message}</p>
                           )}
                        </div>
                        <div className="w-full">
                           <Controller
                              name="labelKey"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    value={value}
                                    onChange={onChange}
                                    label="Field label key"
                                    variant="outlined"
                                    className="w-full"
                                    type={'text'}
                                    required
                                 />
                              )}
                           />
                           {!!errors && errors?.labelKey && errors?.labelKey?.message && (
                              <p className="text-sm error_cl">{errors?.labelKey?.message}</p>
                           )}
                        </div>
                        <div className="w-full">
                           <Controller
                              name="fieldType"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    value={value}
                                    onChange={onChange}
                                    className="w-full"
                                    select
                                    required
                                    label="Field type"
                                 >
                                    {currencies.map((option) => (
                                       <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              )}
                           />
                           {!!errors && errors?.fieldType && errors?.fieldType?.message && (
                              <p className="text-sm error_cl">{errors?.fieldType?.message}</p>
                           )}
                        </div>
                     </div>
                     <CheckBoxComponent heading={'Field hide'} name="hide" control={control} Controller={Controller} />
                     <CheckBoxComponent
                        heading={'Field read only'}
                        name="readOnly"
                        control={control}
                        Controller={Controller}
                     />
                  </Box>
                  <div className="flex mt-4">
                     <CustomButtonComponent
                        type={'submit'}
                        text={editId ? 'Update' : 'Save'}
                        btnCl={'Publish'}
                        isLoading={loading}
                     />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default CreatePaymentFieldsPage;

import React, { useState, useEffect } from 'react';
import * as styled from './CreateNewGameProviderPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { FaProjectDiagram } from '@react-icons/all-files/fa/FaProjectDiagram';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
   createNewGameProvider,
   getSingleGameProvider,
   updateGameProvider,
} from '../../App/Features/GameProviders/GameProvidersActions';
import {
   postNewGameProviderInfoSelector,
   postNewGameProviderLoadingSelector,
   postNewGameProviderErrorSelector,
   postNewGameProviderInvalidErrorsSelector,
} from './GameProvider.Selector';
import { MenuItem } from '@mui/material';
import { useParams } from 'react-router';
import { removeProviderErros } from '../../App/Features/GameProviders/GameProvidersSlice';
import PhoneInput from 'react-phone-number-input';

const Schema = yup.object({
   providerName: yup.string().required('Game provider name is required'),
   email: yup.string().email().required('Game provider email is required'),
});

const Status = [
   { value: 'Publish', label: 'Publish' },
   { value: 'Draft', label: 'Draft' },
];

function CreateNewGameProviderPage() {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
   } = useForm({
      resolver: yupResolver(Schema),
   });

   const [Logo, setLogo] = useState(null);
   const [PrevImage, setPrevImage] = useState(null);
   const [ProviderStatus, setProviderStatus] = useState('Draft');
   const dispatch = useDispatch();
   const param = useParams();

   const postNewGameProviderInfo = useSelector(postNewGameProviderInfoSelector);
   const postNewGameProviderLoading = useSelector(postNewGameProviderLoadingSelector);
   const postNewGameProviderError = useSelector(postNewGameProviderErrorSelector);
   const postNewGameProviderInvalidErrors = useSelector(postNewGameProviderInvalidErrorsSelector);

   const ImageHandler = function (event) {
      const imageFile = event.target.files[0];
      setLogo(imageFile);
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         setPrevImage(imageSrc);
      }
   };

   const CreateFormData = function (data) {
      const formData = new FormData();
      formData.append('providerName', data?.providerName);
      formData.append('email', data?.email);
      formData.append('phoneNumber', data?.phoneNumber);
      formData.append('description', data?.description);
      formData.append('status', ProviderStatus);
      formData.append('profileTag', data?.profileTag);
      formData.append('file', Logo);

      if (!!param && param?.id) {
         formData.append('_id', param?.id);
      }

      return formData;
   };

   const onSubmit = function (data) {
      if (!!param && param?.id) {
         const formData = CreateFormData(data);
         dispatch(updateGameProvider({ formData, _id: param?.id }));
      } else {
         if (!Logo) {
            return message.error('Provider logo is requried');
         }
         const formData = CreateFormData(data);
         dispatch(createNewGameProvider({ formData }));
      }
   };

   useEffect(() => {
      if (!!param && param?.id) {
         dispatch(getSingleGameProvider({ _id: param?.id }))
            .then((res) => {
               if (!res.status === 200) {
                  console.error(res);
               } else {
                  const data = res.payload?.data?.provider;

                  setValue('providerName', data?.providerName);
                  setValue('email', data?.email);
                  setValue('phoneNumber', data?.phoneNumber.toString());
                  setValue('description', data?.description);
                  setValue('profileTag', data?.profileTag);
                  setPrevImage(data?.logo);
                  setProviderStatus(data?.status);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }

      return () => {
         dispatch(removeProviderErros());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent pageName={!!param && param?.id ? 'Edit game provider' : 'Create game providers'} />
            <form onSubmit={handleSubmit(onSubmit)}>
               <Box
                  sx={{
                     '& > :not(style)': { my: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
               >
                  <div className="w-full flex items-center space-x-4">
                     <div className="w-full">
                        <TextField
                           className="w-full"
                           label="Game Provider Name"
                           variant="outlined"
                           type={'text'}
                           required
                           {...register('providerName')}
                           InputLabelProps={{
                              shrink: true,
                           }}
                        />
                        {!!errors?.providerName?.message ? (
                           <p className="text-sm error_cl">{errors?.providerName?.message}</p>
                        ) : null}
                     </div>
                     <div className="w-full">
                        <TextField
                           className="w-full"
                           label="Game Provider email"
                           variant="outlined"
                           type={'email'}
                           required
                           {...register('email')}
                           InputLabelProps={{
                              shrink: true,
                           }}
                        />
                        {!!errors?.email?.message ? <p className="text-sm error_cl">{errors?.email?.message}</p> : null}
                     </div>
                     <Controller
                        name="phoneNumber"
                        rules={{ required: true }}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <PhoneInput
                              value={value}
                              onChange={onChange}
                              placeholder="Enter phone number"
                              className="w-full"
                              required
                           />
                        )}
                     />
                     <div className="w-full">
                        <TextField
                           select
                           label="Provider Status"
                           className="w-full"
                           value={ProviderStatus}
                           onChange={(e) => setProviderStatus(e.target.value)}
                        >
                           {Status.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                 {option.label}
                              </MenuItem>
                           ))}
                        </TextField>
                     </div>
                  </div>
                  <TextField
                     className="w-full"
                     label="Profile Tag"
                     variant="outlined"
                     type={'text'}
                     required
                     {...register('profileTag')}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
                  <TextField
                     label="Description"
                     {...register('description')}
                     multiline
                     rows={7}
                     InputLabelProps={{
                        shrink: true,
                     }}
                  />
                  <div>
                     <ImageUploadComponent
                        width={400}
                        height={400}
                        label={'Game provider logo'}
                        icon={<FaProjectDiagram />}
                        accept={'image/*'}
                        onChange={ImageHandler}
                        preview={PrevImage}
                     />
                  </div>
                  <div className="flex">
                     <CustomButtonComponent
                        type={'submit'}
                        btnCl={'Publish mt-4'}
                        text={!!param && param?.id ? 'Update' : 'Save'}
                        isLoading={postNewGameProviderLoading}
                     />
                  </div>
                  {!!postNewGameProviderInfo ? <p className="text-gray-300">{postNewGameProviderInfo?.message}</p> : null}
                  {!!postNewGameProviderError ? <p className="text-sm error_cl">{postNewGameProviderError}</p> : null}
                  {!!postNewGameProviderInvalidErrors &&
                  postNewGameProviderInvalidErrors?.error &&
                  postNewGameProviderInvalidErrors?.error.length ? (
                     <div>
                        {postNewGameProviderInvalidErrors?.error.map((el, index) => (
                           <p className="text-sm error_cl" key={index}>
                              {el?.msg}
                           </p>
                        ))}
                     </div>
                  ) : null}
               </Box>
            </form>
         </div>
      </styled.div>
   );
}

export default CreateNewGameProviderPage;

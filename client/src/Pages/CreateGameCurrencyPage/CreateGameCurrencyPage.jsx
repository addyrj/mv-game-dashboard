import React, { useRef, useState, useEffect } from 'react';
import * as styled from './CreateGameCurrencyPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { AiFillFileImage } from '@react-icons/all-files/ai/AiFillFileImage';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
   inertNewGameCurrency,
   updateSingleGameCurrency,
   getSingleGameCurrency,
} from '../../App/Features/Games/GameActions';
import useRoles from '../../Hooks/useRoles';
import { removeCurrencyInfo } from '../../App/Features/Games/GameSlice';
import { getAllPaymentOptionList } from '../../App/Features/Payment/paymentActions';
import {
   uploadCurrencyInfoSelector,
   uploadCurrencyLoadingSelector,
   uploadCurrencyErrorSelector,
   singleGameCurrencySelector,
   singleGameCurrencyErrorSelector,
   updateGameCurrencySelector,
   updateGameCurrencyLoadingSelector,
   updateGameCurrencyErrorSelector,
   paymentOptionsListSelector,
   paymentOptionsListLoadingSelector,
   paymentOptionsListErrorSelector,
} from './CreateGame.Selector';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import AutoCompleteTagComponent from '../../Components/AutoCompleteTagComponent/AutoCompleteTagComponent';

const CurrencyType = [{ name: 'FIAT', value: 'FIAT' }];

const Schema = yup.object({
   currencyName: yup.string().required('Currency name is required'),
});

function CreateGameCurrencyPage() {
   const [PrevImage, setPrevImage] = useState(null);
   const editor = useRef(null);
   const [content, setContent] = useState(null);
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
      getValues,
      control,
   } = useForm({
      defaultValues: {
         currencyType: 'FIAT',
      },
      resolver: yupResolver(Schema),
   });
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const params = useParams();
   const dispatch = useDispatch();

   const uploadCurrencyInfo = useSelector(uploadCurrencyInfoSelector);
   const uploadCurrencyLoading = useSelector(uploadCurrencyLoadingSelector);
   const uploadCurrencyError = useSelector(uploadCurrencyErrorSelector);
   const singleGameCurrency = useSelector(singleGameCurrencySelector);
   const singleGameCurrencyError = useSelector(singleGameCurrencyErrorSelector);
   const updateGameCurrency = useSelector(updateGameCurrencySelector);
   const updateGameCurrencyLoading = useSelector(updateGameCurrencyLoadingSelector);
   const updateGameCurrencyError = useSelector(updateGameCurrencyErrorSelector);
   const paymentOptionsList = useSelector(paymentOptionsListSelector);
   const paymentOptionsListLoading = useSelector(paymentOptionsListLoadingSelector);
   const paymentOptionsListError = useSelector(paymentOptionsListErrorSelector);

   const imageHandler = function (event) {
      const imageFiles = event.target.files;
      const imageFilesLength = imageFiles.length;
      const file = imageFiles[0];
      setValue('file', file);
      if (imageFilesLength > 0) {
         const imageSrc = URL.createObjectURL(imageFiles[0]);
         setPrevImage(imageSrc);
      }
   };

   const createFormData = function (data) {
      const formData = new FormData();
      formData.append('currencyName', data?.currencyName);
      // formData.append('locked', data?.locked);
      formData.append('description', data?.description);
      formData.append('metaDescription', content);
      formData.append('currencyType', data?.currencyType);
      formData.append('file', data?.file);
      formData.append('paymentOptions', JSON.stringify(data?.paymentOptions));

      return formData;
   };

   const onSubmit = function (data) {
      const formData = createFormData(data);
      if (isAdmin && !params?.id) {
         dispatch(inertNewGameCurrency({ formData }));
      } else if (isAdmin && params?.id) {
         dispatch(updateSingleGameCurrency({ id: params?.id, formData }));
      }
   };

   useEffect(() => {
      if (isAdmin && params?.id && !singleGameCurrency) {
         dispatch(getSingleGameCurrency({ id: params?.id }));
      }
   }, [params?.id, isAdmin]);

   useEffect(() => {
      if (
         !!singleGameCurrency &&
         singleGameCurrency?.success &&
         !!singleGameCurrency?.currency &&
         singleGameCurrency?.currency?.length
      ) {
         const currencyData = singleGameCurrency?.currency[0]?._id;
         setValue('description', currencyData?.description);
         setValue('currencyName', currencyData?.currencyName);
         // setValue('locked', currencyData?.locked);
         setValue('paymentOptions', singleGameCurrency?.currency[0]?.paymentOptions);
         setContent(currencyData?.metaDescription);
         setPrevImage(currencyData?.icon);
      }
   }, [singleGameCurrency]);

   useEffect(() => {
      if (!paymentOptionsList) {
         dispatch(getAllPaymentOptionList());
      }
      return () => {
         dispatch(removeCurrencyInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               subHeading={params?.id ? 'Update Game Currency' : 'Create New Game Currency'}
               pageName={'Game Currency'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a.`}
            />
            <div className="mt-5">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <div className="block lg:flex items-center w-full lg:space-x-3">
                        <div className="w-full mb-5 lg:mb-0">
                           <TextField
                              required
                              className="w-full"
                              label="currency Name"
                              {...register('currencyName')}
                              variant="outlined"
                              InputLabelProps={{
                                 shrink: true,
                              }}
                           />
                           {errors?.currencyName?.message ? (
                              <p className="text-sm error_cl">{errors?.currencyName?.message}</p>
                           ) : null}
                        </div>
                        {/* <div className="w-full">
                           <Controller
                              name="locked"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    className="w-full"
                                    select
                                    required
                                    label="Currency Locked"
                                    variant="outlined"
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    onChange={onChange}
                                    value={value?.toString() || ''}
                                 >
                                    {Currencies.map((option) => (
                                       <MenuItem
                                          key={option.value}
                                          value={option.value}
                                       >
                                          {option.label}
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              )}
                           />
                        </div> */}
                        <div className="w-full">
                           <Controller
                              name="currencyType"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    className="w-full"
                                    select
                                    required
                                    label="Currency Type"
                                    variant="outlined"
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    onChange={onChange}
                                    value={value?.toString() || ''}
                                 >
                                    {CurrencyType.map((option) => (
                                       <MenuItem key={option.value} value={option.value}>
                                          {option.value}
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              )}
                           />
                        </div>
                        <div className="w-full mt-4 md:mt-0">
                           {!!paymentOptionsListLoading ? <SpinnerComponent /> : null}
                           {!!paymentOptionsListError ? (
                              <p className="text-sm error_cl">{paymentOptionsListError}</p>
                           ) : null}
                           {!!paymentOptionsList &&
                           paymentOptionsList?.success &&
                           paymentOptionsList?.items &&
                           paymentOptionsList?.items.length ? (
                              <Controller
                                 name="paymentOptions"
                                 control={control}
                                 render={({ field: { value } }) => (
                                    <AutoCompleteTagComponent
                                       setValue={setValue}
                                       getValues={getValues}
                                       items={paymentOptionsList?.items}
                                       filed={'paymentOptions'}
                                       value={value}
                                       label={'Payment methods'}
                                       placeholder={'Payment methods'}
                                       fieldName={'name'}
                                    />
                                 )}
                              />
                           ) : null}
                        </div>
                     </div>
                     <div className="w-full space_div">
                        <TextField
                           className="w-full"
                           label="Description"
                           multiline
                           rows={4}
                           {...register('description')}
                           InputLabelProps={{
                              shrink: true,
                           }}
                        />
                        <div className="space_div">
                           <label className="text-gray-400 font-medium">Meta Description</label>
                           <p className="mt-2 text-gray-400">
                              A meta description tag generally informs and interests users with a short, relevant
                              summary of what a particular page is about.
                           </p>
                           <div>
                              <JoditEditor
                                 className="mt-3"
                                 ref={editor}
                                 value={content}
                                 tabIndex={1}
                                 onChange={(newContent) => setContent(newContent)}
                                 config={{ theme: 'dark' }}
                              />
                           </div>
                        </div>
                     </div>
                     <ImageUploadComponent
                        accept={'image/*'}
                        width={200}
                        height={200}
                        preview={PrevImage}
                        onChange={imageHandler}
                        label={'Currency Icon'}
                        icon={<AiFillFileImage className="text-gray-500" />}
                     />
                     <div className="flex">
                        <CustomButtonComponent
                           type={'submit'}
                           btnCl={'Publish mt-5'}
                           isLoading={params?.id ? updateGameCurrencyLoading : uploadCurrencyLoading}
                        >
                           <img src="/images/done.svg" />
                           {params?.id ? <p>Update</p> : <p>Publish</p>}
                        </CustomButtonComponent>
                     </div>
                  </Box>
                  <div className="mt-4">
                     {!!updateGameCurrency ? <p className="text-gray-300">{updateGameCurrency?.message}</p> : null}
                     {!!uploadCurrencyError ? <p className="text-sm error_cl">{uploadCurrencyError}</p> : null}
                     {!!uploadCurrencyInfo ? <p className="text-gray-300">{uploadCurrencyInfo?.message}</p> : null}
                     {!!singleGameCurrencyError ? <p className="text-sm error_cl">{singleGameCurrencyError}</p> : null}
                     {!!updateGameCurrencyError ? <p className="text-sm error_cl">{updateGameCurrencyError}</p> : null}
                  </div>
               </form>
            </div>
         </div>
      </styled.div>
   );
}

export default CreateGameCurrencyPage;

import React, { useRef, useState, useEffect } from 'react';
import * as styled from './UploadGamesPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { useParams } from 'react-router-dom';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { GiGamepad } from '@react-icons/all-files/gi/GiGamepad';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MenuItem } from '@mui/material';
import {
   getGameProvidersList,
   insertNewGame,
   getSingleGameInfo,
   updateSingleGame,
   getAllGamesCategroy,
} from '../../App/Features/Games/GameActions';
import useRoles from '../../Hooks/useRoles';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import { removeGameInfo } from '../../App/Features/Games/GameSlice';
import {
   gameProvidersListSelector,
   gameProvidersLoadingSelector,
   gameProvidersErrorSelector,
   insertGameInfoSelector,
   insertGameLoadingSelector,
   insertGameErrorSelector,
   updateGameinfoSelector,
   updateGameLoadingSelector,
   updateGameErrorSelector,
   allGamesCategorysSelector,
   allGamesCategorysLoadingSelector,
   allGamesCategorysErrorSelector,
} from './UploadGame.Selector';
import { message } from 'antd';
import { Switch } from 'antd';
import QuillComponent from '../../Components/QuillComponent/QuillComponent';

const Schema = yup.object({
   name: yup.string().required('Game name is required'),
   by: yup.string().required('Author name is required'),
   url: yup.string().required('Game url is reuqired'),
});

const Status = [
   { values: 'Publish', id: 1 },
   { values: 'Comming soon', id: 2 },
   { values: 'Draft', id: 3 },
];

function UploadGamesPage() {
   const {
      handleSubmit,
      formState: { errors },
      setValue,
      control,
   } = useForm({
      defaultValues: {
         gameStatus: 'Draft',
         gameCategory: '',
         gameProvider: '',
         gameBitcontroller: false,
         description: '',
      },
      resolver: yupResolver(Schema),
   });

   const editor = useRef(null);
   const [GameImagePreview, setGameImagePreview] = useState(null);
   const params = useParams();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();

   const gameProvidersList = useSelector(gameProvidersListSelector);
   const gameProvidersLoading = useSelector(gameProvidersLoadingSelector);
   const gameProvidersError = useSelector(gameProvidersErrorSelector);
   const insertGameInfo = useSelector(insertGameInfoSelector);
   const insertGameLoading = useSelector(insertGameLoadingSelector);
   const insertGameError = useSelector(insertGameErrorSelector);
   const updateGameinfo = useSelector(updateGameinfoSelector);
   const updateGameLoading = useSelector(updateGameLoadingSelector);
   const updateGameError = useSelector(updateGameErrorSelector);
   const allGamesCategorys = useSelector(allGamesCategorysSelector);
   const allGamesCategorysLoading = useSelector(allGamesCategorysLoadingSelector);
   const allGamesCategorysError = useSelector(allGamesCategorysErrorSelector);

   const imageHandler = function (event) {
      const imageFile = event.target.files[0];
      setValue('gameMainImage', imageFile);
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         setGameImagePreview(imageSrc);
      }
   };

   const createFormData = function (data) {
      const formData = new FormData();

      formData.append('name', data?.name);
      formData.append('by', data?.by);
      formData.append('description', data?.description);
      formData.append('aboutGame', data?.aboutGame);
      formData.append('gameMainImage', data?.gameMainImage);
      formData.append('gameProvider', data?.gameProvider);
      formData.append('url', data?.url);
      formData.append('urlMobile', data?.urlMobile);
      formData.append('gameStatus', data?.gameStatus);
      formData.append('gameCategory', data?.gameCategory);
      formData.append('gameBitcontroller', data?.gameBitcontroller);

      if (data?.gameCategory) {
         const gameCategoryAr = allGamesCategorys?.categorys.find((el) => el._id === data?.gameCategory);

         formData.append('gameCategoryName', gameCategoryAr?.name);
      }

      return formData;
   };

   const onSubmit = function (data) {
      if (isAdmin && !params?.id) {
         if (!data?.gameMainImage) {
            return message.error('Game image is required');
         }
         if (!data?.gameProvider) {
            return message.error('Game provider is required');
         }
         const formData = createFormData(data);
         dispatch(insertNewGame({ formData }));
      } else {
         const formData = createFormData(data);
         dispatch(updateSingleGame({ gameId: params?.id, formData }));
      }
   };

   useEffect(() => {
      if (isAdmin) {
         dispatch(getGameProvidersList());
         dispatch(getAllGamesCategroy());
      }
   }, [isAdmin]);

   const getSingleGameInfoHandler = async function () {
      const gameResponse = await dispatch(getSingleGameInfo({ gameId: params?.id }));

      if (gameResponse?.payload?.data && gameResponse?.payload?.data?.success) {
         const data = gameResponse?.payload?.data;
         setValue('name', data?.game?.name);
         setValue('by', data?.game?.by);
         setValue('url', data?.game?.url);
         setValue('urlMobile', data?.game?.urlMobile);
         setValue('description', data?.game?.description);
         setValue('gameStatus', data?.game?.gameStatus);
         setValue('gameCategory', data?.game?.gameCategory);
         setValue('gameProvider', data?.game?.gameProvider);
         setValue('aboutGame', data?.game?.aboutGame);
         setValue('gameBitcontroller', data?.game?.gameBitcontroller);
         setGameImagePreview(data?.game?.gameImage);
      } else {
         console.log(gameResponse);
      }
   };

   useEffect(() => {
      if (isAdmin && params?.id) {
         getSingleGameInfoHandler();
      }
   }, [isAdmin, params?.id]);

   useEffect(() => {
      return () => {
         dispatch(removeGameInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Games Upload'}
               para={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
            />
            <div className="mt-5 w-full">
               <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <Box
                     sx={{
                        '& > :not(style)': { my: 1, width: '100%' },
                     }}
                     noValidate
                     autoComplete="off"
                  >
                     <div className="flex items-center space-x-3">
                        <div className="w-full">
                           <Controller
                              name="name"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    onChange={onChange}
                                    value={value || ''}
                                    className="w-full"
                                    label="Game Name"
                                    required
                                    variant="outlined"
                                 />
                              )}
                           />
                           {!!errors?.name?.message ? (
                              <p className="text-sm error_cl">{errors?.name?.message}</p>
                           ) : null}
                        </div>
                        <div className="w-full">
                           <Controller
                              name="by"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    className="w-full"
                                    label="Game By"
                                    required
                                    value={value || ''}
                                    onChange={onChange}
                                    variant="outlined"
                                 />
                              )}
                           />
                           {!!errors?.by?.message ? <p className="text-sm error_cl">{errors?.by?.message}</p> : null}
                        </div>
                        <div className="w-full">
                           {!!allGamesCategorysError ? (
                              <p className="text-sm error_cl">{allGamesCategorysError}</p>
                           ) : null}
                           {!!allGamesCategorysLoading ? <SpinnerComponent /> : null}
                           {!!allGamesCategorys &&
                           !!allGamesCategorys?.categorys &&
                           allGamesCategorys?.categorys.length ? (
                              <Controller
                                 name="gameCategory"
                                 control={control}
                                 render={({ field: { onChange, value } }) => (
                                    <TextField
                                       select
                                       label="Game Category"
                                       className="w-full"
                                       value={value}
                                       name="data"
                                       onChange={(e) => onChange(e.target.value)}
                                       required
                                       InputLabelProps={{
                                          shrink: true,
                                       }}
                                    >
                                       {allGamesCategorys?.categorys.map((option) => (
                                          <MenuItem key={option._id} value={option._id} name={option.name}>
                                             {option.name}
                                          </MenuItem>
                                       ))}
                                    </TextField>
                                 )}
                              />
                           ) : null}
                        </div>
                        <div className="w-full">
                           <Controller
                              name="gameStatus"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <TextField
                                    select
                                    label="Game Status"
                                    className="w-full"
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    required
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                 >
                                    {Status.map((option) => (
                                       <MenuItem key={option.values} value={option.values}>
                                          {option.values}
                                       </MenuItem>
                                    ))}
                                 </TextField>
                              )}
                           />
                        </div>
                        {!!gameProvidersLoading ? (
                           <div className="w-full">
                              <SpinnerComponent />
                           </div>
                        ) : null}
                        {!!gameProvidersList && gameProvidersList?.success && gameProvidersList?.response ? (
                           <Controller
                              name="gameProvider"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <div className="w-full">
                                    <TextField
                                       className="w-full"
                                       id="outlined-select-currency"
                                       select
                                       required
                                       label="Game provider"
                                       value={value}
                                       onChange={(event) => onChange(event.target.value)}
                                    >
                                       {gameProvidersList?.response.map((option) => (
                                          <MenuItem key={option._id} value={option._id}>
                                             {option.providerName}
                                          </MenuItem>
                                       ))}
                                    </TextField>
                                 </div>
                              )}
                           />
                        ) : null}
                     </div>
                     <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <TextField label="Game Description" multiline rows={7} onChange={onChange} value={value} />
                        )}
                     />
                     <Controller
                        name="url"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <TextField
                              value={value || ''}
                              onChange={onChange}
                              className="w-full"
                              label="Game embed url"
                              required
                              variant="outlined"
                           />
                        )}
                     />
                     {!!errors?.url?.message ? <p className="text-sm error_cl">{errors?.url?.message}</p> : null}
                     <Controller
                        name="urlMobile"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                           <TextField
                              value={value || ''}
                              onChange={onChange}
                              className="w-full"
                              label="Game embed url mobile"
                              variant="outlined"
                           />
                        )}
                     />
                     <div>
                        <label className="text-gray-400">About this game</label>
                        <div className="mt-2">
                           <Controller
                              name="aboutGame"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <QuillComponent onChange={onChange} value={value} />
                              )}
                           />
                        </div>
                     </div>
                     <div className="flex pt-3">
                        <div>
                           <p className="text-gray-400">Will the game have a bit controller ?</p>
                           <Controller
                              name="gameBitcontroller"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                 <Switch onChange={onChange} checked={value} />
                              )}
                           />
                        </div>
                     </div>
                     <div className="flex space_div">
                        <div>
                           <ImageUploadComponent
                              icon={<GiGamepad />}
                              width={400}
                              label={'Game Image'}
                              height={400}
                              onChange={imageHandler}
                              preview={GameImagePreview}
                              accept={'image/*'}
                           />
                        </div>
                     </div>
                     <div className="flex">
                        <CustomButtonComponent
                           type={'submit'}
                           btnCl={'Publish mt-5'}
                           isLoading={params?.id ? updateGameLoading : insertGameLoading}
                        >
                           <img src="/images/done.svg" />
                           {params?.id ? <p>Update</p> : <p>Publish</p>}
                        </CustomButtonComponent>
                     </div>
                  </Box>
               </form>
            </div>
            {!!updateGameinfo && updateGameinfo?.success ? (
               <p className="text-gray-400">{updateGameinfo?.message}</p>
            ) : null}
            {!!updateGameinfo && !updateGameinfo?.success ? (
               <p className="text-sm error_cl">{updateGameinfo?.message}</p>
            ) : null}
            {!!insertGameInfo ? <p className="text-gray-400">{insertGameInfo?.message}</p> : null}
            {!!gameProvidersError ? <p className="text-sm error_cl">{gameProvidersError}</p> : null}
            {!!insertGameError ? <p className="text-sm error_cl">{insertGameError}</p> : null}
            {!!updateGameError ? <p className="text-sm error_cl">{updateGameError}</p> : null}
         </div>
      </styled.div>
   );
}

export default UploadGamesPage;

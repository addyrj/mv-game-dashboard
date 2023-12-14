import React, { useEffect, useState } from 'react';
import * as styled from './UserAvatarComponent.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import ImageUploadComponent from '../../Components/ImageUploadComponent/ImageUploadComponent';
import { BsCloudUpload } from '@react-icons/all-files/bs/BsCloudUpload';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAvatars, uploadGameAvatar } from '../../App/Features/Admin/adminActions';
import { removeAvatarInfo } from '../../App/Features/Admin/adminSlice';
import ImagePrevComponent from '../../Components/ImagePrevComponent/ImagePrevComponent';
import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';
import {
   gameAvatarUploadInfoSelector,
   gameAvatarUploadLoadingSelector,
   gameAvatarUploadErrorSelector,
   gameAvatarSelector,
   gameAvatarLoadingSelector,
   gameAvatarErrorSelector,
} from './UserAvatar.Selector';

function UserAvatarComponent() {
   const [AvatarPreview, setAvatarPreview] = useState(null);
   const [Avatar, setAvatar] = useState(null);
   const [Error, setError] = useState(null);
   const { register, handleSubmit } = useForm();
   const dispatch = useDispatch();

   const gameAvatarUploadInfo = useSelector(gameAvatarUploadInfoSelector);
   const gameAvatarUploadLoading = useSelector(gameAvatarUploadLoadingSelector);
   const gameAvatarUploadError = useSelector(gameAvatarUploadErrorSelector);
   const gameAvatar = useSelector(gameAvatarSelector);
   const gameAvatarLoading = useSelector(gameAvatarLoadingSelector);
   const gameAvatarError = useSelector(gameAvatarErrorSelector);

   const ImageHandler = function (event) {
      const imageFile = event.target.files[0];
      setAvatar(imageFile);
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         setAvatarPreview(imageSrc);
      }
   };

   const onSubmit = function (data) {
      if (!Avatar) {
         return setError('Image is required');
      }

      setError(null);
      const formData = new FormData();
      formData.append('file', Avatar);
      formData.append('description', data?.description);

      dispatch(uploadGameAvatar({ formData }));
   };

   useEffect(() => {
      dispatch(getAllAvatars());

      return () => {
         dispatch(removeAvatarInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent pageName={'Avatar upload'} heading={'File Upload'} />
            <div className="mt-5">
               <div className="flex">
                  <div>
                     <ImageUploadComponent
                        icon={<BsCloudUpload />}
                        width={400}
                        height={400}
                        onChange={ImageHandler}
                        accept={'image/*'}
                        preview={AvatarPreview}
                     />
                  </div>
                  <div className="content_div mx-4">
                     <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas eum sit sequi nihil necessitatibus
                        doloribus sed odit! Nisi, atque obcaecati!
                     </p>
                     <div className="mt-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                           <Box
                              sx={{
                                 '& .MuiTextField-root': {
                                    my: 1,
                                    width: '100%',
                                 },
                              }}
                              noValidate
                              autoComplete="off"
                           >
                              <TextField label="Description" multiline rows={5} {...register('description')} />
                              <div className="mt-2 flex items-center">
                                 <CustomButtonComponent
                                    text={'Upload'}
                                    btnCl={'Publish'}
                                    type={'submit'}
                                    isLoading={gameAvatarUploadLoading}
                                 />
                                 {/* <p className="mx-4 text-gray-400 cursor-pointer hover:text-sky-800">
                                    Cancel
                                 </p> */}
                              </div>
                              <div className="image_prev_div mt-4 rounded shadow">
                                 {!!gameAvatarError ? <p className="text-sm error_cl">{gameAvatarError}</p> : null}
                                 {!!gameAvatarLoading ? <SpinnerComponent /> : null}
                                 {!!gameAvatar && gameAvatar?.success
                                    ? gameAvatar?.avatars.map((el) => <ImagePrevComponent key={el._id} data={el} />)
                                    : null}
                              </div>
                              {!!gameAvatarUploadInfo && gameAvatarUploadInfo?.success ? (
                                 <p className="mt-2">{gameAvatarUploadInfo?.message}</p>
                              ) : null}
                              {!!Error ? <p className="text-sm error_cl mt-2">{Error}</p> : null}
                              {!!gameAvatarUploadError ? <p className="text-sm error_cl mt-2">{gameAvatarUploadError}</p> : null}
                           </Box>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default UserAvatarComponent;

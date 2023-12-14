import React, { Fragment, useCallback, useState, useEffect } from 'react';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import * as styled from './EditYourAvatarModelComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import Cropper from 'react-easy-crop';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineZoomIn } from '@react-icons/all-files/ai/AiOutlineZoomIn';
import { GrRotateLeft } from '@react-icons/all-files/gr/GrRotateLeft';
import { GrRotateRight } from '@react-icons/all-files/gr/GrRotateRight';
import toast from 'react-hot-toast';
import getCroppedImg from './CropImage';
import {
   updateAvatarHandler,
   getUsersAvatars,
} from '../../App/Features/Client/clientActions';
import { useCookies } from 'react-cookie';
import { FaCamera } from '@react-icons/all-files/fa/FaCamera';
import { motion } from 'framer-motion';
import { useSharedState } from '../../Context/PopUpContext';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { userInfoSelector } from '../EditProfileModelComponent/EditModel.Selector';
import {
   updateAvatarLoadingSelector,
   updateAvatarFetchErrorSelector,
   userAvatarsSelector,
   userAvatarsLoadingSelector,
   userAvatarsErrorSelector,
} from './EditAvatar.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function EditYourAvatarModelComponent() {
   const [crop, setCrop] = useState({ x: 0, y: 0 });
   const [zoom, setZoom] = useState(1);
   const [Rotation, setRotation] = useState(0);
   const [SelectedCropImage, setSelectedCropImage] = useState(null);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const [CustomSelectedImage, setCustomSelectedImage] = useState(null);
   const [ProfileImage, setProfileImage] = useState(null);
   const [Cookie] = useCookies();
   const [PopUpContextState, setPopUpContextState] = useSharedState();

   const userInfo = useSelector(userInfoSelector);
   const updateAvatarLoading = useSelector(updateAvatarLoadingSelector);
   const updateAvatarFetchError = useSelector(updateAvatarFetchErrorSelector);
   const userAvatars = useSelector(userAvatarsSelector);
   const userAvatarsLoading = useSelector(userAvatarsLoadingSelector);
   const userAvatarsError = useSelector(userAvatarsErrorSelector);

   const dispatch = useDispatch();

   const backHandler = function () {
      setPopUpContextState({ ...PopUpContextState, showEditAvatar: false });
   };

   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
   }, []);

   const rotateHandler = function (type) {
      if (type === 'INC') {
         setRotation((prevState) => prevState + 1);
      } else {
         setRotation((prevState) => prevState - 1);
      }
   };

   const zoomHandler = function () {
      setZoom((prevState) => prevState + 1);
   };

   const imageSelectHandler = function (el) {
      setCustomSelectedImage(null);
      setSelectedCropImage(el.url);
   };

   const cmSelectedImageHandler = function (event) {
      const files = event.target.files[0];
      setSelectedCropImage(null);
      setProfileImage(files);

      if (files) {
         setCustomSelectedImage(URL.createObjectURL(files));
      }
   };

   const changeInputValueHandler = function (event) {
      let value = +event.target.value;

      if (value > 0) {
         setZoom(value);
      }
   };

   const submitHandler = async function () {
      if (!!Cookie && Cookie?._mv_games_auth && Cookie?._mv_games_auth?._id) {
         if (
            !SelectedCropImage &&
            !CustomSelectedImage &&
            !Math.floor(Math.abs(crop.x)) &&
            !Math.floor(Math.abs(crop.y))
         ) {
            return toast.error('No Changes!', {
               position: 'bottom-left',
            });
         }

         if (SelectedCropImage === userInfo?.user?.avatar) {
            return toast.error('Please pick another one', {
               position: 'bottom-left',
            });
         }

         try {
            if (
               !!CustomSelectedImage &&
               !!ProfileImage &&
               !SelectedCropImage &&
               !Math.floor(Math.abs(crop.x)) &&
               !Math.floor(Math.abs(crop.y))
            ) {
               const formData = new FormData();
               formData.append('profileImage', ProfileImage);
               formData.append('userId', Cookie?._mv_games_auth?._id);

               return dispatch(
                  updateAvatarHandler({
                     formData,
                  })
               );
            }

            if (
               SelectedCropImage &&
               !Math.floor(Math.abs(crop.x)) &&
               !Math.floor(Math.abs(crop.y))
            ) {
               return dispatch(
                  updateAvatarHandler({
                     selectedImage: SelectedCropImage,
                     userId: Cookie?._mv_games_auth?._id,
                  })
               );
            }

            const croppedImage = await getCroppedImg(
               !!CustomSelectedImage
                  ? CustomSelectedImage
                  : !!SelectedCropImage
                  ? SelectedCropImage
                  : userInfo?.user?.avatar,
               croppedAreaPixels,
               Rotation
            );

            const { file, url } = croppedImage;
            const formData = new FormData();
            formData.append('profileImage', file);
            formData.append('userId', Cookie?._mv_games_auth?._id);

            return dispatch(
               updateAvatarHandler({
                  formData,
               })
            );
         } catch (err) {
            console.log(err);
         }
      } else {
         return toast.error('Need to login first');
      }
   };

   useEffect(() => {
      dispatch(getUsersAvatars());
   }, []);

   return (
      <motion.div
         className="model_cl"
         initial={{ opacity: 0.6, right: -600, left: 600 }}
         animate={{ opacity: 1, right: 0, left: 0 }}
         exit={{ opacity: 0.6, right: -600, left: 600 }}
         transition={{ duration: 0.5 }}
      >
         {!!userInfo && userInfo?.user && userInfo?.user?._id ? (
            <Fragment>
               <ModelHeaderComponent
                  heading={'Edit Your Avatar'}
                  back={backHandler}
                  backIcon={true}
               />
               <styled.imagePrevDiv>
                  <Cropper
                     image={
                        !!CustomSelectedImage
                           ? CustomSelectedImage
                           : !!SelectedCropImage
                           ? SelectedCropImage
                           : userInfo?.user?.avatar
                     }
                     crop={crop}
                     zoom={zoom}
                     aspect={3 / 3}
                     onCropChange={setCrop}
                     onCropComplete={onCropComplete}
                     onZoomChange={setZoom}
                     cropShape="round"
                     showGrid={false}
                     rotation={Rotation}
                  />
                  <styled.updateCustomImageDiv>
                     <div className="_input_div">
                        <FaCamera />
                        <input
                           type="file"
                           accept="image/*"
                           onChange={cmSelectedImageHandler}
                        />
                     </div>
                  </styled.updateCustomImageDiv>
               </styled.imagePrevDiv>
               <styled.imageControll className="my-3 pt-2 px-4">
                  <div className="inner_cn_div">
                     <div
                        className="iconDiv"
                        onClick={() => zoomHandler('INC')}
                     >
                        <AiOutlineZoomIn />
                     </div>
                     <styled.slideDiv className="iconDiv">
                        <input
                           type="range"
                           min="0"
                           max="100"
                           defaultValue="0"
                           onChange={changeInputValueHandler}
                        />
                     </styled.slideDiv>
                     <div
                        className="iconDiv"
                        onClick={() => rotateHandler('DEC')}
                     >
                        <GrRotateLeft />
                     </div>
                     <div
                        className="iconDiv"
                        onClick={() => rotateHandler('INC')}
                     >
                        <GrRotateRight />
                     </div>
                  </div>
               </styled.imageControll>
               <styled.avatarDiv className="mt-3 px-4">
                  <p className="text-gray-400 text-sm font-bold">
                     Default Avatar
                  </p>
                  <div className="mt-3 flex items-center space-x-4 justify-center">
                     {!!userAvatarsLoading ? <SpennerComponent /> : null}
                     {!!userAvatars &&
                     userAvatars?.success &&
                     userAvatars?.avatars?.length
                        ? userAvatars?.avatars.map((el, index) => (
                             <motion.div
                                key={el?._id}
                                className="imageDiv"
                                initial={{ scale: 0, rotate: 180 }}
                                animate={{ rotate: 0, scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{
                                   type: 'spring',
                                   stiffness: 180,
                                   delay: `${index / 10}`,
                                   damping: 20,
                                }}
                                onClick={() => imageSelectHandler(el)}
                             >
                                <LazyLoadImage
                                   src={el.url}
                                   crossOrigin="anonymous"
                                   alt=""
                                />
                             </motion.div>
                          ))
                        : null}
                  </div>
                  <CustomButtonComponent
                     text={'Submit'}
                     btnCl={'large_btn mt-4'}
                     onClick={submitHandler}
                     isLoading={updateAvatarLoading}
                  />
                  <div className="mt-3">
                     {!!updateAvatarFetchError ? (
                        <p className="text-sm error_cl">
                           {updateAvatarFetchError}
                        </p>
                     ) : null}
                  </div>
               </styled.avatarDiv>
            </Fragment>
         ) : null}
         {!!userAvatarsError ? (
            <p className="text-sm error_cl">{userAvatarsError}</p>
         ) : null}
      </motion.div>
   );
}

export default React.memo(EditYourAvatarModelComponent);

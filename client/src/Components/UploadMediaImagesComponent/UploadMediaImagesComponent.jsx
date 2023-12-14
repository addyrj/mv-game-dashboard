import React, { useRef, useState, useEffect } from 'react';
import ImageUploadComponent from '../ImageUploadComponent/ImageUploadComponent';
import {
   uploadBulkImagesInfoSelector,
   uploadBulkImagesLoadingSelector,
   uploadBulkImagesErrorSelector,
} from './Upload.Selector';
import { FcAddImage } from '@react-icons/all-files/fc/FcAddImage';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import { message } from 'antd';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { uploadBulkImages } from '../../App/Features/Media/MediaActions';
import { useDispatch, useSelector } from 'react-redux';
import useRoles from '../../Hooks/useRoles';
import { removeImagesInfo } from '../../App/Features/Media/MediaSlice';

function UploadMediaImagesComponent() {
   const [SelectedImages, setSelectedImages] = useState([]);
   const inputRef = useRef(null);
   const dt = new DataTransfer();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();
   const dispatch = useDispatch();

   const uploadBulkImagesInfo = useSelector(uploadBulkImagesInfoSelector);
   const uploadBulkImagesLoading = useSelector(uploadBulkImagesLoadingSelector);
   const uploadBulkImagesError = useSelector(uploadBulkImagesErrorSelector);

   const imageHandler = function (event) {
      const imageFiles = event.target.files;
      const imageFilesLength = imageFiles.length;

      if (imageFilesLength) {
         for (let item in imageFiles) {
            const numItems = +item;
            if (typeof numItems === 'number' && !isNaN(numItems)) {
               setSelectedImages((prevState) => [...prevState, imageFiles[item]]);
            }
         }
         for (let file of imageFiles) {
            dt.items.add(file);
         }
         message.info(`${imageFilesLength} files selected.`);
      }
      inputRef.current.files = dt.files;
   };

   const closeHandler = function (imageName, lastModified) {
      setSelectedImages(SelectedImages.filter((el) => el?.name !== imageName && el?.lastModified !== lastModified));
      for (let i = 0; i < dt.items.length; i++) {
         if (imageName === dt.items[i].getAsFile().name) {
            dt.items.remove(i);
            continue;
         }
      }
      inputRef.current.files = dt.files;
   };

   const onSubmit = function () {
      if (isAdmin) {
         const formData = new FormData();

         for (let i = 0; i < SelectedImages.length; i++) {
            formData.append('images', SelectedImages[i]);
         }
         dispatch(uploadBulkImages(formData));
      } else {
         message.error('You need to login first');
      }
   };

   const clearHandler = function () {
      setSelectedImages([]);
      dt.clearData();
      inputRef.current.value = '';
   };

   useEffect(() => {
      if (!!uploadBulkImagesInfo && uploadBulkImagesInfo?.success) {
         message.info(uploadBulkImagesInfo?.message);
         clearHandler();
      }
   }, [uploadBulkImagesInfo]);

   return (
      <div className="w-full">
         <ImageUploadComponent
            label={'Select multipal images'}
            height={'400'}
            icon={<FcAddImage />}
            upload={'multi'}
            accept={'image/*'}
            onChange={imageHandler}
            inputRef={inputRef}
         />

         <div className="mt-3 mb-4">
            <Stack sx={{ width: '100%' }} spacing={1}>
               {!!SelectedImages && SelectedImages?.length
                  ? SelectedImages.map((el) => (
                       <Alert
                          key={`${el?.lastModified}-${el?.name}`}
                          severity="success"
                          onClose={() => closeHandler(el?.name, el?.lastModified)}
                       >
                          {el?.name}
                       </Alert>
                    ))
                  : null}
            </Stack>
         </div>
         {!!SelectedImages && SelectedImages?.length ? (
            <div className="flex items-center space-x-3">
               <CustomButtonComponent
                  text={'Upload'}
                  btnCl={'Publish'}
                  onClick={onSubmit}
                  isLoading={uploadBulkImagesLoading}
               />
               <CustomButtonComponent text={'Clear'} btnCl={'Publish'} onClick={clearHandler} />
            </div>
         ) : (
            <CustomButtonComponent text={'Upload'} btnCl={'Publish no_allow'} />
         )}
         {!!uploadBulkImagesError && <p className="text-sm error_cl">{uploadBulkImagesError}</p>}
      </div>
   );
}

export default UploadMediaImagesComponent;

import React, { useRef, useState } from 'react';
import * as styled from './EditMediaFilePopupComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { motion } from 'framer-motion';
import { RiFindReplaceLine } from '@react-icons/all-files/ri/RiFindReplaceLine';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { replaceMediaImage } from '../../App/Features/Media/MediaActions';
import { message } from 'antd';
import {
   imageReplaceLoadingSelector,
   imageReplaceErrorSelector,
   imageReplacedInfoSelector,
} from './EditMedia.Selector';
import { removeReplaceError } from '../../App/Features/Media/MediaSlice';

function EditMediaFilePopupComponent({ close, selectedImage }) {
   const [ReplaceImage, setReplaceImage] = useState(null);
   const imageRef = useRef(null);
   const inputRef = useRef(null);
   const dispatch = useDispatch();

   const imageReplaceError = useSelector(imageReplaceErrorSelector);
   const imageReplaceLoading = useSelector(imageReplaceLoadingSelector);
   const imageReplacedInfo = useSelector(imageReplacedInfoSelector);

   const onChangeHandler = function (event) {
      const imageFile = event.target.files[0];
      if (imageFile) {
         const imageSrc = URL.createObjectURL(imageFile);
         imageRef.current.src = imageSrc;
         setReplaceImage(imageFile);
      }
   };

   const imageHandler = function () {
      inputRef.current.click();
   };

   const onSubmitHandler = function () {
      if (!selectedImage) {
         return message.error(
            'Selected image is not found. please first select the image.'
         );
      }

      if (!ReplaceImage) {
         return message.error(
            'Replace image is not found. please selected one more time.'
         );
      }

      const formData = new FormData();
      formData.append('file', ReplaceImage);
      formData.append('selectedImage', selectedImage);

      dispatch(replaceMediaImage(formData));
   };

   const closeHandler = function () {
      dispatch(removeReplaceError());
      close();
   };

   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mainDiv shadow"
         >
            <div className="closeBtn" onClick={closeHandler}>
               <VscClose className="text-gray-100 text-xl" />
            </div>
            <styled.imageBox>
               {/* <div className="replace_div" onClick={imageHandler}>
                  <input
                     type="file"
                     hidden
                     ref={inputRef}
                     onChange={onChangeHandler}
                     accept={'image/*'}
                  />
                  <RiFindReplaceLine className="text-gray-200 text-xl" />
               </div> */}
               <img src={selectedImage} ref={imageRef} alt="selected image" />
            </styled.imageBox>
            {!!ReplaceImage && (
               <div className="flex items-center justify-center pt-4 text-center">
                  <div>
                     <CustomButtonComponent
                        text={'Replace'}
                        btnCl={'Publish'}
                        onClick={onSubmitHandler}
                        isLoading={imageReplaceLoading}
                     />
                     {!!imageReplacedInfo && (
                        <p className="text-gray-300 text-sm mt-2">
                           {imageReplacedInfo}
                        </p>
                     )}
                  </div>
               </div>
            )}
            {!!imageReplaceError && (
               <p className="text-sm error_cl">{imageReplaceError}</p>
            )}
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default EditMediaFilePopupComponent;

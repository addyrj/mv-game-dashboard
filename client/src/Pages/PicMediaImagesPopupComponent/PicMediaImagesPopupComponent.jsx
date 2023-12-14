import React from 'react';
import * as styled from './PicMediaImagesPopupComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import MediaImagesComponent from '../../Components/MediaImagesComponent/MediaImagesComponent';
import { motion } from 'framer-motion';

function PicMediaImagesPopupComponent({ close }) {
   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="picDiv"
         >
            <div className="cl_div">
               <VscClose className="text-gray-200 text-xl" onClick={close} />
            </div>
            <MediaImagesComponent type={'select'} />
         </motion.div>
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default PicMediaImagesPopupComponent;

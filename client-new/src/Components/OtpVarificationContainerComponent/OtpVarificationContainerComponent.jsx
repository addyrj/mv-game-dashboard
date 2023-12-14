import React from 'react';
import OtpVarificationComponent from '../OtpVarificationComponent/OtpVarificationComponent';
import * as styled from './OtpVarificationContainerComponent.style';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { motion } from 'framer-motion';

function OtpVarificationContainerComponent({ close }) {
   return (
      <styled.div>
         <div className="overLay" onClick={close}></div>
         <motion.div
            initial={{ opacity: 0.4, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.6 }}
            transition={{
               duration: 0.2,
            }}
            className="main_div"
         >
            <div className="closeBtn" onClick={close}>
               <VscClose />
            </div>
            <OtpVarificationComponent close={close} />
         </motion.div>
      </styled.div>
   );
}

export default OtpVarificationContainerComponent;

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as styled from './InboxPopUpComponent.style';
import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { motion, AnimatePresence } from 'framer-motion';
import PrivacyPopupComponent from '../PrivacyPopupComponent/PrivacyPopupComponent';
import './InboxPopUpComponent.css';
import { RiSettingsLine } from '@react-icons/all-files/ri/RiSettingsLine';
import InboxPrivateMessagesComponent from '../InboxPrivateMessagesComponent/InboxPrivateMessagesComponent';
import { useSharedState } from '../../Context/PopUpContext';

function InboxPopUpComponent({ close }) {
   const [ShowPrivacy, setShowPrivacy] = useState(false);
   const [_, setContextState] = useSharedState();

   const privacyHandler = function () {
      setShowPrivacy(!ShowPrivacy);
   };

   return ReactDOM.createPortal(
      <>
         <styled.overlayDiv onClick={close} />
         <motion.div
            initial={{ opacity: 0.4, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.4, scale: 0.5 }}
            transition={{
               duration: 0.3,
               type: 'keyframes',
            }}
            className="inbox-dg-i"
         >
            <div className={ShowPrivacy ? 'inBox_div sm_box_div' : 'inBox_div'}>
               <styled.mainDiv show={ShowPrivacy} className="shadow">
                  <div className="heading_div">
                     <ModelHeaderComponent
                        heading={'Private Messages'}
                        option={
                           <div className="flex items-center me-4">
                              <RiSettingsLine onClick={privacyHandler} />
                              <p className="ms-2 text-sm d-none d-md-block">
                                 Options
                              </p>
                           </div>
                        }
                        back={() => {
                           close();
                           setContextState({
                              showSmChats: false,
                           });
                        }}
                        backIcon={true}
                     />
                  </div>
                  <InboxPrivateMessagesComponent />
               </styled.mainDiv>
               <AnimatePresence>
                  <motion.div
                     initial={{ right: -500 }}
                     animate={{ right: 0 }}
                     exit={{ right: -500 }}
                     transition={{
                        duration: 0.3,
                     }}
                     className="privacy_inbox_div"
                  >
                     <PrivacyPopupComponent back={privacyHandler} />
                  </motion.div>
               </AnimatePresence>
            </div>
         </motion.div>
      </>,
      document.getElementById('inbox')
   );
}

export default InboxPopUpComponent;

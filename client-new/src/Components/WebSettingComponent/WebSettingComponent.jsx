import React, { useState } from 'react';
import * as styled from './WebSettingComponent.style';
import { GiWireframeGlobe } from '@react-icons/all-files/gi/GiWireframeGlobe';
import { Badge } from 'antd';
// import LaguageComponent from '../LaguageComponent/LaguageComponent';
// import ModelHeaderComponent from '../ModelHeaderComponent/ModelHeaderComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import ViewInFiatComponent from '../ViewInFiatComponent/ViewInFiatComponent';
import { useSelector } from 'react-redux';
import {
   userProfilePrivacyInfoSelector,
   userProfilePrivacyInfoLoadingSelector,
} from './Tab.Selector';
import SpennerComponent from '../SpennerComponent/SpennerComponent';

const TabComponent = function () {
   return (
      <div className="tb_div active_tab">
         <p className="text-gray-300 font-semibold">View in fiat</p>
      </div>
   );
};

function WebSettingComponent() {
   const [ShowSetting, setShowSetting] = useState(false);
   const userProfilePrivacyInfo = useSelector(userProfilePrivacyInfoSelector);
   const userProfilePrivacyInfoLoading = useSelector(
      userProfilePrivacyInfoLoadingSelector
   );

   const showHandler = function () {
      setShowSetting(!ShowSetting);
   };

   return (
      <styled.div>
         <div className="User_setting_icon_div flex items-center space-x-2">
            <div className="box_div" onClick={showHandler}>
               <GiWireframeGlobe className="text-gray-500 hover_icon" />
            </div>
            {!!userProfilePrivacyInfoLoading && <SpennerComponent />}
            {!!userProfilePrivacyInfo &&
               userProfilePrivacyInfo?.success &&
               userProfilePrivacyInfo?.response && (
                  <p className="text-gray-400">
                     {userProfilePrivacyInfo?.response?.conversionCurrency}
                  </p>
               )}
         </div>
         <AnimatePresence>
            {!!ShowSetting && (
               <>
                  <styled.popUp>
                     <div className="over_flow" onClick={showHandler} />
                     <motion.div
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="main_div"
                     >
                        {/* <ModelHeaderComponent
                           heading={'Web Setting'}
                           back={showHandler}
                        /> */}
                        <div className="cl_icon" onClick={showHandler}>
                           <VscClose className="text-gray-200 font-medium text-xl" />
                        </div>
                        <div className="flex items-center space-x-2 tab_border">
                           <TabComponent />
                        </div>
                        <div className="p-4">
                           {/* <LaguageComponent /> */}
                           <ViewInFiatComponent close={showHandler} />
                        </div>
                     </motion.div>
                  </styled.popUp>
               </>
            )}
         </AnimatePresence>
      </styled.div>
   );
}

export default WebSettingComponent;

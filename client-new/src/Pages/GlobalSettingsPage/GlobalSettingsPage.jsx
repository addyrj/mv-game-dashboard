import React, { useState } from 'react';
import * as styled from './GlobalSettingsPage.style';
import { AiFillSetting } from '@react-icons/all-files/ai/AiFillSetting';
import CustomButtonComponent from '../../Components/CustomButtonComponent/CustomButtonComponent';
import GlobalSettingPrivacyComponent from '../../Components/GlobalSettingPrivacyComponent/GlobalSettingPrivacyComponent';

const BtnGroup = [
   { name: 'Privacy' },
   { name: 'Mail/Phone Number' },
   { name: 'Security' },
   { name: 'Active Sessionsurity' },
   { name: 'Verify' },
];

function GlobalSettingsPage() {
   const [ActiveTab, setActiveTab] = useState('Privacy');

   return (
      <styled.div>
         <div className="flex items-center space-x-3">
            <AiFillSetting className="text-green-500" />
            <p className="text-gray-400 text-lg font-medium">Global settings</p>
         </div>
         <styled.tabsDiv className="space-x-3">
            {BtnGroup.map((el) => (
               <CustomButtonComponent
                  key={el?.name}
                  text={el?.name}
                  btnCl={
                     el?.name === ActiveTab
                        ? 'pagination_bt px-4 pagination_bt_active shadow'
                        : 'pagination_bt px-4'
                  }
                  onClick={() => setActiveTab(el?.name)}
               />
            ))}
         </styled.tabsDiv>
         <styled.renderDiv>
            {ActiveTab === 'Privacy' && <GlobalSettingPrivacyComponent />}
         </styled.renderDiv>
      </styled.div>
   );
}

export default GlobalSettingsPage;

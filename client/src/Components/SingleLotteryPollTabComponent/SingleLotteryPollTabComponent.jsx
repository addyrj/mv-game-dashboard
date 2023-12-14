import React, { useState } from 'react';
import * as styled from './SingleLotteryPollTabComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import LotteryPollUsersListComponent from '../LotteryPollUsersListComponent/LotteryPollUsersListComponent';

const tabsAr = [
   { name: 'Participate List', value: 'participate' },
   { name: 'Winners List', value: 'winners' },
];

function SingleLotteryPollTabComponent() {
   const [ActiveTab, setActiveTab] = useState('participate');

   const tabHandler = function (value) {
      if (ActiveTab === value) return;
      setActiveTab(value);
   };

   return (
      <styled.div>
         <div className="tab_div flex items-center space-x-3">
            {tabsAr.map((el) => (
               <CustomButtonComponent
                  key={el?.name}
                  text={el?.name}
                  btnCl={ActiveTab === el?.value ? 'tab_button_active tab_button' : 'tab_button'}
                  onClick={() => tabHandler(el?.value)}
               />
            ))}
         </div>
         <div className="result_div mt-4">
            {ActiveTab === 'participate' ? <LotteryPollUsersListComponent filter={ActiveTab} /> : null}
            {ActiveTab === 'winners' ? <LotteryPollUsersListComponent filter={ActiveTab} /> : null}
         </div>
      </styled.div>
   );
}

export default SingleLotteryPollTabComponent;

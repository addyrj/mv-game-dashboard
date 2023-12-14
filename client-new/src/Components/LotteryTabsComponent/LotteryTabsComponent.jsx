import React from 'react';
import * as styled from './LotteryTabsComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import LotteryTicketComponent from '../LotteryTicketComponent/LotteryTicketComponent';

function LotteryTabsComponent() {
   return (
      <styled.div>
         <div className="mt-4 mb-4">
            <div className="flex items-center space-x-2">
               <CustomButtonComponent
                  text={'My Ticket'}
                  btnCl={'lottery_tab_btn shadow active_lottery'}
               />
               <CustomButtonComponent
                  text={'Result'}
                  btnCl={'lottery_tab_btn'}
               />
            </div>
         </div>
         <LotteryTicketComponent />
      </styled.div>
   );
}

export default LotteryTabsComponent;

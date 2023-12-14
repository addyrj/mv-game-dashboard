import React from 'react';
import * as styled from './LotteryTicketComponent.style';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';

function LotteryTicketComponent() {
   return (
      <styled.div>
         <div className="flex items-center justify-between">
            <div>
               <p className="text-gray-300 font-medium">You have no ticket!</p>
            </div>
            <CustomButtonComponent
               text={'Buy Tickets Now!'}
               btnCl={'tit_btn'}
            />
         </div>
      </styled.div>
   );
}

export default LotteryTicketComponent;

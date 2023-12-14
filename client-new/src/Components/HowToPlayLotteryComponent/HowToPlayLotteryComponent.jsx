import React, { Fragment } from 'react';
import * as styled from './HowToPlayLotteryComponent.style';

const CardComponent = function ({ heading, subHeading, src }) {
   return (
      <div className="item_card">
         <div className="img_div flex justify-center">
            <img src={src} alt="" />
         </div>
         <div className="text-center mt-2">
            <h5 className="text-gray-100 text-xl font-bold">{heading}</h5>
            <p className="text-gray-500 text-sm mt-2">{subHeading}</p>
         </div>
      </div>
   );
};

function HowToPlayLotteryComponent() {
   return (
      <Fragment>
         <h5 className="text-gray-300 text-2xl font-bold mt-4">How To Play</h5>
         <styled.div className="flex items-center justify-center space-x-3">
            <CardComponent
               heading={'Buy Tickets'}
               subHeading={
                  'Buy a ticket for $0.1 and choose numbers for the ticket.'
               }
               src={'/images/ticket-discount.png'}
            />
            <CardComponent
               heading={'Wait For the Draw'}
               subHeading={'Wait for the draw at 15:00 UTC+0 every day.'}
               src={'/images/timer.png'}
            />
            <CardComponent
               heading={'Check the Price'}
               subHeading={`Once the draw is over, come back to this page
and check your prize.`}
               src={'/images/saint-patrick-gifts.png'}
            />
         </styled.div>
      </Fragment>
   );
}

export default HowToPlayLotteryComponent;

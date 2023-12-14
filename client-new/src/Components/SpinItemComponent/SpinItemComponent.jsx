import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SpinItemComponent({ data, index }) {
   return (
      <div
         className="spin-item"
         style={{
            height: '24px',
            opacity: 1,
            transform: `rotate(-${index * 22.5}deg)`,
         }}
         id={`${index * 22.5}`}
      >
         <span className="amount">{data.price}</span>
         {/* <span className="amount">{'index =>' + index}</span> */}
         <div>
            <div className="spin_item_div">
               <LazyLoadImage className="coin-icon" src={data.icon} />
            </div>
         </div>
      </div>
   );
}

export default SpinItemComponent;

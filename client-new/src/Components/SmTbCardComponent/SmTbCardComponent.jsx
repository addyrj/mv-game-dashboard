import React from 'react';
import * as style from './SmTbCardComponent.style';

function SmTbCardComponent({ data, active, action }) {
   return (
      <style.button
         className={`flex items-center space-x-3 mb-4 mx-2 ${
            active && 'active_cr'
         }`}
         onClick={action}
      >
         <div className="icon_div shadow">
            <img src={`/images/${data?.name}.webp`} alt="" />
         </div>
         <div className="flex items-center space-x-1">
            <p className="text-gray-100 font-semibold text-sm md:text-lg">
               {data?.name}
            </p>
            <span className="text-gray-300 text-sm">
               {data?.smText.length > 10
                  ? `${data?.smText.slice(0, 10)}...`
                  : data.smText}
            </span>
         </div>
      </style.button>
   );
}

export default SmTbCardComponent;

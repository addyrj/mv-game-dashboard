import React from 'react';
import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight';

function MadelHeadingComponent({ icon, text, onClick }) {
   return (
      <div className="flex items-center justify-between">
         <div className="flex items-center">
            {icon}
            <p className="text-gray-400 ms-2">{text}</p>
         </div>
         <div className="flex items-center cursor-pointer" onClick={onClick}>
            <p className="text-green-500 text-sm font-bold">Details</p>
            <MdKeyboardArrowRight className="text-gray-400" />
         </div>
      </div>
   );
}

export default MadelHeadingComponent;

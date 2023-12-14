import React from 'react';
import * as styled from './PrivacyListComponent.style';
import Switch from '@mui/material/Switch';

function PrivacyListComponent({ heading, subHeading, onClick, name, value }) {
   return (
      <styled.div className="pb-2 pt-2 flex items-center justify-between">
         <div className="content_div">
            <h5 className="text-sm text-gray-300 font-bold">{heading}</h5>
            {subHeading ? (
               <p className="text-sm mt-1 text-gray-500">{subHeading}</p>
            ) : null}
         </div>
         <div className="switch_div">
            <Switch onChange={onClick} name={name} defaultChecked={value} />
         </div>
      </styled.div>
   );
}

export default PrivacyListComponent;

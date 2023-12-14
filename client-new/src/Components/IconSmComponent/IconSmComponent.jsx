import React from 'react';
import * as styled from './IconSmComponent.style';

function IconSmComponent({ icons, text, onClick }) {
   return (
      <styled.div className="flex items-center" onClick={onClick}>
         <div className="ic_div">{icons}</div>
         <p className="text-gray-500 text-sm">{text}</p>
      </styled.div>
   );
}

export default IconSmComponent;

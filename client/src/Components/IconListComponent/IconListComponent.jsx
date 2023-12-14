import React from 'react';
import * as styled from './IconListComponent.style';
import { Link } from 'react-router-dom';

function IconListComponent({ heading, icon, link }) {
   return (
      <Link to={link}>
         <styled.div className="flex items-center ">
            <div className="icon_div flex items-center text-gray-400">
               {icon}
            </div>
            <p className="text-gray-400 text-sm font-medium">{heading}</p>
         </styled.div>
      </Link>
   );
}

export default IconListComponent;

import React from 'react';
import { Link } from 'react-router-dom';
import * as styled from './TabsLineComponent.style';

function TabsLineComponent({
   tabs,
   ActiveTab,
   eventHandler,
   showViewALl,
   link,
}) {
   return (
      <styled.div className="pb-1 pb-md-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 line_div">
               {tabs.map((el, index) => (
                  <div
                     onClick={() => eventHandler(el)}
                     key={index}
                     className={`box ${
                        el?.name === ActiveTab.name ? 'active' : null
                     }`}
                  >
                     <p>{el?.name}</p>
                  </div>
               ))}
            </div>
            {!!showViewALl ? (
               <Link to={link}>
                  <div>
                     <p className="text-red-400 text-sm cursor-pointer font-medium">
                        View All
                     </p>
                  </div>
               </Link>
            ) : null}
         </div>
         <styled.lineDiv />
      </styled.div>
   );
}

export default TabsLineComponent;

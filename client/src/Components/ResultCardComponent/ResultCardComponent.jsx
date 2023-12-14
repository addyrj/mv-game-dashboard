import React from 'react';
import * as styled from './ResultCardComponent.style';

function ResultCardComponent({ icon, heading, subHeading, bg, cl, live }) {
   return (
      <styled.div>
         {live && <styled.liveBox />}
         <div className={`shadow ${bg} card_div ${cl}`}>
            <div className="flex items-center justify-between">
               <div>
                  <h5 className="text-3xl font-bold">{heading}</h5>
                  <p className="mt-2 font-semibold">{subHeading}</p>
               </div>
               <div className="icon_menu">{icon}</div>
            </div>
         </div>
      </styled.div>
   );
}

export default ResultCardComponent;

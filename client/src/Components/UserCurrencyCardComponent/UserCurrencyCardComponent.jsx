import React from 'react';
import * as styeld from './UserCurrencyCardComponent.style';

function UserCurrencyCardComponent({ data }) {
   return (
      <styeld.div className="mx-2 mb-3">
         <div id="content">
            <div className="card--container">
               <div className="card--body">
                  <div className="card--content">
                     <div className="icon">
                        <img src={data?.icon} alt="" />
                     </div>
                     <span className="card--title">{data?.currencyType}</span>
                     <div>
                        <div className="flex items-center mb-3">
                           <div className="w-10/12 mx-2">
                              <p className="text-gray-300">Currency Name</p>
                           </div>
                           <span className="card--author"> {data?.currencyName || data?.symbol}</span>
                        </div>
                        <div className="flex items-center">
                           <div className="w-10/12 mx-2">
                              <p className="text-gray-300">Currency Locked</p>
                           </div>
                           <span className="card--author">{!!data?.currencyLocked ? 'Yes' : 'No'}</span>
                        </div>
                     </div>
                  </div>
                  <div className="card--meta">
                     <span className="card--tag">{data?.balance} balance</span>
                  </div>
               </div>
            </div>
         </div>
      </styeld.div>
   );
}

export default UserCurrencyCardComponent;

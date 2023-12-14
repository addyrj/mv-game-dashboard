import { Fragment } from 'react';
import NetworkCardComponent from '../NetworkCardComponent/NetworkCardComponent';

const WalletNetworkComponent = function ({ wallet, selectedNetwork, hander }) {
   return (
      <Fragment>
         <p className="text-gray-400 text-sm mb-3">Choose Network</p>
         <div className="flex items-center space-x-2">
            {wallet?.data.map((el, index) => (
               <NetworkCardComponent
                  key={index}
                  network={el?.network}
                  address={el?.address}
                  active={
                     el?.network === selectedNetwork?.network ? true : false
                  }
                  onClick={hander}
               />
            ))}
         </div>
      </Fragment>
   );
};

export default WalletNetworkComponent;

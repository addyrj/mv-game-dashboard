import React from 'react';
import * as styled from './SecondFooterComponent.style';

const iconsAr = new Array(18).fill(10);
const sponsorshipAr = new Array(4).fill(2);
const lastIndex = sponsorshipAr.length;

function SecondFooterComponent() {
   return (
      <styled.div>
         <p className="text-gray-300 text-xl">Accepted Networks</p>
         <div className="mt-4 gird_div border_div">
            {iconsAr.map((el, index) => (
               <div className="icon_box" key={el + index}>
                  <img src={`/images/coin_${index + 1}.png`} alt="" />
               </div>
            ))}
         </div>
         <p className="mt-4 text-gray-300 text-xl">
            Sponsorship and Gaming Responsibilities
         </p>
         <div className="mt-5 border_div pb-4">
            <div className="sponsorship_grid">
               {sponsorshipAr.map((el, index) => (
                  <div
                     key={el + index}
                     className={
                        lastIndex === index + 1
                           ? 'spon_div flex justify-end'
                           : !index
                           ? 'spon_div'
                           : 'flex justify-center spon_div'
                     }
                  >
                     <img src={`/images/res_${index + 1}.png`} alt="" />
                  </div>
               ))}
            </div>
         </div>
         <div className="cn_div">
            <div className="ft_div flex items-center space-x-3">
               <div className="w-100">
                  <img src="/images/logo-mv_game_1.png" alt="" />
                  <p className="text-gray-400">
                     Award winning casino with millions of users globally!
                     BC.GAME is a community-based crypto casino that offers
                     their players the best online casino experience possible!
                  </p>
               </div>
               <div className="w-100 py-4">
                  <img src="/images/licensed_1.png" alt="" />
                  <p className="text-gray-400 mt-4">
                     BC.GAME is operated by BlockDance B.V. (Commercial register
                     of Curaçao no.158182, Emancipatie Boulevard Dominico F.
                     "Don" Martina 31, Curaçao) under a sublicense CIL pursuant
                     to Master gaming License #5536/JAZ.
                  </p>
                  <p className="mt-4 text-gray-400">
                     ©2022 MV GAME ALL RIGHTS RESERVED 1BTC=$16,702.01
                  </p>
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default SecondFooterComponent;

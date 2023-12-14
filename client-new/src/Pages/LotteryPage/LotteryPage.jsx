import React from 'react';
import * as styled from './LotteryPage.style';
import LotteryTabsComponent from '../../Components/LotteryTabsComponent/LotteryTabsComponent';
import HowToPlayLotteryComponent from '../../Components/HowToPlayLotteryComponent/HowToPlayLotteryComponent';
import LotteryBannerComponent from '../../Components/LotteryBannerComponent/LotteryBannerComponent';
import LotteryRulesComponent from '../../Components/LotteryRulesComponent/LotteryRulesComponent';
import FooterLinksComponent from '../../Components/FooterLinksComponent/FooterLinksComponent';
import SecondFooterComponent from '../../Components/SecondFooterComponent/SecondFooterComponent';

function LotteryPage() {
   return (
      <styled.div>
         <LotteryBannerComponent />
         <LotteryTabsComponent />
         <HowToPlayLotteryComponent />
         <LotteryRulesComponent />
         <div className="mt-5">
            <FooterLinksComponent />
            <SecondFooterComponent />
         </div>
      </styled.div>
   );
}

export default LotteryPage;

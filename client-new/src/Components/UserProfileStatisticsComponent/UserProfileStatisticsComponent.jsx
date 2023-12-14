import React from 'react';
import MadelHeadingComponent from '../MadelHeadingComponent/MadelHeadingComponent';
import * as styled from './UserProfileStatisticsComponent.style';
import { FcStatistics } from '@react-icons/all-files/fc/FcStatistics';
import CountStatisComponent from '../CountStatisComponent/CountStatisComponent';
import { FcLineChart } from '@react-icons/all-files/fc/FcLineChart';
import { FcOk } from '@react-icons/all-files/fc/FcOk';
import { FcDebt } from '@react-icons/all-files/fc/FcDebt';

function UserProfileStatisticsComponent() {
   return (
      <styled.div>
         <MadelHeadingComponent
            icon={<FcStatistics className="text-gray-400" />}
            text={'Statistics'}
         />
         <div className="st_div block md:flex items-center space-x-0 md:space-x-2 mt-3">
            <CountStatisComponent
               icon={<FcLineChart />}
               heading={'Total Wins'}
               count={0}
            />
            <CountStatisComponent
               icon={<FcOk />}
               heading={'Total Bets'}
               count={0}
            />
            <CountStatisComponent
               icon={<FcDebt />}
               heading={'Total Wagered'}
               count={0}
            />
         </div>
      </styled.div>
   );
}

export default UserProfileStatisticsComponent;

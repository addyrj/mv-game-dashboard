import { IoLogoGameControllerB } from '@react-icons/all-files/io/IoLogoGameControllerB';
import React, { Fragment, useEffect, useContext, useState } from 'react';
import ResultCardComponent from '../ResultCardComponent/ResultCardComponent';
import { FiUsers } from '@react-icons/all-files/fi/FiUsers';
import { gameStatusSelector, gameStatusLoadingSelector, gameStatusErrorSelector } from './ResultCard.Selector';
import { useSelector } from 'react-redux';
import SpinnerComponent from '../SpinnerComponent/SpinnerComponent';
// import { MdTrendingUp } from '@react-icons/all-files/md/MdTrendingUp';
// import { SocketContext } from '../../Context/SocketContext';

function ResultCartsContainerComponent() {
   // const [SocketUsers, setSocketUsers] = useState(0);
   // const socket = useContext(SocketContext);

   const gameStatus = useSelector(gameStatusSelector);
   const gameStatusLoading = useSelector(gameStatusLoadingSelector);
   const gameStatusError = useSelector(gameStatusErrorSelector);

   // const onlineUsers = function (args) {
   //    setSocketUsers(args?.socketUsers);
   // };

   // useEffect(() => {
   //    socket.on('__live_users', onlineUsers);

   //    return () => {
   //       socket.off('__live_users', onlineUsers);
   //    };
   // }, []);

   return (
      <Fragment>
         <div>
            {!!gameStatusLoading ? <SpinnerComponent /> : null}
            {!!gameStatusError ? <p className="text-sm error_cl">{gameStatusError}</p> : null}
            {!!gameStatus && gameStatus?.success ? (
               <ResultCardComponent
                  heading={gameStatus?.totalsGames}
                  subHeading={'Total Games'}
                  icon={<IoLogoGameControllerB className="text-gray-300" />}
                  bg={'light'}
               />
            ) : null}
         </div>
         {/* <ResultCardComponent
            heading={SocketUsers}
            subHeading={'Online users'}
            icon={<FiUsers className="text-gray-300" />}
            bg={'dark'}
            cl={'glass'}
            live={true}
         /> */}
         {/* <ResultCardComponent
            heading={'$200100,00'}
            subHeading={'Total profit'}
            icon={<MdTrendingUp className="text-gray-300" />}
            bg={'dark'}
            cl={'glass'}
         /> */}
      </Fragment>
   );
}

export default ResultCartsContainerComponent;

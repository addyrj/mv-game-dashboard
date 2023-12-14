import React, { useEffect } from 'react';
import * as styled from './LotteryDrawPage.style';
import NavbarComponent from '../../Components/NavbarComponent/NavbarComponent';
import PageHeadingComponent from '../../Components/PageHeadingComponent/PageHeadingComponent';
import { useDispatch } from 'react-redux';
import { getAllLotteryPoll } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import LotteryPollCardsComponent from '../../Components/LotteryPollCardsComponent/LotteryPollCardsComponent';
import useRoles from '../../Hooks/useRoles';
import { removeLotteryPollInfo } from '../../App/Features/LuckyDraw/LuckyDrawSlice';

function LotteryDrawPage() {
   const dispatch = useDispatch();
   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();

   useEffect(() => {
      if (isAdmin) {
         dispatch(getAllLotteryPoll({ page: 0 }));
      }
   }, [isAdmin]);

   useEffect(() => {
      return () => {
         dispatch(removeLotteryPollInfo());
      };
   }, []);

   return (
      <styled.div>
         <NavbarComponent />
         <div className="container_div">
            <PageHeadingComponent
               pageName={'Lottery draw'}
               heading={`Lottery draw`}
               para={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Blanditiis, maiores perspiciatis. Est rerum, sit
               voluptas molestias officia modi, provident earum ad
               ipsam sed dolorem error odit quia, deserunt quasi!
               Doloribus!`}
            />
            <LotteryPollCardsComponent />
         </div>
      </styled.div>
   );
}

export default LotteryDrawPage;

import React from 'react';
import * as styled from './LotteryTicketBallsComponent.style';

const ballsAr = new Array(6).fill(1);

function LotteryTicketBallsComponent({ show, numbers, uniqueKey }) {
   return (
      <styled.div className="space-x-2 py-2 px-3">
         {ballsAr.map((el, index) => (
            <styled.ballsDiv
               key={uniqueKey + index || index}
               show={show.includes(numbers?.[index + 1])}
               className={index === 5 ? '_last_ball opacity-100' : null}
               jackpotBall={index === 5 ? true : false}
            >
               {numbers?.[index + 1]}
            </styled.ballsDiv>
         ))}
      </styled.div>
   );
}

export default LotteryTicketBallsComponent;

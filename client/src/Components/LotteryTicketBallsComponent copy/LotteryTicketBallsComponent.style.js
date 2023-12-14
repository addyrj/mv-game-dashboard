import styled from 'styled-components';

export const div = styled.div`
   display: flex;
   position: relative;
   background-position: center;
   background-repeat: no-repeat;
   background-image: url(/images/ball_bg.webp);
   background-size: 100% 100%;

   ._last_ball {
      margin-left: 1.5rem !important;
   }
`;

export const ballsDiv = styled.div`
   width: 32px;
   height: 32px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-image: ${(props) => (props.jackpotBall ? 'url("/images/jackpot_ball.webp")' : `url('/images/ball.webp')`)};
   background-position: center;
   background-size: contain;
   border-radius: 50%;
   opacity: ${(props) => (props?.show ? 1 : 0.2)};
   font-size: 12px;
   font-weight: 700;
`;

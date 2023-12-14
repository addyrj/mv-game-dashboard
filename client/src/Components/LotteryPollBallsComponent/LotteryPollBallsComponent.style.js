import styled from 'styled-components';

export const div = styled.div`
   .popDiv {
      width: 470px;
      position: relative;
   }
`;

export const contentDiv = styled.div`
   background-color: var(--smooth-gray-md-cl);
   overflow: scroll;
`;

export const ballsDiv = styled.div`
   border-radius: 5px;
   padding: 1rem;
   background-image: url('/images/select_a.png');
   background-position: center;
   background-size: cover;
   height: 370px;
   background-size: 100% auto;
   overflow: hidden;

   .grid_div,
   .jackpot_balls {
      display: grid;
      grid-template-columns: repeat(9, 1fr);

      .digital_ball_div {
         width: 100%;
         height: 36px;
         margin-bottom: 0.4rem;
         border-radius: 50%;

         .ball {
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: contain;
            border-radius: 50%;
            opacity: 1;
            font-size: 12px;
            font-weight: 700;
            background-color: var(--smooth-gray-sl-cl);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            p {
               color: var(--smooth-gray-cl);
            }
         }

         .active_ball {
            background-image: url(/images/ball.webp);

            p {
               color: var(--dark-home-cl) !important;
            }
         }

         &:hover {
            .ball {
               background-color: var(--smooth-gray-cl);
               p {
                  color: var(--dark-home-cl) !important;
               }
            }
         }

         &:hover {
            .jc {
               background-color: var(--smooth-gray-cl);
               p {
                  color: var(--dark-home-cl) !important;
               }
            }
         }
      }
   }

   .jackpot_balls {
      display: grid;
      grid-template-columns: repeat(10, 1fr);

      .digital_ball_div {
         height: 32px;
      }

      .jackpot_active_ball {
         background-image: url(/images/jackpot_ball.webp);
         background-color: transparent !important;

         p {
            color: var(--dark-home-cl) !important;
         }
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   padding: 2rem;

   .lottery-banner {
      position: relative;
      width: 100%;
      height: 350px;
      display: flex;
      align-items: center;
      justify-content: center;

      /* .over-lay {
         position: absolute;
         left: 0;
         top: 0;
         width: 100%;
         height: 100%;
         z-index: 100;
      } */

      img {
         width: 100%;
         height: 100%;
         border-radius: 15px;
         overflow: hidden;
         position: absolute;
         left: 0;
         top: 0;
         object-fit: contain;
      }

      .timer_div {
         border-radius: 5px;
         margin-top: 100px;
         z-index: 100;
         padding: 1rem 3rem;
         background-color: var(--over-lay-cl);
      }
   }
`;

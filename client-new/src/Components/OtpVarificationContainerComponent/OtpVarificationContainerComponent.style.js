import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--over-lay-cl);
   position: fixed;
   left: 0;
   top: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   z-index: 400;

   .overLay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
   }

   .main_div {
      width: 500px;
      height: 500px;
      background-color: var(--dark-bl-cl);
      border-radius: 10px;
      display: flex;
      overflow: hidden;
      position: relative;
      z-index: 500;

      .closeBtn {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;

         svg {
            color: var(--main-cl);
            font-size: 20px;
         }
      }
   }

   @media (max-width: 600px) {
      .main_div {
         width: 95%;
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: var(--over-lay-cl);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 500;

   .over_lay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
   }

   .popUp_div {
      width: auto;
      background-color: var(--light-gray-cl);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   @media (max-width: 550px) {
      .popUp_div {
         width: 95%;
      }
   }
`;

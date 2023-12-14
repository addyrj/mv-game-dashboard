import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   .tr_div {
      background: var(--light-gray-cl);
      position: relative;
      z-index: 100;
   }
`;

export const trDiv = styled.div`
   width: 100%;
`;

export const cnDiv = styled.div`
   position: relative;
   height: 650px;

   @media (max-height: 1000px) {
      height: 500px;
      p {
         font-size: 12px !important;
      }
   }
   @media (max-height: 900px) {
      height: 450px;
      p {
         font-size: 11px !important;
      }
   }
   @media (max-height: 800px) {
      height: 350px;
   }
   @media (max-height: 600px) {
      height: 300px;
      p {
         font-size: 9px !important;
      }
   }
   @media (max-height: 550px) {
      height: 280px;
   }
   @media (max-height: 500px) {
      height: 250px;
   }

   .tr_div {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
   }
`;

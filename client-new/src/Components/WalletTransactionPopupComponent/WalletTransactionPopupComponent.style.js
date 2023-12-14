import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   background-color: var(--over-lay-cl);
   z-index: 400;
   display: flex;
   align-items: center;
   justify-content: center;

   .over_lay_div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }

   .tr_div {
      background-color: var(--dark-home-body-cl);
      position: relative;
      z-index: 100;
   }
`;

export const trDiv = styled.div`
   width: 800px;

   @media (max-height: 1000px) {
      width: 700px;
   }
   @media (max-height: 900px) {
      width: 670px;
   }
   @media (max-height: 800px) {
      width: 600px;
   }
   @media (max-height: 600px) {
      width: 500px;
   }
   @media (max-height: 550px) {
      width: 520px;
   }
   @media (max-height: 500px) {
      width: 500px;
   }
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

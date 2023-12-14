import styled from 'styled-components';

export const div = styled.div`
   width: 500px;
   background-color: var(--sm-border-cl);
   position: relative;
   transition: all 0.3s ease;

   ._wd_left {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
   }

   ._wd_right {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0%;
   }

   @media (max-width: 550px) {
      width: 100%;
   }
`;

export const headingDiv = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 1rem;
   background-color: var(--dark-bl-cl);
`;

export const paymentContentDiv = styled.div`
   width: 100%;
   height: 92%;
   overflow-x: hidden;
   padding: 1rem;
   overflow: hidden;
`;

export const optionsDiv = styled.div`
   position: relative;
   width: 100%;
   height: 600px;
   overflow: scroll;
   overflow-x: hidden;

   @media (max-height: 1000px) {
      height: 500px;
   }
   @media (max-height: 900px) {
      height: 450px;
   }
   @media (max-height: 800px) {
      height: 350px;
   }
   @media (max-height: 600px) {
      height: 300px;
   }
   @media (max-height: 550px) {
      height: 280px;
   }
   @media (max-height: 500px) {
      height: 250px;
   }
`;

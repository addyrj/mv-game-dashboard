import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   animation: slowDown 0.5s ease;
   z-index: 200;

   @keyframes slowDown {
      0% {
         opacity: 0.2;
      }
      50% {
         opacity: 0.7;
      }
      100% {
         opacity: 1;
      }
   }

   .overLay_div {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--over-lay-cl);
   }
`;

export const mainDiv = styled.div`
   width: 35%;
   padding: 2rem;
   position: relative;
   animation: grow 0.2s ease;
   background-color: var(--model-bg-cl);
   transition: all 0.2s ease;

   @keyframes grow {
      0% {
         transform: scale(0.5);
      }
      50% {
         transform: scale(0.8);
      }
      100% {
         transform: scale(1);
      }
   }

   .close_button_div {
      svg {
         color: var(--smooth-gray-cl);
         cursor: pointer;
         font-size: 20px;
      }
   }

   .content {
      p {
         margin-bottom: 1rem;
      }
   }

   @media (max-width: 1200px) {
      width: 500px;
   }

   @media (max-width: 500px) {
      width: 90%;
   }
`;

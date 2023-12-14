import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 10;
   background-color: var(--over-lay-cl);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 500;

   .over_lay_div {
      width: 100%;
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 500;
   }

   .spin_div {
      background-color: var(--smooth-gray-sl-cl);
      border-radius: 5px;
      position: relative;
      z-index: 20;
      padding: 1.5rem;
      transition: all 0.3s ease;
      z-index: 500;

      .close_div {
         position: absolute;
         top: 10px;
         right: 10px;
         cursor: pointer;

         svg {
            font-size: 25px;
         }
      }
   }

   @media (max-width: 500px) {
      .spin_div {
         scale: 0.9;
      }
   }

   @media (max-width: 450px) {
      .spin_div {
         scale: 0.8;
      }
   }
`;

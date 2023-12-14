import styled from 'styled-components';

export const div = styled.div`
   .grid_Div {
      padding: 1rem 0;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
   }

   @media (max-width: 1400px) {
      .grid_Div {
         grid-template-columns: repeat(5, 1fr);
      }
   }

   @media (max-width: 1100px) {
      .grid_Div {
         grid-template-columns: repeat(4, 1fr);
      }
   }

   @media (max-width: 850px) {
      .grid_Div {
         grid-template-columns: repeat(3, 1fr);
      }
   }

   @media (max-width: 630px) {
      .grid_Div {
         grid-template-columns: repeat(2, 1fr);
      }
   }

   @media (max-width: 470px) {
      .grid_Div {
         grid-template-columns: repeat(1, 1fr);
      }
   }
`;

export const navDiv = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

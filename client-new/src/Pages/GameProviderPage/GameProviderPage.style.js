import styled from 'styled-components';

export const div = styled.div``;

export const resDiv = styled.div`
   display: grid;
   grid-template-columns: repeat(6, 1fr);

   @media (max-width: 1500px) {
      grid-template-columns: repeat(5, 1fr);
   }

   @media (max-width: 1300px) {
      grid-template-columns: repeat(4, 1fr);
   }

   @media (max-width: 1100px) {
      grid-template-columns: repeat(3, 1fr);
   }

   @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
   }

   @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
   }
`;

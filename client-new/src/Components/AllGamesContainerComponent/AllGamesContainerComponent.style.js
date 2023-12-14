import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem 0;
   display: grid;
   grid-template-columns: repeat(6, 1fr);

   @media (max-width: 1400px) {
      grid-template-columns: repeat(5, 1fr);
   }

   @media (max-width: 1100px) {
      grid-template-columns: repeat(4, 1fr);
   }

   @media (max-width: 850px) {
      grid-template-columns: repeat(3, 1fr);
   }

   @media (max-width: 630px) {
      grid-template-columns: repeat(2, 1fr);
   }

   @media (max-width: 470px) {
      grid-template-columns: repeat(1, 1fr);
   }
`;

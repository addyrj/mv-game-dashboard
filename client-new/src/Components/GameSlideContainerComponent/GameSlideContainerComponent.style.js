import styled from 'styled-components';

export const div = styled.div`
   padding: 2rem 0;
   padding-bottom: 1rem;
   display: grid;
   grid-template-columns: repeat(5, 1fr);

   @media (max-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
   }

   @media (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
   }

   @media (max-width: 500px) {
      grid-template-columns: repeat(1, 1fr);
   }
`;

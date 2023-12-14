import styled from 'styled-components';

export const div = styled.div``;

export const boxDiv = styled.div`
   display: grid;
   grid-template-columns: repeat(3, 1fr);

   @media (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
   }

   @media (max-width: 700px) {
      grid-template-columns: repeat(1, 1fr);
   }
`;

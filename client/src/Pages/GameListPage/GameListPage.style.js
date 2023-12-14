import styled from 'styled-components';

export const div = styled.div`
   .game_cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      @media (max-width: 1200px) {
         grid-template-columns: repeat(5, 1fr);
      }

      @media (max-width: 900px) {
         grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 700px) {
         grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 500px) {
         grid-template-columns: repeat(1, 1fr);
      }
   }
`;

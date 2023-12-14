import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   border-bottom: 1px solid var(--smooth-gray-sl-cl);
`;

export const gameCardDiv = styled.div`
   .gameDiv {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 8px;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;

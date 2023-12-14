import styled from 'styled-components';

export const div = styled.div``;

export const mainDiv = styled.div`
   display: flex;

   .media_images {
      border-radius: 5px;
      border: 1px solid var(--light-gray-cl);
      overflow-x: hidden;
   }

   @media (max-width: 1000px) {
      display: block;
   }
`;

import styled from 'styled-components';

export const div = styled.div``;

export const listDiv = styled.div`
   padding: 0.5rem;

   .gameImage_div {
      width: 80px;
      height: 100px;
      overflow: hidden;
      border-radius: 5px;
      cursor: pointer;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }
`;

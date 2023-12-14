import styled from 'styled-components';

export const tr = styled.tr`
   .ic {
      width: 30px;
      height: 30px;

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }

   .user_div {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;

      img {
         transform: scale(1.3);
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
`;

export const noMessagesDiv = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: center;

   .mg_div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
         width: 50%;
         height: auto;
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;

   .content_div {
      width: 100%;
      display: flex;
      height: 100%;

      .list_div {
         width: 30%;
         height: 100%;
         border-right: 1px solid var(--light-gray-cl);
      }
   }
`;

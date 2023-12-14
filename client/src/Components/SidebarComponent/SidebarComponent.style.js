import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;

   .nav_logo_div {
      border-bottom: 1px solid var(--smooth-gray-sl-cl);
   }

   .nav_logo_div {
      width: 100%;
      height: 8%;
      padding: 1rem;

      img {
         width: 40px;
         height: auto;
      }
   }
`;

export const sclDiv = styled.div`
   width: 100%;
   height: 100%;
   overflow-x: hidden;
`;

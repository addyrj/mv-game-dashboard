import styled from 'styled-components';

export const div = styled.div`
   .box {
      padding: 1rem;
      color: var(--main-cl);
      cursor: pointer;
   }

   .active_el {
      color: var(--dark-red-cl);
   }

   .active {
      border-bottom: 3px solid var(--dark-red-cl);
      /* border-bottom: 3px solid var(--primary-color); */
   }

   @media (max-width: 560px) {
      .line_div {
         justify-content: center;
      }
   }
`;

export const lineDiv = styled.div`
   width: 100%;
   height: 1px;
   background-color: var(--dark-red-cl);
   /* background-color: var(--primary-color); */
   border-radius: 5px;
`;

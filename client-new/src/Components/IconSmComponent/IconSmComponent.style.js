import styled from 'styled-components';

export const div = styled.div`
   width: max-content;
   cursor: pointer;
   padding: 0.2rem 0.3rem;

   .ic_div {
      width: 30px;
   }

   &:hover {
      svg {
         color: var(--main-cl);
      }

      p {
         color: var(--main-cl);
      }
   }
`;

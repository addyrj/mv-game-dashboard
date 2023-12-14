import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   overflow-x: hidden;
   padding: 1rem;
   overflow-x: scroll;

   .load_more_div {
      .load {
         background-color: var(--smooth-gray-sl-cl);
         padding: 0.3rem 0.8rem;
         border-radius: 6px;
         cursor: pointer;

         p {
            color: var(--main-cl);
            font-size: 12px;
         }
      }
   }
`;

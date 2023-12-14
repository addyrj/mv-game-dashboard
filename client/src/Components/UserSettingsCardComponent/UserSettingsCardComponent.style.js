import styled from 'styled-components';

export const div = styled.div`
   background: #45d045;
   background: var(--light-gray-cl);
   /* width: 400px; */
   box-sizing: content-box;
   display: flex;
   border-radius: 1em;
   padding: 1rem;

   .content {
      h1 {
         font-size: 30px;
         font-weight: 600;
      }

      .box_div {
         width: 250px;

         p {
            font-size: 18px;
            font-weight: 500;
         }
      }
   }
`;

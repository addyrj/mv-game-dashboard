import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   /* overflow: scroll; */

   table {
      width: 100%;
      .info {
         color: var(--primary-color);
         cursor: pointer;
      }

      tr {
         text-align: center;

         th {
            padding: 1rem;
            background-color: var(--smooth-gray-sl-cl);
            p {
               font-size: 14px;
               font-weight: 400;
            }
         }

         td {
            padding: 1rem;

            p {
               font-size: 14px;
               font-weight: 400;
               color: var(--gray);
            }
         }
      }
   }
`;

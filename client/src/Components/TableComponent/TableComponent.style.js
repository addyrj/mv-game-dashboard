import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   padding: 1rem;

   .table_cm {
      width: 100%;
      overflow: hidden;
      border-radius: 10px;
      border: 1px solid var(--smooth-gray-cl);
      overflow: scroll;

      table {
         p {
            cursor: pointer;
         }

         thead {
            border-bottom: 1px solid var(--smooth-gray-cl);
         }

         tr {
            th {
               font-size: 14px;
               text-align: start;
               font-weight: 500;
               color: var(--smooth-gray-lg-cl);
               padding: 1rem;
            }

            td {
               padding: 1rem;
               font-size: 14px;
               font-weight: 400;
               color: var(--smooth-gray-lg-cl);

               svg {
                  font-size: 18px;
               }
            }
         }
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   .rules_div {
      width: 100%;
      background-color: var(--smooth-gray-md-cl);
      padding: 1rem;
      border-radius: 2px;

      .table_div {
         background-color: var(--dark-table-cl);

         table {
            width: 100%;

            tr {
               background-color: var(--dark-table-cl);
               border: 1px solid var(--smooth-gray-sl-cl);
               border-right: transparent;
               border-left: transparent;

               th {
                  padding: 1rem;
                  color: var(--light-gray-d_cl);
                  font-weight: 500;
               }

               td {
                  padding: 1rem;
                  font-weight: 500;

                  p {
                     font-size: 14px;
                  }
               }
            }
         }
      }
   }
`;

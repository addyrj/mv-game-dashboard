import styled from 'styled-components';

export const chatDiv = styled.div`
   padding: 1rem;
   width: 100%;
   display: flex;
   justify-content: ${(props) => (props?.sender ? 'end' : 'start')};

   .mg_div {
      max-width: 300px;

      .date_time {
         font-size: 12px;
         display: flex;
         justify-content: start;
         margin: 0.2rem 0;
      }

      .message_div {
         padding: 1rem;
         border-radius: 0 20px 20px 20px;
         background-color: var(--light-green-cl);
      }
   }
`;

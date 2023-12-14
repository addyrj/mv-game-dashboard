import styled from 'styled-components';

export const div = styled.div`
   .left {
      justify-content: start;
   }

   .right {
      justify-content: end;

      .msg_div {
         background-color: var(--gray) !important;

         p {
            color: var(--dark-cl) !important;
         }
      }
   }

   .chat_message_div {
      margin-bottom: 0.9rem;
      display: flex;

      .msg_div {
         padding: 0.5rem;
         background-color: var(--smooth-gray-sl-cl);
         border-radius: 8px;
         max-width: fit-content;

         p {
            font-size: 15px;
            color: var(--main-cl);
         }
      }
   }
`;

export const msgGifDiv = styled.div`
   width: 120px;
   height: 120px;
   margin-bottom: 0.5rem;

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }
`;

import styled from 'styled-components';

export const div = styled.div``;

export const userMessageDiv = styled.div`
   .messageTime {
      font-size: 12px;
   }

   .profile_info {
      .profile {
         width: 45px;
         height: 45px;
         border-radius: 50%;
         overflow: hidden;
         transition: all 0.2s ease;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: relative;
         }
      }

      .version {
         width: 50px;
         padding: 0.1rem;
         text-align: center;
         z-index: 100;

         p {
            font-size: 13px;
         }
      }
   }

   .message_div {
      background-color: var(--smooth-gray-sl-cl);
      padding: 1rem;
      border-radius: 0 20px 20px 20px;
   }

   .msg_div {
      background-color: transparent;

      p {
         font-size: 33px;
      }
   }
`;

export const gifMessageDiv = styled.div`
   width: 150px;
   height: 150px;
   /* padding: 1rem; */

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }
`;

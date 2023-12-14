import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
`;

export const contentDiv = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;

   .screen_div {
      width: 100%;
      height: 100%;
      overflow: scroll;
      background: url(https://e1.pxfuel.com/desktop-wallpaper/461/478/desktop-wallpaper-whatsapp-dark-whatsapp-chat.jpg);
   }

   .my_message {
      .date_time {
         justify-content: end !important;
      }

      .mg_div {
         .message_div {
            background-color: var(--smooth-gray-sl-cl);
            border-radius: 20px 0 20px 20px !important;
         }
      }
   }
`;

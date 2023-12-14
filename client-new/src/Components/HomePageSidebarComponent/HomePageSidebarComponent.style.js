import styled from 'styled-components';

export const div = styled.div`
   width: ${(props) => (props?.show ? '40%' : '0%')};
   height: 100%;
   transition: all 0.3s ease;
   background-color: var(--smooth-lg-sl-cl);
   position: relative;
   overflow: hidden;
   -webkit-box-shadow: 25px 15px 99px -11px rgba(0, 0, 0, 0.75);
   -moz-box-shadow: 25px 15px 99px -11px rgba(0, 0, 0, 0.75);
   box-shadow: 25px 15px 99px -11px rgba(0, 0, 0, 0.75);

   #chat_sidebar_div {
      background-color: var(--smooth-gray-md-cl);
      width: 100%;
      padding: 0;
      height: 100%;
      position: absolute;
      overflow: visible;
      height: 100%;
      top: 0;
      /* top: 0; */
      /* left: 500px; */
      /* transform: translateX(500px); */
      z-index: 200;
      /* left: 500px; */
      transition: all 0.5s ease;
      opacity: 0;
      visibility: hidden;

      .chat_portal {
         visibility: hidden;
         opacity: 0;
      }
   }

   .showChatBar {
      left: 0px !important;
      opacity: 1 !important;
      visibility: visible !important;
   }

   #notification_div {
      width: 100%;
      padding: 0;
      position: absolute;
      overflow: ${(props) => (props?.show ? 'visible' : 'hidden')};
      height: 100%;
      top: 0;
      z-index: 100;
   }

   @media (max-width: 1560px) {
      position: absolute;
      right: 0;
      top: 0;
      width: ${(props) => (props?.show ? '480px' : '0%')};
      z-index: 400;
   }

   @media (max-width: 600px) {
      width: ${(props) => (props?.show ? '100%' : '0%')};
   }
`;

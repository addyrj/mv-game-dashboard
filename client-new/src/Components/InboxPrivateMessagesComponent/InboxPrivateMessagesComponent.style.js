import styled from 'styled-components';

export const div = styled.div`
   padding-top: 3.5rem;
   height: 100%;

   .flexDiv {
      display: flex;
      height: 90%;
      position: relative;
   }

   .normal_heading_div {
      height: 60px;
      box-shadow: none !important;
      background-color: var(--smooth-lg-sl-cl) !important;
   }

   .inital_state_div {
      height: 100%;

      .center_content {
         display: flex;
         align-items: center;
         justify-content: center;
         height: 100%;
      }
   }

   .Slide_div {
      position: relative;
      width: 100%;
      height: 90%;
      overflow: hidden;

      .hide_friends_bar {
         left: -100%;
      }
      .show_allMessage_bar {
         left: 0%;
      }
   }

   .firend_request_div {
      height: 90%;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      transition: all 0.5s ease;
   }

   .allMessage_div {
      height: 90%;
      position: absolute;
      width: 100%;
      left: 100%;
      top: 0;
      transition: all 0.5s ease;
   }

   .show_screen {
      right: 0;
      z-index: 300;
   }
`;

export const sidebarDiv = styled.div`
   width: 40%;

   @media (max-width: 800px) {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      z-index: 100;
      background-color: var(--dark-home-cl);
   }
`;

export const renderDiv = styled.div`
   width: 60%;
   border-left: 1px solid var(--light-gray-cl);
   background-color: var(--model-bg-cl);

   @media (max-width: 800px) {
      width: 100%;
      position: absolute;
      right: -100%;
      top: 0;
      height: 100%;
      z-index: 20;
      transition: all 0.3s ease;
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   height: 100%;

   .tab_div {
      width: 100%;
      display: flex;
      align-items: center;
   }

   .scroll_div {
      position: relative;
      height: 100%;

      .friends_chat_div {
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 0;
         transition: all 0.4s ease;
      }

      .friends_chat_div_hide {
         left: -100%;
      }

      .stranger_chat_div {
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 100%;
         transition: all 0.4s ease;
      }

      .stranger_chat_div_active {
         left: 0%;
      }
   }
`;

export const scrollDiv = styled.div`
   height: 100%;
   overflow-x: scroll;
`;

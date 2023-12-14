import styled from 'styled-components';

export const div = styled.div`
   .pay_options_card_div {
      padding: 0.4rem 1rem;
      background-color: var(--dark-home-body-cl);
      position: relative;

      .pay_icon_div {
         width: 30px;
         height: 30px;
         border-radius: 50%;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }

      .rupe_icon {
         color: var(--light-yellow-cl);
      }

      p {
         font-size: 13px;
         margin-bottom: 0;
      }

      .sub_text {
         p {
            margin-top: -2px;
         }
      }
   }
`;

export const addMoneyDiv = styled.div`
   overflow: hidden;
   position: absolute;
   width: 100%;
   height: 100%;
   border-radius: 5px;
   left: 0;
   top: 0;
   background-image: url(/images/win.gif);
   background-position: center;
   background-size: cover;
`;

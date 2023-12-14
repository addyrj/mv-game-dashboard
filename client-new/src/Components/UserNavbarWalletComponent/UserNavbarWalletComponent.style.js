import styled from 'styled-components';

export const div = styled.div`
   .over_lay_div {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
   }

   .slider_upper_div {
      position: absolute;
      top: 0;
      z-index: 200;
   }

   .User_setting_icon_div {
      .box_div {
         width: 40px;
         height: 40px;
         margin-left: 1rem;
         display: flex;
         justify-content: center;
         align-items: center;
         cursor: pointer;

         svg {
            font-size: 19px;
         }

         &:hover {
            background-color: var(--dark-home-body-cl);

            svg {
               color: var(--main-cl);
            }
         }
      }

      .css-fvc8ir-MuiBadge-badge {
         right: 12px;
         top: 11px;
         background-color: var(--dark-red-cl);
         color: var(--main-cl);
         font-weight: 600;
      }

      .userNotification {
         /* filter: drop-shadow(0px 4px 24px #ffc400); */
      }
   }

   .user_setting_prent {
      position: relative;

      .popUp_inner_div {
         visibility: hidden;
         opacity: 0;
         transition: all 0.3s ease;
         transform: translateY(50px);
         position: relative;
         z-index: 100;
      }

      .popUp_inner_div_active {
         visibility: visible;
         opacity: 1;
         transform: translateY(1px);
      }
   }

   .coin_div {
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;

      &:hover {
         background-color: var(--smooth-gray-sl-cl);
      }

      img {
         width: 28px;
         height: auto;
      }
   }

   @media (max-width: 1300px) {
      .mobile_sm_options_hide {
         display: none;
      }
      .coin_div {
         display: none;
      }
   }

   @media (max-width: 520px) {
      .slider_upper_div {
         position: fixed;
         top: 0%;
         left: 10px;
         width: 95%;
      }

      .User_setting_icon_div {
         .box_div {
            margin-left: auto;
         }
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--dark-bg-slate-cl);
   position: relative;

   .react-emoji-picker--container {
      left: 130px;
   }

   .emoji-mart {
      width: 270px !important;
   }

   .gif_div {
      position: relative;

      .over_lay_div {
         width: 100%;
         height: 100%;
         position: fixed;
         top: 0;
         left: 0;
         z-index: 100;
      }

      .gif_component {
         position: absolute;
         right: -10px;
         bottom: 0;
         padding: 1rem;
         z-index: 100;
         visibility: hidden;
         opacity: 0;
         transition: all 0.2s ease;
         background-color: var(--main-cl);
         z-index: 100;
         transform: scale(0.8);

         .reactGiphySearchbox-message {
            font-size: 12px;
         }
      }

      .reactGiphySearchbox-listWrapper {
         height: 450px !important;
         overflow-x: hidden;
      }

      .reactGiphySearchbox-searchForm-input {
         padding: 4px 7px;
         font-size: 13px;
         background-color: transparent;
         border: none;
         border: 1px solid var(--gray);
         border-radius: 5px;
      }

      .show_gif {
         visibility: visible;
         opacity: 1;
      }

      svg {
         font-size: 23px;
         cursor: pointer;
      }
   }

   .show_prev_selected_gif_div {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
   }

   @media (max-width: 500px) {
      .react-emoji-picker--wrapper {
         width: 100%;
         left: 58px;
         bottom: 17px;
      }
      .react-emoji-picker {
         position: relative;
      }
      .emoji-mart {
         width: 100% !important;
      }
      .reactGiphySearchbox-componentWrapper {
         width: 100% !important;
      }
      .gif_div .gif_component {
         bottom: 50px;
         right: -38px;
      }
   }
`;

export const messageDiv = styled.div`
   width: 100%;
   height: 40px;

   .react-emoji {
      background-color: var(--dark-home-body-cl);

      .react-input-emoji--wrapper {
         background-color: var(--dark-home-body-cl);
      }

      .react-input-emoji--input {
         color: var(--main-cl);
      }

      .react-input-emoji--button svg {
         transform: scale(0.8);
      }
   }

   .react-input-emoji--container {
      border-radius: 0 !important;
      border: none;
   }
`;

export const gifSelectDiv = styled.div`
   position: absolute;
   width: 200px;
   height: 200px;
   bottom: 120%;
   background-color: var(--light-sl-cl);
   left: 10px;
   transition: all 0.3s ease;
   visibility: hidden;
   opacity: 0;
   transform: scale(0.5);

   .close_div {
      position: absolute;
      right: -10px;
      top: -10px;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;

      svg {
         color: var(--main-cl);
      }
   }

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }

   .arrow_down_icon {
      position: absolute;
      color: var(--light-sl-cl);
      bottom: -28px;
      font-size: 50px;
   }
`;

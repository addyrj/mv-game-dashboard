import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   left: 0;
   top: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--over-lay-cl);
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props?.show ? 1 : 0)};
   transition: all 0.3s ease;
   z-index: 400;
`;

export const mainDiv = styled.div`
   background-color: #1b1d29;
   width: 860px;
   border-radius: 5px;
   display: flex;
   justify-content: center;
   visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props?.show ? 1 : 0)};
   transform: ${(props) => (props?.show ? 'scale(1)' : 'scale(.8)')};
   transition: all 0.3s ease;
   position: relative;

   .close_button {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 400;
      cursor: pointer;

      svg {
         font-size: 25px;
      }
   }

   .img_prv_div {
      width: 50%;
      overflow: hidden;
      background-image: url('../images/Abstract_background.png');
      background-position: top;
      background-size: cover;

      .welcome_bg_img {
         margin-top: 100px;
         height: 100%;
      }

      img {
         width: 100%;
         transform: scale(1.3);
      }
   }

   .forget_password {
      p {
         cursor: pointer;
         width: max-content;
         transition: all 0.2s ease;
      }
   }

   @media (max-width: 1000px) {
      /* width: 700px; */
      width: 95%;

      p {
         font-size: 13px;
      }

      button {
         font-size: 13px;
      }
   }

   @media (max-width: 690px) {
      .button_group {
         display: block;

         button {
            width: 100%;
            margin-bottom: 0.5rem;
         }
      }
   }

   @media (max-width: 530px) {
      display: block;

      .img_prv_div {
         display: none;

         .welcome_bg_img {
            margin: auto;
         }

         img {
            transform: scale(1);
         }
      }

      .mg {
         margin-top: 30px;
      }

      .form_input_div {
         width: 100%;
      }
   }
`;

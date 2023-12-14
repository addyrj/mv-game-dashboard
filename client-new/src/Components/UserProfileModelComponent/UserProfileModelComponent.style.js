import styled from 'styled-components';

export const div = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   animation: show 0.2s ease;

   .ove_hi {
      overflow: hidden;
   }

   #overLay_div {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: var(--over-lay-cl);
      z-index: 400;
   }

   .model_card_div {
      width: 30%;
      background-color: var(--model-bg-cl);
      height: 700px;
      position: relative;
      overflow-x: hidden;
      z-index: 500;
      transition: all 0.3s ease;

      .loading_spenner_div {
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translate(-50%, -50%);
      }

      @media (max-height: 900px) {
         height: 600px;
      }

      @media (max-width: 1300px) {
         width: 50%;
         height: 500px;
      }

      @media (max-width: 900px) {
         width: 80%;
      }

      @media (max-width: 600px) {
         width: 90%;
      }

      @media (max-width: 500px) {
         height: 600px;
      }
   }
`;

export const ProfilePosDiv = styled.div`
   position: absolute;
   left: ${(props) => (props?.slide ? '-30px' : '0px')};
   top: 0;
   width: 100%;
   height: 100%;
   padding: 1rem;
   transition: all 0.3s ease;

   .vip_logo_div {
      width: 80px;
      height: 80px;

      img {
         width: 100%;
         height: 100%;
      }
   }

   .close_button_div {
      width: 60px;
      display: flex;
      justify-content: end;

      svg {
         color: var(--main-cl);
         font-size: 20px;
         cursor: pointer;
         transition: all 0.3s ease;

         &:hover {
            rotate: 60deg;
         }
      }
   }

   .icon_box_div {
      padding: 0.4rem 0.6rem;
      background-color: var(--smooth-gray-md-cl);
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;

      svg {
         font-size: 14px;
      }
   }

   .user_profile_card_div {
      .profile_div {
         width: 70px;
         height: 70px;
         border-radius: 50%;
         overflow: hidden;
         margin: auto;
         cursor: pointer;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
      }

      .tags {
         img {
            width: auto;
            height: 20px;
         }
      }
   }

   .edit_icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background-color: var(--smooth-gray-md-cl);
      cursor: pointer;
   }

   .pending {
      background-color: var(--light-green-cl);

      p {
         color: var(--main-cl);
      }
   }

   .accepted {
      p {
         color: var(--main-cl);
      }
   }
`;

export const imagePrevDivOverLay = styled.div`
   width: 100%;
   height: 100%;
   position: fixed;
   left: 0;
   top: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: var(--over-lay-cl);
   z-index: 200;
   visibility: ${(props) => (props?.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props?.show ? 1 : 0)};
   transition: all 0.2s ease;
`;

export const imagePrevDiv = styled.div`
   width: 400px;
   height: 400px;
   border-radius: 5px;
   padding: 0.2rem;
   background-color: var(--main-cl);
   position: relative;
   visibility: ${(props) => (props?.show ? 'visible' : 'hidden')};
   opacity: ${(props) => (props?.show ? 1 : 0)};
   transform: ${(props) => (props?.show ? 'scale(1)' : 'scale(0.5)')};
   transition: all 0.2s ease;

   .close_button_div_ic {
      position: absolute;
      right: -15px;
      top: -15px;
      width: 25px;
      height: 25px;
      background-color: var(--main-cl);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
   }

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 5px;
   }

   .footer_icons_box {
      position: absolute;
      bottom: -50px;
   }
`;

export const otherOptionsDiv = styled.div`
   padding: 0.5rem 1.8rem;
   border-radius: 5px;
   background-color: var(--smooth-lg-sl-cl);
   display: flex;
   align-items: center;
   cursor: pointer;
   margin-left: 0.5rem;

   p {
      font-size: 13px;
      color: var(--smooth-gray-cl);
      margin-left: 0.5rem;
   }

   svg {
      color: var(--smooth-gray-cl);
   }
`;

export const requestOverLay = styled.div``;

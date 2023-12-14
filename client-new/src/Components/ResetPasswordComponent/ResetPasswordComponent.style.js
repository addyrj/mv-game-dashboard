import styled from 'styled-components';

export const div = styled.div`
   background-color: var(--over-lay-cl);
   position: fixed;
   left: 0;
   top: 0;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
   z-index: 100;

   .overLay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      background-color: var(--over-lay-cl);
   }

   .mainDiv {
      width: 750px;
      height: 500px;
      background-color: var(--dark-bl-cl);
      border-radius: 5px;
      display: flex;
      overflow: hidden;
      position: relative;
      z-index: 100;

      .closeBtn {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;

         svg {
            color: var(--main-cl);
            font-size: 20px;
         }
      }

      .content_div_parent {
         display: flex;
         align-items: center;
         /* justify-content: center; */
         padding: 2rem;

         .content_div {
            width: 100%;
         }
      }

      .img_div {
         height: 100%;
         background-image: url(images/Abstract_background.png);
         background-position: center;
         background-size: cover;

         .img_pc {
            position: absolute;
            left: -40px;
            width: 63%;
            bottom: -54px;
         }
      }
   }

   @media (max-width: 700px) {
      .mainDiv {
         width: 95%;

         h5 {
            font-size: 25px;
         }

         span {
            font-size: 15px;
         }
      }
   }

   @media (max-width: 560px) {
      .mainDiv {
         display: block;
         height: auto;

         .img_div {
            width: 100% !important;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 250px;
            overflow: hidden;

            .img_pc {
               position: relative;
               left: auto;
               right: auto;
               margin-top: 100px;
               transform: scale(1.6);
            }
         }

         .content_div_parent {
            width: 100% !important;
         }
      }
   }
`;

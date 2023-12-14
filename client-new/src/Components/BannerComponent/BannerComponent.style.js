import styled from 'styled-components';

export const mainDiv = styled.div`
   padding-top: 1rem;
`;

export const div = styled.div`
   width: 100%;
   overflow: hidden;

   .sm_bn {
      h1 {
         font-size: 30px;
      }

      .image_div {
         width: 100%;
      }

      h5 {
         font-size: 25px;
      }
   }

   .slick-initialized .slick-slide {
      transition: all 0.3s ease;
   }

   .banner_slider_div {
      width: 100%;

      .bg_slide {
         width: 100%;
         height: 460px;
         background-size: cover;
         border-radius: 16px;
         overflow: hidden;
         background-size: cover;
         background-position: center;

         .sm_heading {
            color: var(--syn-cl);
            font-size: 45px;
            font-weight: bold;
            margin: 0.5rem 0;
         }
      }

      .banner_image_div {
         border-radius: 15px;
         overflow: hidden;
      }

      .mobile_banner {
         display: none;
      }

      @media (max-width: 500px) {
         .banner_image_div {
            background-image: url('/images/banner-mobile.png') !important;
         }
         .pc_banner {
            display: none;
         }
         .mobile_banner {
            display: block;
         }
      }
   }

   h1 {
      font-size: 50px;
      font-weight: bold;
   }

   .image_div {
      overflow: hidden;
      width: 60%;
      position: relative;
      height: 400px;
      transition: all 0.2s ease;

      img {
         position: absolute;
         top: 0;
         left: 0;
      }
   }

   @media (max-width: 800px) {
      h1 {
         font-size: 40px;
      }
   }

   @media (max-width: 600px) {
      .banner_slider_div .bg_slide {
         height: 340px;
      }
   }

   @media (max-width: 560px) {
      .banner_content_div {
         text-align: center;

         .btn_div {
            display: flex;
            justify-content: center;
         }
      }
   }

   @media (max-width: 400px) {
      h1 {
         font-size: 24px;
      }

      p {
         font-size: 13px;
      }
   }
`;

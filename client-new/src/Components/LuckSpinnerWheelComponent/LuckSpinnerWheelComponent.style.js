import styled from 'styled-components';

export const div = styled.div`
   .spinning {
      animation: spin 5s linear;
   }

   @keyframes spin {
      0% {
         transform: rotate(var(--my-start-spin));
      }
      100% {
         transform: rotate(var(--my-end-spin));
      }
   }
`;

export const spinnerModeldiv = styled.div`
   width: 100%;
   padding: 1rem;
`;

export const spinerMainDiv = styled.div`
   width: 21.75rem;
   height: 28.4375rem;
   position: relative;
   margin: 1.875rem auto 1.25rem;
   user-select: none;
   transform: scale(1.1);
   transition: all 0.2s ease;

   .btn-img {
      position: absolute;
      width: 6.5rem;
      height: 6.5rem;
      top: 7.625rem;
      left: 7.625rem;
      cursor: pointer;
      z-index: 100;

      img {
         width: 100%;
         height: 100%;
      }

      .btn-txt {
         position: absolute;
         width: 5.5rem;
         height: 3.5rem;
         top: 1.5625rem;
         left: 0.5rem;
      }
   }

   .no_allow {
      cursor: not-allowed;
   }

   .btn-img:not(.loading) .btn-txt {
      -webkit-animation: pulse-s196nhep 2s infinite linear;
      animation: pulse-s196nhep 2s infinite linear;
   }

   @keyframes pulse-s196nhep {
      0% {
         transform: rotate(-5deg) scaleZ(1);
      }
      50% {
         transform: rotate(0) scale3d(1.1, 1.1, 1.1);
      }
      100% {
         transform: rotate(-5deg) scaleZ(1);
      }
   }

   .banner-img {
      position: absolute;
      height: 5.3125rem;
      width: 21.25rem;
      left: 0.25rem;
      top: 19.625rem;

      img {
         width: 100%;
         height: 100%;
         display: inline-block;
         vertical-align: top;
      }
   }

   @media (max-width: 500px) {
      transform: scale(1);
   }
`;

export const spinerBodyDiv = styled.div`
   position: absolute;
   width: 21.75rem;
   height: 21.75rem;
   left: 0;
   top: 0;

   .point-img {
      position: absolute;
      height: 5.59375rem;
      right: -1.90625rem;
      top: 8.0625rem;
      width: 10rem;
      transform-origin: left center;

      .light-wrap {
         overflow: hidden;
         position: absolute;
         width: 6.875rem;
         height: 3.75rem;
         top: 0.9375rem;

         .point-light {
            top: 1.125rem;
            left: -1.875rem;
            position: absolute;
            width: 0.9375rem;
            height: 1.25rem;
            z-index: 6;
            overflow: hidden;
            background: -webkit-gradient(
               linear,
               left top,
               right top,
               color-stop(0%, rgba(255, 255, 255, 0)),
               color-stop(50%, rgba(255, 255, 255, 0.2)),
               color-stop(100%, rgba(255, 255, 255, 0))
            );
            transform: skew(-25deg);
         }
      }
   }
`;

export const spinnerWheelDiv = styled.div`
   position: absolute;
   width: 21.75rem;
   height: 21.75rem;
   left: 0;
   top: 0;
   transition: all 5s ease;
`;

import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   background-color: var(--dark-home-cl);

   .game-control-panel {
      padding: 1rem;
   }

   .hover_div {
      position: relative;
   }

   .show_tl {
      visibility: visible !important;
      opacity: 1 !important;
      transform: translateY(0);
   }
`;

export const inputDiv = styled.div`
   width: 100%;
   display: flex;
   height: 45px;
   background-color: var(--smooth-lg-sl-cl);
   border-radius: 3px;
   border: 1px solid transparent;
   transition: all 0.2s ease;

   .icon_div {
      width: 50px;

      img {
         transform: scale(0.7);
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }

   input {
      width: 100%;
      outline: none;
      color: var(--main-cl);
      background-color: transparent;
      bottom: none;
      font-size: 13px;
      font-weight: 500;
   }
`;

export const opDiv = styled.div`
   padding: 0.2rem;
   display: flex;
   align-items: center;

   .box {
      width: 38px;
      height: 100%;
      background-color: var(--dark-home-cl);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 0.1rem;
      position: relative;

      .cr {
         cursor: pointer;
         padding: 0 0.5rem;
      }

      p {
         font-size: 13px;
         color: var(--main-cl);
      }
   }

   .mv_div {
      position: absolute;
      top: 140%;
      right: -50%;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      background-color: var(--smooth-gray-sl-cl);
      z-index: 200;

      .box {
         background-color: var(--smooth-gray-sl-cl);
      }

      .sld {
         width: 100%;
         padding: 0.2rem 0.4rem;
      }
   }

   .ov_div {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
   }
`;

export const tolKit = styled.div`
   position: absolute;
   top: -60px;
   left: 0;
   width: max-content;
   padding: 0.7rem;
   border-radius: 5px;
   background-color: var(--smooth-lg-sl-cl);
   transition: all 0.3s ease;
   opacity: 0;
   visibility: hidden;
   transform: translateY(-10px);

   p {
      color: var(--main-cl);
   }
`;

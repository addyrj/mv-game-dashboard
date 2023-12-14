import styled from 'styled-components';

export const div = styled.div`
   .grd_div {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 1rem;
      width: 100%;
      height: 650px;
      overflow-x: hidden;
   }

   .edit_btn {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--dark-cl);
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      visibility: 0;
      transition: all 0.3s ease;

      svg {
         color: var(--smooth-gray-lg-cl);
      }
   }
`;

export const imageBox = styled.div`
   padding: 0.2rem;
   height: 140px;
   position: relative;

   &:hover {
      .edit_btn {
         visibility: visible;
         opacity: 1;
      }

      .cl_div {
         visibility: visible;
         opacity: 1;
      }
   }

   .cl_div {
      position: absolute;
      right: -2px;
      top: -2px;
      background-color: var(--light-gray-cl);
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s ease;
      opacity: 0;
      visibility: hidden;
      z-index: 100;

      &:hover {
         transform: scale(2);
      }
   }

   .imgBox {
      height: 100%;
      width: 100%;
   }
`;

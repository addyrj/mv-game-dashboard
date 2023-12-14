import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 800;
   background-color: var(--over-lay-cl);

   .mainDiv {
      width: 600px;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(17.8px);
      -webkit-backdrop-filter: blur(17.8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;

      .closeBtn {
         position: absolute;
         right: 10px;
         top: 10px;
         cursor: pointer;
      }
   }
`;

export const imageBox = styled.div`
   width: 100%;
   height: 500px;
   position: relative;

   &:hover {
      .replace_div {
         visibility: visible;
         opacity: 1;
      }
   }

   .replace_div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      cursor: pointer;
      background-color: var(--dark-cl);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   padding: 1rem;

   .logo_images_div {
      width: 100%;
   }

   .logo {
      width: 50px;
      height: auto;
   }

   .close_btn {
      position: absolute;
      right: 30px;
      top: 30px;
      cursor: pointer;

      svg {
         font-size: 25px;
      }
   }
`;

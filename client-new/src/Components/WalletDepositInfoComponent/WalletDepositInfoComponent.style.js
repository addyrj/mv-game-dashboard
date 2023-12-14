import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   height: 100%;

   .screen_div {
      height: 100%;
      overflow: scroll;

      .center {
         width: 100%;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   .ic_div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }
`;

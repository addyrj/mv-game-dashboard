import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100%;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;

   .center {
      position: relative;
      z-index: 100;
   }

   .bg_div {
      position: absolute;
      left: 0;
      top: 0;
      background-position: center;
      background-size: cover;
      background-image: url('/images/sfsf.png');
      width: 100%;
      height: 100%;
      filter: blur(6px);
   }
`;

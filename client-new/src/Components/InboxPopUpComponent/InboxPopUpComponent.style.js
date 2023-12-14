import styled from 'styled-components';

export const overlayDiv = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: var(--over-lay-cl);
   z-index: 500;
`;

export const mainDiv = styled.div`
   width: 100%;
   height: 100%;
   border-radius: 5px;
   background-color: var(--smooth-lg-sl-cl);
   position: relative;
   z-index: 10;
   left: ${(props) => (props?.show ? '-10px' : null)};
   transition: all 0.3s ease;
   position: relative;
   z-index: 600;

   .heading_div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
   }
`;

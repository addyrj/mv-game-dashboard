import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 270px;
   border-radius: 5px;
   overflow: hidden;
   position: relative;

   .blocked {
      position: absolute;
      right: 10px;
      top: 10px;
      border: 1px solid red;
      padding: 0.3rem 1rem;

      p {
         font-size: 13px;
      }
   }

   .imgDiv {
      width: 100%;
      height: 80%;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   .content_div {
      height: 20%;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--dark-home-body-cl);

      svg {
         cursor: pointer;
      }
   }
`;

import styled from 'styled-components';

export const profileContentDiv = styled.div`
   padding: 1rem;
`;

export const profile = styled.div`
   width: 180px;
   height: 180px;
   border-radius: 50%;
   margin: auto;
   padding: 0.2rem;
   background-color: var(--smooth-gray-sl-cl);
   position: relative;

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 50%;
   }

   .edit {
      padding: 0.3rem 0.7rem;
      background-color: var(--smooth-gray-sl-cl);
      border-radius: 5px;
      width: max-content;
      position: absolute;
      cursor: pointer;
      left: 50%;
      top: 86%;
      transform: translate(-50%, 0);

      p {
         color: var(--main-cl);
      }
   }
`;

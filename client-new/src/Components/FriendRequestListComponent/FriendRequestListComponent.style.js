import styled from 'styled-components';

export const div = styled.div`
   display: flex;
   align-items: center;
   padding: 1rem;

   @media (max-width: 600px) {
      align-items: flex-start;
   }
`;

export const profileDiv = styled.div`
   width: 60px;
   height: 60px;
   border-radius: 50%;
   overflow: hidden;

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }

   @media (max-width: 600px) {
      width: 50px;
      height: 50px;
   }
`;

export const contentDiv = styled.div`
   padding-left: 1rem;
   padding-right: 1rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;

   @media (max-width: 600px) {
      display: block;
   }
`;

export const optionsDiv = styled.div`
   display: flex;
   align-items: center;

   .box_div {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 50%;
      background-color: var(--smooth-gray-sl-cl);
   }

   .request_acc {
      background-color: var(--smooth-lg-sl-cl);
      padding: 0.4rem 1.2rem;
      border-radius: 5px;
   }

   @media (max-width: 600px) {
      margin-top: 1rem;
   }
`;

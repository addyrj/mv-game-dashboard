import styled from 'styled-components';

export const mainDiv = styled.div`
   transition: all 0.3s ease;
`;

export const div = styled.div`
   display: flex;
   padding: 0.2rem;
   border-radius: 5px;
   background-color: var(--model-bg-cl);

   .lucky_spin_div_lucky_spin {
      background-color: rgb(101, 49, 32);
   }

   .lucky_spin_div_lucky2_spin {
      background-color: rgb(235, 145, 6);
   }

   .lucky_spin_div_lucky3_spin {
      background-color: rgb(105, 14, 224);
   }

   .active_tab {
      img {
         filter: grayscale(0);
      }
   }
`;

export const boxDiv = styled.div`
   width: 70px;
   height: 70px;
   border-radius: 5px;
   padding: 0.5rem;
   cursor: pointer;

   img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(100%);
   }
`;

export const levelShowDiv = styled.div`
   padding: 0 0 0 0.5rem;
   width: 50%;

   .tag_div {
      width: 100%;
      padding: 0.5rem;
      border-radius: 5px;
   }

   .img_level_bg_div {
      width: 8.75rem;
      height: 1.875rem;
      margin: 0 auto;
      position: relative;
      text-align: center;
      line-height: 1.625rem;
      background: url(/images/tag.webp) no-repeat;
      background-size: 100% 100%;
      font-weight: 800;
      font-size: 1rem;
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   padding: 2rem 0;
`;

export const toggleDiv = styled.div`
   .toggle {
      padding: 0.4rem 2.8rem;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;

      .icon_div {
         position: absolute;
         left: 5px;

         img {
            width: 25px;
            height: auto;
         }
      }
   }

   .dark {
      background: linear-gradient(180deg, #565862 0%, #353842 84.9%);
      border-radius: 18px;

      p {
         color: var(--main-cl);
         font-weight: 500;
      }

      .icon_div {
         width: 25px;
         height: 25px;
         border-radius: 50%;
         padding: 0.1rem;
      }
   }

   .light {
      background-color: var(--main-cl);

      p {
         font-weight: 500;
      }
   }

   @media (max-width: 1600px) {
      display: block;

      .dark {
         margin-bottom: 0.5rem;
      }
   }

   @media (max-width: 500px) {
      display: flex;

      .dark,
      .light {
         width: 100%;
         margin-left: 1rem;
         margin-bottom: 0;
      }
   }

   @media (max-width: 350px) {
      display: block;

      .dark,
      .light {
         margin-left: 0;
         margin-bottom: 0.5rem;
      }
   }
`;

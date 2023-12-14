import styled from 'styled-components';

export const div = styled.div`
   display: grid;
   grid-template-columns: repeat(5, 1fr);
   padding-bottom: 1.5rem;
   border-bottom: 1px solid var(--light-gray-cl);

   @media (max-width: 1200px) {
      .list_div {
         h1 {
            font-size: 19px;
         }
      }
      grid-template-columns: repeat(4, 1fr);
   }

   @media (max-width: 900px) {
      .list_div {
         h1 {
            font-size: 17px;
         }
      }
      grid-template-columns: repeat(3, 1fr);
   }

   @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
   }

   @media (max-width: 450px) {
      grid-template-columns: repeat(1, 1fr);
      text-align: center;

      .icons_div {
         justify-content: center;
      }

      p {
         text-align: center;
         width: auto;
         margin: auto;
      }
   }

   .list_div {
      width: 100%;

      p {
         cursor: pointer;
         max-width: fit-content;

         &:hover {
            color: var(--light-blue-cl);
            text-decoration: underline;
         }
      }
   }
`;

export const footerIconDiv = styled.div`
   display: flex;
   align-items: center;

   .icon {
      width: 40px;
      height: 40px;

      img {
         cursor: pointer;
         width: 100%;
         height: 100%;
      }
   }

   .fb_icon {
      img {
         filter: drop-shadow(0px 4px 24px #072064);
      }
   }

   .td_icon {
      img {
         filter: drop-shadow(0px 4px 24px #1ea1de);
      }
   }

   .in_icon {
      img {
         filter: drop-shadow(0px 4px 24px #a91784);
      }
   }

   .wd_icon {
      img {
         filter: drop-shadow(0px 4px 24px #01c022);
      }
   }
`;

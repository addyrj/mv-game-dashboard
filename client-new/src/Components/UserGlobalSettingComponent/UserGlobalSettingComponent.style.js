import styled from 'styled-components';

export const div = styled.div`
   position: absolute;
   width: 400px;
   padding: 1rem;
   right: 0;
   top: 100%;
   border-radius: 5px;
   background-color: var(--dark-blue-cl);
   transition: all 0.2s ease;

   .mobile_sm_options {
      display: none;
   }

   .icons_grous_div {
      .icons_group_inner_div {
         width: 50%;
         padding: 0.2rem;
         cursor: pointer;

         &:hover {
            background-color: var(--smooth-gray-cl);

            svg {
               color: var(--main-cl);
            }

            p {
               color: var(--main-cl);
            }
         }
      }
   }

   .profile_inner_div {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;

      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   p {
      color: var(--smooth-gray-cl);
   }

   svg {
      color: var(--smooth-gray-cl);
   }

   .hover_div {
      cursor: pointer;

      &:hover {
         svg {
            color: var(--main-cl);
         }
         p {
            color: var(--main-cl);
         }
      }
   }

   @media (max-width: 1300px) {
      .mobile_sm_options {
         display: block;
      }
   }

   @media (max-width: 580px) {
      .icons_group_inner_div {
         width: 100% !important;
      }
   }

   @media (max-width: 500px) {
      width: 350px;

      p {
         font-size: 13px;
      }
   }

   @media (max-width: 470px) {
      width: 300px;
   }
`;

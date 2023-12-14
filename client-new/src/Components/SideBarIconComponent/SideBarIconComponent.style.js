import styled from 'styled-components';

export const div = styled.div`
   /* background-color: var(--dark-home-body-cl); */
   overflow: hidden;
   transition: all 0.5s ease-in-out;
   max-height: ${(props) => props?.parent && '60px'};
   position: relative;

   .home_icon {
      svg {
         font-size: 20px;
      }
   }

   .in_parent_div {
      padding: 1.1rem 1rem;
      width: 100%;
      background-color: var(--light-gray-cl);
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.2rem;

      .ar_icn {
         transition: all 0.3s ease;
      }

      p {
         font-weight: 600;
         font-size: 15px;
      }

      .rotate_180 {
         rotate: 90deg;
      }

      .drop_icon {
         transition: all 0.3s ease;
      }

      &:hover {
         background-color: var(--light-gray-cl);

         p {
            color: var(--main-cl);
         }

         svg {
            color: var(--main-cl);
         }
      }
   }

   img {
      width: 17px;
      height: auto;
   }

   .sub_vr {
      background-color: transparent;
      margin-bottom: auto;
   }

   @media (max-width: 1600px) {
      .in_parent_div {
         p {
            font-size: 13px;
         }
      }
   }

   .sub_elem_div {
      position: absolute;
      left: 50%;
      top: 50px;
      z-index: 400;
      width: 200px;
      background-color: var(--model-bg-cl);
      padding: 0.5rem;
      border-radius: 10px;
      visibility: hidden;
      opacity: 0;
      transition: all 0.3s ease;
   }

   .Show_options {
      visibility: visible;
      opacity: 1;
   }
`;

export const innerDiv = styled.div``;

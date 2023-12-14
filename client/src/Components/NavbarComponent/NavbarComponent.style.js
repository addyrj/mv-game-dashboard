import styled from 'styled-components';

export const div = styled.div`
   padding: 1% 2rem;
   /* border-bottom: 1px solid var(--smooth-gray-sl-cl); */

   .icon_box_div {
      width: 50px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      .user_profile_div {
         width: 40px;
         height: 40px;
         border-radius: 50%;
         cursor: pointer;
         overflow: hidden;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
      }

      svg {
         font-size: 20px;
         cursor: pointer;
         color: var(--smooth-gray-cl);
      }
   }
`;

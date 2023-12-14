import styled from 'styled-components';

export const div = styled.div`
   .user_sort_profile_div {
      /* width: 200px; */
      width: auto;

      .profile {
         width: 50px;
         height: 50px;
         border-radius: 50%;
         overflow: hidden;
         cursor: pointer;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
      }

      @media (max-width: 800px) {
         width: auto;

         h5 {
            display: none;
         }
      }
   }

   @media (max-width: 520px) {
      .user_sort_profile_div {
         display: none;
      }
   }
`;

import styled from 'styled-components';

export const div = styled.div`
   .box_div {
      padding: 0.2rem 1rem;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .user_cl {
      .box_div {
         background-color: var(--sm-border-cl);
      }
   }

   .admin_cl {
      .box_div {
         background-color: var(--light-green-cl);
         p {
            color: var(--main-cl);
         }
      }
   }

   .user_profile_div {
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
`;

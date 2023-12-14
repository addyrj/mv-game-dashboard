import styled from 'styled-components';

export const div = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: var(--smooth-gray-lg-cl);
`;

export const loginFormDiv = styled.div`
   width: 70%;
   height: 80%;
   border-radius: 5px;
   background-color: var(--main-cl);
   display: flex;
   border-radius: 10px;
   overflow: hidden;
   background-color: var(--dark-cl);

   @media (max-width: 1000px) {
      width: 90%;
   }

   @media (max-width: 600px) {
      h1 {
         font-size: 30px;
      }
   }
`;

export const loginInputGroups = styled.div`
   width: 100%;
   height: 100%;
   padding: 1rem;

   img {
      width: 30px;
      height: auto;
   }

   .login_div {
      width: 100%;
      height: 90%;
      display: flex;
      align-items: center;
      justify-content: center;

      .form_group {
         width: 400px;
      }
   }
`;

export const imgPrvDiv = styled.div`
   width: 100%;
   height: 100%;
   background-image: url(https://images.pexels.com/photos/3933881/pexels-photo-3933881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
   background-position: center;
   background-size: cover;
`;

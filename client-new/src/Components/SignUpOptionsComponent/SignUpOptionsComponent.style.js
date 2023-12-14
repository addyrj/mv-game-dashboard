import styled from 'styled-components';

export const div = styled.div`
   .social_login {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 31px;

      ._icon_div {
         background-color: var(--main-cl);
         padding: 0.4rem;
      }

      ._fb {
         background-color: #1977f2;
         padding-top: 6px;
         font-size: 1.5rem;
         overflow: hidden;
      }

      ._google {
         background-color: #fff;
         margin: auto 15px;
         font-size: 1.8rem;
      }

      ._twitter {
         background-color: #1db7eb;
         font-size: 1.2rem;
      }

      ._link {
         height: 32px;
         width: 32px;
         border-radius: 50%;
         display: flex;
         align-items: center;
         justify-content: center;
         cursor: pointer;

         /* font-size: 18px; */
         ._icon {
            color: #fff;
         }
      }
   }
`;

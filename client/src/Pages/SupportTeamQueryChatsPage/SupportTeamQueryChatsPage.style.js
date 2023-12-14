import styled from 'styled-components';

export const div = styled.div`
   .content {
      .msg_div {
         .profile_div {
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

         .ms {
            max-width: 50%;
            background-color: var(--smooth-gray-sl-cl);
            padding: 0.2rem 1rem;
            border-radius: 15px 15px 15px 0;

            p {
               font-size: 15px;
            }
         }
      }
   }
`;

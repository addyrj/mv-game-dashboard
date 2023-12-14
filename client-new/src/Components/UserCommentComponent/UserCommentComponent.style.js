import styled from 'styled-components';

export const div = styled.div`
   .comment {
      display: grid;
      gap: 14px;

      .btn_options {
         cursor: pointer;
      }

      .box_num {
         padding: 0.2rem 0.4rem;
      }

      .user-banner {
         display: flex;
         justify-content: space-between;
         align-items: center;

         .user {
            gap: 8px;
            align-items: center;
            display: flex;
            .avatar {
               height: 40px;
               width: 40px;
               display: flex;
               align-items: center;
               justify-content: center;
               border: 1px solid transparent;
               position: relative;
               border-radius: 100px;
               font-weight: 500;
               font-size: 13px;
               line-height: 20px;
               img {
                  max-width: 100%;
                  border-radius: 50%;
               }
               .stat {
                  display: flex;
                  position: absolute;
                  right: -2px;
                  bottom: -2px;
                  display: block;
                  width: 12px;
                  height: 12px;
                  z-index: 9;
                  border: 2px solid #ffffff;
                  border-radius: 100px;
                  &.green {
                     background: #00ba34;
                  }
                  &.grey {
                     background: #969696;
                  }
               }
            }
         }
      }
      .footer {
         gap: 12px;
         display: flex;
         align-items: center;
         .reactions {
            display: flex;
            align-items: center;
            gap: 8px;
         }
         .divider {
            height: 12px;
            width: 1px;
         }
      }

      & + & {
         padding-top: 12px;
      }
      &.reply {
         .user-banner,
         .content,
         .footer {
            margin-left: 32px;
         }
      }
   }
`;

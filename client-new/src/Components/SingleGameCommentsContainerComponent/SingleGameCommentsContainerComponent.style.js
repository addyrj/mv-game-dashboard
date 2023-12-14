import styled from 'styled-components';

export const div = styled.div`
   width: 100%;

   .block {
      padding: 1rem;
      background: var(--dark-home-cl);
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
         0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      display: block;
   }

   h5 {
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
   }
   .btn {
      appearance: none;
      background: transparent;
      border: 0;
      padding: 0;
      display: flex;
      font: inherit;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #1c1c1c;
      transition: 0.2s ease;

      i {
         color: #969696;
         font-size: 18px;
         transition: 0.15s ease-in-out;
      }

      &.primary {
         min-width: 100px;
         padding: 8px 12px;
         height: 40px;
         color: #fff;
         display: inline-flex;
         background: #0085ff;
         box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
            0px 2px 1px rgba(0, 0, 0, 0.06), 0px 1px 1px rgba(0, 0, 0, 0.08);
         border-radius: 8px;
         &:hover {
            background: lighten(#0085ff, 10%);
         }
      }
      &:hover {
         i {
            opacity: 0.7;
         }
      }
      outline: none;
      img {
         max-width: 18px;
         height: auto;
      }
      &.react {
         padding: 4px 8px 4px 4px;
         background: #f7f7f7;
         border: 1px solid #e8e8e8;
         border-radius: 8px;
         gap: 4px;
         &:hover {
            background-color: #eee;
         }
      }
      &.dropdown {
         display: flex;
         cursor: pointer;
         border-radius: 50%;
         align-items: center;
         justify-content: center;
         padding: 0;
         width: 26px;
         height: 26px;
         &:hover {
            background-color: #eee;
         }
      }
   }
   p {
      line-height: 24px;
      a.tagged-user {
         display: inline-flex;
         padding: 2px 8px;
         background: #e5f3ff;
         border-radius: 256px;
         color: #0085ff;
      }
   }
   .is-mute {
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #969696;
   }
   a {
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      color: #1c1c1c;
      text-decoration: none;
      transition: opacity 0.15s ease-in-out;
      &:hover {
         opacity: 0.7;
      }
   }
   h2 {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
   }
   * {
      box-sizing: border-box;
   }
   .load {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
         display: flex;
         align-items: center;
         font-weight: 400;
         font-size: 13px;
         line-height: 20px;
         color: #969696;
         i {
            margin-right: 6px;
         }
      }
   }
   .group-button {
      display: flex;
   }
`;

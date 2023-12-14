import styled from 'styled-components';

export const div = styled.div`
   #content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .card--container {
      background: #45d045;
      background: var(--light-gray-cl);
      width: 100%;
      height: 20em;
      box-sizing: content-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 1em;
   }
   .card--body {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
   }

   .card--content {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 0em 2em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
   }

   .card--meta {
      background: rgba(0, 0, 0, 0.2);
      width: 100%;
      box-sizing: border-box;
      padding: 0em 2em;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom-left-radius: 1em;
      border-bottom-right-radius: 1em;
   }
   .icon {
      height: 4em;
      width: 4em;
      padding: 0em 0em;
      margin: 0em 0em;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      overflow: hidden;
   }
   .card--title {
      font-family: 'Open Sans', sans-serif;
      font-weight: 700;
      margin: 0em 0em;
      color: rgba(255, 255, 255, 1);
      font-size: 1.75em;
      line-height: 1.15em;
   }
   .card--author {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      padding: 0;
      color: rgba(255, 255, 255, 0.6);
      font-size: 1em;
      line-height: 1.15em;
   }
   .card--tag {
      font-family: 'Open Sans', sans-serif;
      margin: 2em 0em;
      color: rgba(255, 255, 255, 1);
      font-size: 0.9em;
      line-height: 1.15em;
   }
`;

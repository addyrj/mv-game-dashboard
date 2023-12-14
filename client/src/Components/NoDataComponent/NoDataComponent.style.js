import styled from 'styled-components';

export const div = styled.div`
   padding: 1rem;
   border-radius: 5px;
   background-color: ${(props) =>
      props?.bg ? props.bg : 'var(--smooth-gray-md-cl)'};
   position: ${(props) => (props?.center ? 'absolute' : 'relative')};
   left: ${(props) => (props?.center ? '50%' : '0')};
   top: ${(props) => (props?.center ? '50%' : '0')};
   transform: ${(props) => (props?.center ? 'translate(-50%, -50%)' : null)};
   width: 100%;

   .ig_div {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .erro_text {
         position: absolute;
         bottom: 9%;
         font-size: 12px;
      }

      img {
         width: auto;
         height: 100%;
      }
   }
`;

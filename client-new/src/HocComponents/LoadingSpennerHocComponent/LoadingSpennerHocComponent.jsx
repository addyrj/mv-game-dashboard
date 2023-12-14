import SpennerComponent from '../../Components/SpennerComponent/SpennerComponent';

const LoadingSpennerHocComponent = function (OriginalComponent) {
   const newComponent = function ({ isLoading, ...otherProps }) {
      return isLoading ? (
         <OriginalComponent {...otherProps}>
            <SpennerComponent />
         </OriginalComponent>
      ) : (
         <OriginalComponent {...otherProps} />
      );
   };

   return newComponent;
};

export default LoadingSpennerHocComponent;

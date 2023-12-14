import SpinnerComponent from '../../Components/SpinnerComponent/SpinnerComponent';

const LoadingSpennerHocComponent = function (OriginalComponent) {
   const newComponent = function ({ isLoading, ...otherProps }) {
      return isLoading ? (
         <SpinnerComponent />
      ) : (
         <OriginalComponent {...otherProps} />
      );
   };

   return newComponent;
};

export default LoadingSpennerHocComponent;

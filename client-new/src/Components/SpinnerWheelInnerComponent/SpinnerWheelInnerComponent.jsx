import React, { useEffect, useRef } from 'react';
import SpinItemComponent from '../SpinItemComponent/SpinItemComponent';
import './SpinnerWheelInnerComponent.style.css';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SpinnerWheelInnerComponent({ dataAr }) {
   const SpotLightRef = useRef(null);

   useEffect(() => {
      const interval = setInterval(() => {
         SpotLightRef.current.classList.toggle('active_light');
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   return (
      <motion.div
         initial={{ scale: 0.2, opacity: 0, rotate: '-40deg' }}
         animate={{ scale: 1, opacity: 1, rotate: '0deg' }}
         transition={{
            duration: 0.8,
            type: 'spring',
         }}
         className="spinner_wheel_inner_div"
      >
         <img
            className="spin-light"
            src="/images/spinLight.webp"
            alt="spin-light"
            ref={SpotLightRef}
         />
         <LazyLoadImage
            className="spin-img"
            src="/images/spin_bronze.webp"
            alt="spin-img"
         />
         {dataAr.map((el, index) => (
            <SpinItemComponent key={index} data={el} index={index} />
         ))}
      </motion.div>
   );
}

export default SpinnerWheelInnerComponent;

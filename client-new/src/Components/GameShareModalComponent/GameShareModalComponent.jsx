import React from 'react';
import * as styled from './GameShareModalComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ShareAr = [
   { src: '/images/facebook.webp', id: 1 },
   { src: '/images/skipe.webp', id: 2 },
   { src: '/images/tali.webp', id: 3 },
   { src: '/images/twitter.webp', id: 4 },
   { src: '/images/wink.webp', id: 5 },
];

function GameShareModalComponent({ closeEvent }) {
   return ReactDOM.createPortal(
      <styled.div>
         <motion.div
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.8 }}
            className="main_div"
         >
            <div className="close_btn" onClick={closeEvent}>
               <VscClose className="text-gray-400" />
            </div>
            <div className="text-center">
               <p className="text-gray-200 font-bold text-xl">
                  Share This Game
               </p>
               <div className="flex items-center space-x-4 justify-center mt-4">
                  {ShareAr.map((el) => (
                     <a key={el.id}>
                        <LazyLoadImage className="icon_div" src={el.src} />
                     </a>
                  ))}
               </div>
            </div>
         </motion.div>
         <styled.overLayDiv onClick={closeEvent} />
      </styled.div>,
      document.getElementById('popUp')
   );
}

export default GameShareModalComponent;

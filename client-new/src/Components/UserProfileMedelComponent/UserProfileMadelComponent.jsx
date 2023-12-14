import React from 'react';
import * as styled from './UserProfileMadelComponent.style';
import MadelHeadingComponent from '../MadelHeadingComponent/MadelHeadingComponent';
import { SiPolymerproject } from '@react-icons/all-files/si/SiPolymerproject';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   allMadelsFetchErrorSelector,
   allMadelsLoadingSelector,
   allMadelsSelector,
   userInfoSelector,
} from './UserProfile.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UserProfileMadelComponent() {
   const userInfo = useSelector(userInfoSelector);
   const allMadels = useSelector(allMadelsSelector);
   const allMadelsLoading = useSelector(allMadelsLoadingSelector);
   const allMadelsFetchError = useSelector(allMadelsFetchErrorSelector);

   return (
      <styled.div>
         <MadelHeadingComponent
            icon={<SiPolymerproject className="text-gray-400" />}
            text={'Medels'}
         />
         <styled.medelDiv className="mt-3">
            <div className="over_div">
               {!!allMadelsLoading ? <SpennerComponent center={true} /> : null}
               {!!allMadelsFetchError ? (
                  <p className="error_cl text-sm">{allMadelsFetchError}</p>
               ) : null}
               {!!userInfo &&
               userInfo?.success &&
               userInfo?.user &&
               !!allMadels &&
               allMadels?.success &&
               allMadels?.madels.length
                  ? allMadels?.madels.map((el, i) => {
                       return (
                          <motion.div
                             className={'ac_div locked'}
                             key={el._id}
                             initial={{ scale: 0 }}
                             animate={{ scale: 1 }}
                             transition={{
                                type: 'spring',
                                stiffness: 180,
                                delay: `${i / 10}`,
                                damping: 20,
                             }}
                          >
                             <LazyLoadImage
                                src={el?.url}
                                alt=""
                                crossOrigin="anonymous"
                             />
                          </motion.div>
                       );
                    })
                  : null}
            </div>
         </styled.medelDiv>
      </styled.div>
   );
}

export default React.memo(UserProfileMadelComponent);

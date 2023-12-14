import React, { Fragment, useState, useCallback, useEffect } from 'react';
import * as styled from './LuckySpinnerComponent.style';
import { LuckySpinAr } from './SpinnerAr';
import { useSelector, useDispatch } from 'react-redux';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   userSpinInfoSelector,
   userSpinInfoErrorSelector,
   authSelector,
   selectedDrawSelector,
   luckyDrawDataLoadingSelector,
} from './LuckySpinner.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getLuckSpinDrawInfo } from '../../App/Features/LuckyDraw/LuckyDrawActions';
import LuckSpinnerWheelComponent from '../LuckSpinnerWheelComponent/LuckSpinnerWheelComponent';

function LuckySpinNavComponent() {
   const userSpinInfo = useSelector(userSpinInfoSelector);
   const userSpinInfoError = useSelector(userSpinInfoErrorSelector);
   const auth = useSelector(authSelector);
   const selectedDraw = useSelector(selectedDrawSelector);
   const luckyDrawDataLoading = useSelector(luckyDrawDataLoadingSelector);
   const dispatch = useDispatch();

   const [ActiveTab, setActiveTab] = useState({
      name: 'lucky_spin',
      level: 0,
      heading: 'Bronze',
      achievements: 'bronze',
   });

   const activeTabHandler = useCallback(function (data) {
      setActiveTab({
         name: data?.name,
         level: data?.level,
         heading: data?.heading,
         achievements: data?.achievements,
      });
   }, []);

   useEffect(() => {
      if (!userSpinInfo) {
         dispatch(getLuckSpinDrawInfo({ selectedDraw }));
      }
   }, []);

   return (
      <styled.mainDiv>
         {luckyDrawDataLoading ? <SpennerComponent /> : null}
         {!!userSpinInfo &&
         userSpinInfo?.success &&
         userSpinInfo?.response.length ? (
            <Fragment>
               <styled.div>
                  {LuckySpinAr.map((el) => (
                     <styled.boxDiv
                        key={el.level}
                        onClick={() => activeTabHandler(el)}
                        className={
                           el.name === ActiveTab?.name
                              ? `active_tab lucky_spin_div_${el.name}`
                              : null
                        }
                     >
                        <LazyLoadImage src={el.src} alt={el.name} />
                     </styled.boxDiv>
                  ))}
                  <styled.levelShowDiv className="flex items-center justify-center">
                     <div
                        className={`tag_div lucky_spin_div_${ActiveTab.name}`}
                     >
                        <div className="img_level_bg_div">
                           <p className="text-white">{ActiveTab?.heading}</p>
                        </div>
                        <p className="text-gray-200 font-bold text-sm text-center mt-1">
                           Level {ActiveTab?.level} or Above
                        </p>
                     </div>
                  </styled.levelShowDiv>
               </styled.div>
               <LuckSpinnerWheelComponent
                  ActiveTab={ActiveTab}
                  userSpinInfo={userSpinInfo}
                  auth={auth}
                  selectedDraw={selectedDraw}
               />
            </Fragment>
         ) : null}
         {!!userSpinInfoError ? (
            <p className="text-sm error_cl">{userSpinInfoError}</p>
         ) : null}
      </styled.mainDiv>
   );
}

export default LuckySpinNavComponent;

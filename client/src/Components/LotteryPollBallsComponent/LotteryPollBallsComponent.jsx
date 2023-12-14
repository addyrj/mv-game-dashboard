import React, { useEffect } from 'react';
import * as styled from './LotteryPollBallsComponent.style';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, lotteryPollUpdateLoadingSelector } from './Lottery.Selector';
import { useForm, Controller } from 'react-hook-form';
import CustomButtonComponent from '../CustomButtonComponent/CustomButtonComponent';
import { message } from 'antd';
import { useParams } from 'react-router';
import useRoles from '../../Hooks/useRoles';
import { updateLuckyDrawPollResult } from '../../App/Features/LuckyDraw/LuckyDrawActions';

const digitalBalls = new Array(36).fill(1).map((el, idx) => (el = idx + 1));
const jackpotBalls = new Array(10).fill(1).map((el, idx) => (el = idx + 1));

function LotteryPollBallsComponent({ jackpotBallNumber, luckyNumbers }) {
   const { control, getValues, setValue } = useForm({
      defaultValues: {
         digitsOptionalNumbers: new Array(5),
         jackpotBallNumber: '',
      },
   });

   const {
      userRoles: { isAdmin, isSupport },
      isLoading,
      error,
   } = useRoles();

   const params = useParams();
   const dispatch = useDispatch();

   const lotteryPollUpdateLoading = useSelector(lotteryPollUpdateLoadingSelector);
   const auth = useSelector(authSelector);

   const lotterySelectedBallsHandler = function (number, type) {
      if (type === 'digitsOptional') {
         const items = getValues('digitsOptionalNumbers');

         if (items.includes(number)) {
            const updatedNumbers = items.filter((el) => el !== number);
            return setValue('digitsOptionalNumbers', updatedNumbers);
         }

         if (items.length <= 4) {
            const data = items.concat(number);
            setValue('digitsOptionalNumbers', data);
         } else {
            message.error('You can only select 5 number.');
         }
      }

      if (type === 'jackpotBall') {
         setValue('jackpotBallNumber', number);
      }
   };

   const submitHandler = function () {
      if (!params && !params?.id) return message.error('Game id is required!');

      if (!isAdmin) return message.error('You have no access to use this feature!');

      const optionalNumbers = getValues('digitsOptionalNumbers');
      const jackpotBall = getValues('jackpotBallNumber');

      if (!!optionalNumbers && optionalNumbers?.length < 5) {
         return message.error('Please select 5 digits optional balls');
      }

      if (!jackpotBall) {
         return message.error('Jack pot ball is reuqired');
      }

      if (!!auth && auth?.user && auth?.user?.userId) {
         dispatch(
            updateLuckyDrawPollResult({
               optionalNumbers,
               jackpotBall,
               gameId: params?.id,
            })
         );
      } else {
         message.error('You need to login first!');
      }
   };

   useEffect(() => {
      if (!!luckyNumbers && luckyNumbers?.length) {
         setValue('digitsOptionalNumbers', luckyNumbers);
      }
      if (!!jackpotBallNumber) {
         setValue('jackpotBallNumber', jackpotBallNumber);
      }
   }, []);

   return (
      <styled.div>
         <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="popDiv"
         >
            <styled.contentDiv className="p-4">
               <div className="mt-2">
                  <div>
                     <styled.ballsDiv className="mt-4 mb-4">
                        <div className="mb-2 px-2">
                           <p className="text-gray-400 text-sm font-medium">5 digits optional</p>
                        </div>
                        <div className="grid_div" grid={9}>
                           {digitalBalls.map((el, idx) => (
                              <div className="p-1" key={el + idx + 'digitsOptional'}>
                                 <div className="digital_ball_div">
                                    <Controller
                                       name="digitsOptionalNumbers"
                                       control={control}
                                       render={({ field: { value } }) => (
                                          <button
                                             className={value.includes(el) ? 'active_ball ball' : 'ball'}
                                             onClick={() => lotterySelectedBallsHandler(el, 'digitsOptional')}
                                          >
                                             <p>{el}</p>
                                          </button>
                                       )}
                                    />
                                 </div>
                              </div>
                           ))}
                        </div>
                        <div className="mt-4 pt-3">
                           <div className="my-2 px-2">
                              <p className="text-gray-400 text-sm font-medium">1 Jackpot Ball</p>
                           </div>
                           <div className="jackpot_balls">
                              <Controller
                                 name="jackpotBallNumber"
                                 control={control}
                                 render={({ field: { value } }) =>
                                    jackpotBalls.map((el, idx) => (
                                       <div className="p-1" key={el + idx}>
                                          <div className="digital_ball_div">
                                             <button
                                                className={el == value ? 'jackpot_active_ball ball jc' : 'ball jc'}
                                                onClick={() => lotterySelectedBallsHandler(el, 'jackpotBall')}
                                             >
                                                <p>{el}</p>
                                             </button>
                                          </div>
                                       </div>
                                    ))
                                 }
                              />
                           </div>
                        </div>
                     </styled.ballsDiv>
                     <p className="text-sm text-green-500 px-2 text-center">
                        Please choose 6 numbers to save the lottery result
                     </p>
                     <div className="mt-4 mb-4 flex items-center justify-center">
                        <CustomButtonComponent
                           text={'Set lottery result numbers'}
                           btnCl={'Crypto_btn px-5 py-3'}
                           onClick={submitHandler}
                           isLoading={lotteryPollUpdateLoading}
                        />
                     </div>
                  </div>
               </div>
            </styled.contentDiv>
         </motion.div>
      </styled.div>
   );
}

export default LotteryPollBallsComponent;

import React, { Fragment, useEffect, useState, useContext } from 'react';
import * as styled from './UserProfileModelComponent.style';
import ReactDOM from 'react-dom';
import { VscClose } from '@react-icons/all-files/vsc/VscClose';
import { BsFillHeartFill } from '@react-icons/all-files/bs/BsFillHeartFill';
import { BiMessageSquareEdit } from '@react-icons/all-files/bi/BiMessageSquareEdit';
import { useDispatch, useSelector } from 'react-redux';
import {
   getAllMadels,
   getSelectedUserInfo,
   getUserInformation,
} from '../../App/Features/Client/clientActions';
import { useCookies } from 'react-cookie';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import {
   removeUserInfromation,
   addRequestLoadingHandler,
   inserUserRequestHandler,
} from '../../App/Features/Client/clientSlice';
import EditProfileModelComponent from '../EditProfileModelComponent/EditProfileModelComponent';
import EditYourAvatarModelComponent from '../EditYourAvatarModelComponent/EditYourAvatarModelComponent';
import UserProfileMadelComponent from '../UserProfileMedelComponent/UserProfileMadelComponent';
// import UserProfileStatisticsComponent from '../UserProfileStatisticsComponent/UserProfileStatisticsComponent';
import FavoriteGamesComponent from '../FavoriteGamesComponent/FavoriteGamesComponent';
// import WagerConertComponent from '../WagerConertComponent/WagerConertComponent';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import NoDataComponent from '../NoDataComponent/NoDataComponent';
import { FaRegMoneyBillAlt } from '@react-icons/all-files/fa/FaRegMoneyBillAlt';
import { AiOutlineUserAdd } from '@react-icons/all-files/ai/AiOutlineUserAdd';
import { useSharedState } from '../../Context/PopUpContext';
import SendRequestComponent from '../SendRequestComponent/SendRequestComponent';
import toast from 'react-hot-toast';
import { SocketContext } from '../../Context/SocketIoContext';
import { RiTimerFlashFill } from '@react-icons/all-files/ri/RiTimerFlashFill';
import { FcApproval } from '@react-icons/all-files/fc/FcApproval';
import { BiBlock } from '@react-icons/all-files/bi/BiBlock';
import {
   userInfoSelector,
   fetchUserInfoLoadingSelector,
   fetchUserInfoErrorSelector,
   updateUserNameSelector,
} from './UserProfile.Selector';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function UserProfileModelComponent({ Close, selectedUserId, profileModel }) {
   const socket = useContext(SocketContext);
   const [cookie] = useCookies();
   const dispatch = useDispatch();
   const [ShowPrvImage, setShowPrvImage] = useState(false);
   const [ShowRequestModel, setShowRequestModel] = useState(false);
   const [PopUpContextState, setPopUpContextState] = useSharedState();

   const userInfo = useSelector(userInfoSelector);
   const fetchUserInfoLoading = useSelector(fetchUserInfoLoadingSelector);
   const fetchUserInfoError = useSelector(fetchUserInfoErrorSelector);
   const updateUserName = useSelector(updateUserNameSelector);

   const showImagePrvHandler = function () {
      setShowPrvImage((prevState) => !prevState);
   };

   const showEditHandler = function () {
      setPopUpContextState({
         ...PopUpContextState,
         showEditPopUp: true,
      });
   };

   const requestCancelHandler = function () {
      setShowRequestModel(false);
   };

   const friendRequestSendHandler = function (args) {
      if (args && args?.success) {
         toast.success(args.msg);
         dispatch(addRequestLoadingHandler({ data: false }));
         dispatch(inserUserRequestHandler({ data: args }));
         requestCancelHandler();
      } else {
         toast.error(args.msg);
      }
   };

   useEffect(() => {
      if (!!cookie && cookie?._mv_games_auth) {
         if (!!selectedUserId) {
            dispatch(
               getSelectedUserInfo({
                  userId: cookie?._mv_games_auth?._id,
                  selectedUserId: selectedUserId,
               })
            );
            dispatch(getAllMadels());
         }

         if (!selectedUserId) {
            dispatch(
               getUserInformation({ userId: cookie?._mv_games_auth?._id })
            );
            dispatch(getAllMadels());
         }
      }

      socket.on('__friend_request_send_respose', friendRequestSendHandler);

      return () => {
         socket.off('__friend_request_send_respose', friendRequestSendHandler);
         dispatch(removeUserInfromation());
      };
   }, []);

   return ReactDOM.createPortal(
      <styled.div>
         <div id="overLay_div" onClick={Close} />
         <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
               duration: 0.2,
            }}
            className={
               PopUpContextState?.showEditPopUp
                  ? 'model_card_div ove_hi shadow py-3 px-4'
                  : 'model_card_div shadow py-3 px-4'
            }
         >
            <AnimatePresence>
               {!!ShowRequestModel ? (
                  <SendRequestComponent
                     userId={selectedUserId}
                     close={requestCancelHandler}
                  />
               ) : null}
            </AnimatePresence>
            <styled.ProfilePosDiv slide={PopUpContextState?.showEditPopUp}>
               {fetchUserInfoLoading ? (
                  <div className="loading_spenner_div">
                     <SpennerComponent />
                  </div>
               ) : null}
               {!!fetchUserInfoError ? (
                  <p className="error_cl text-sm">{fetchUserInfoError}</p>
               ) : null}
               {!!userInfo &&
               !fetchUserInfoError &&
               userInfo?.success &&
               !userInfo?.error &&
               userInfo?.user ? (
                  <Fragment>
                     <styled.imagePrevDivOverLay show={ShowPrvImage}>
                        <styled.imagePrevDiv show={ShowPrvImage}>
                           <div
                              className="close_button_div_ic shadow"
                              onClick={showImagePrvHandler}
                           >
                              <VscClose />
                           </div>
                           <LazyLoadImage
                              src={userInfo?.user?.avatar}
                              alt=""
                              crossOrigin="anonymous"
                           />
                        </styled.imagePrevDiv>
                     </styled.imagePrevDivOverLay>
                     <div className="pb-3">
                        <div className="flex justify-between">
                           <div className="flex items-center justify-between w-100">
                              <h5 className="text-gray-300 font-bold">
                                 User Information
                              </h5>
                              <div className="vip_logo_div">
                                 <LazyLoadImage
                                    src="https://bc.game/assets/vip_type1.2d5e87ff.svg"
                                    alt=""
                                 />
                              </div>
                           </div>
                           <div className="close_button_div">
                              <VscClose
                                 onClick={(event) => Close(event, 'closeEvent')}
                              />
                           </div>
                        </div>
                        <div
                           className={
                              userInfo?.user?.statisticsHidden
                                 ? 'flex items-center justify-center'
                                 : 'flex items-center justify-between'
                           }
                        >
                           {(!profileModel &&
                              !!userInfo?.user?.statisticsHidden) ||
                           !profileModel ? null : (
                              <div className="icon_box_div">
                                 <BsFillHeartFill className="text-white" />
                                 <p className="text-gray-100 ms-2">0</p>
                              </div>
                           )}
                           <div className="user_profile_card_div m-auto px-2">
                              <div
                                 className="profile_div shadow"
                                 onClick={showImagePrvHandler}
                              >
                                 <LazyLoadImage
                                    src={userInfo?.user?.avatar}
                                    alt=""
                                    crossOrigin="anonymous"
                                 />
                              </div>
                              <div className="profile_info text-center mt-2">
                                 <h5 className="text-gray-100 text-lg font-bold">
                                    {!!updateUserName &&
                                    updateUserName?.success &&
                                    updateUserName?.userName
                                       ? updateUserName?.userName
                                       : userInfo?.user?.name}
                                 </h5>
                                 <p className="text-gray-400 text-sm">
                                    User Id: {userInfo?.user?.userId}
                                 </p>
                              </div>
                           </div>
                           {(!profileModel &&
                              !!userInfo?.user?.statisticsHidden) ||
                           !profileModel ? null : (
                              <div>
                                 <div
                                    className="edit_icon shadow"
                                    onClick={showEditHandler}
                                 >
                                    <BiMessageSquareEdit className="text-gray-100" />
                                 </div>
                              </div>
                           )}
                        </div>
                        {userInfo?.user?._id !== cookie?._mv_games_auth?._id ? (
                           <div className="mt-3 flex items-center justify-center">
                              <styled.otherOptionsDiv>
                                 <FaRegMoneyBillAlt />
                                 <p>Tip</p>
                              </styled.otherOptionsDiv>
                              {!!userInfo &&
                              userInfo?.user &&
                              userInfo?.user?.newFriendRequest ? (
                                 <>
                                    {!!userInfo?.user?.requests &&
                                    userInfo?.user?.requests.length ? (
                                       userInfo?.user?.requests[0].status ===
                                       'pending' ? (
                                          <styled.otherOptionsDiv
                                             className={
                                                userInfo?.user?.requests[0]
                                                   .status
                                             }
                                          >
                                             <RiTimerFlashFill className="text-white" />
                                             <p>
                                                {
                                                   userInfo?.user?.requests[0]
                                                      .status
                                                }
                                             </p>
                                          </styled.otherOptionsDiv>
                                       ) : null
                                    ) : null}
                                    {userInfo?.user?.isFriend.length &&
                                    userInfo?.user?.isFriend[0]?.userId ===
                                       cookie?._mv_games_auth?._id ? (
                                       <styled.otherOptionsDiv>
                                          <FcApproval />
                                          <p>Friend</p>
                                       </styled.otherOptionsDiv>
                                    ) : null}
                                    {userInfo?.user?.isBlocked.length &&
                                    userInfo?.user?.isBlocked[0]?.userId ===
                                       cookie?._mv_games_auth?._id ? (
                                       <styled.otherOptionsDiv>
                                          <BiBlock />
                                          <p>Blocked</p>
                                       </styled.otherOptionsDiv>
                                    ) : null}
                                    {!userInfo?.user?.isFriend.length &&
                                    !userInfo?.user?.requests.length &&
                                    !userInfo?.user?.isBlocked?.length ? (
                                       <styled.otherOptionsDiv
                                          onClick={() =>
                                             setShowRequestModel(true)
                                          }
                                       >
                                          <AiOutlineUserAdd />
                                          <p>Add</p>
                                       </styled.otherOptionsDiv>
                                    ) : null}
                                 </>
                              ) : null}
                           </div>
                        ) : null}
                        {!!userInfo?.user?.statisticsHidden && !profileModel ? (
                           <div className="mt-4">
                              <NoDataComponent
                                 image={'/images/privacy.webp'}
                                 heading={'Statistics hidden'}
                              />
                           </div>
                        ) : (
                           <>
                              <div className="mt-4">
                                 <UserProfileMadelComponent />
                                 {/* <div className="mt-2">
                                    <UserProfileStatisticsComponent />
                                 </div> */}
                              </div>
                              <div className="mt-2">
                                 <FavoriteGamesComponent
                                    hasData={false}
                                    heading={`Top 3 Favorite Games`}
                                 />
                              </div>
                              {/* <div className="mt-2">
                                 <WagerConertComponent
                                    hasData={false}
                                    heading={'Wager contest'}
                                 />
                              </div> */}
                           </>
                        )}
                        <p className="text-center mt-3 text-gray-500 text-sm">
                           Joined on{' '}
                           {dayjs(userInfo?.user?.createdAt).format(
                              'D MMMM YYYY h:m:ss A'
                           )}
                        </p>
                     </div>
                  </Fragment>
               ) : null}
            </styled.ProfilePosDiv>
            <AnimatePresence>
               {PopUpContextState?.showEditPopUp ? (
                  <EditProfileModelComponent
                     slide={PopUpContextState?.showEditAvatar}
                     show={PopUpContextState?.showEditPopUp}
                  />
               ) : null}
            </AnimatePresence>
            <AnimatePresence>
               {PopUpContextState?.showEditAvatar ? (
                  <EditYourAvatarModelComponent
                     show={PopUpContextState?.showEditAvatar}
                  />
               ) : null}
            </AnimatePresence>
         </motion.div>
      </styled.div>,
      document.getElementById('user_profile_info_model')
   );
}

export default React.memo(UserProfileModelComponent);

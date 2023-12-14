import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   gameCommentsInfoSelector,
   gameCommentsLoadingSelector,
   gameCommentsErrorSelector,
   authSelector,
} from './UserComment.Selector';
import * as styled from './UserCommentComponent.style';
import { useParams } from 'react-router';
import SpennerComponent from '../SpennerComponent/SpennerComponent';
import { AiTwotoneLike } from '@react-icons/all-files/ai/AiTwotoneLike';
import toast from 'react-hot-toast';
import {
   getSingleGameComments,
   likeGameComment,
} from '../../App/Features/Game/gameAction';

function UserCommentComponent() {
   const dispatch = useDispatch();
   const param = useParams();

   const auth = useSelector(authSelector);
   const gameCommentsInfo = useSelector(gameCommentsInfoSelector);
   const gameCommentsLoading = useSelector(gameCommentsLoadingSelector);
   const gameCommentsError = useSelector(gameCommentsErrorSelector);

   const likeHandler = function (commentId) {
      if (!!auth && auth?.user && auth?.user?._id) {
         dispatch(
            likeGameComment({
               userId: auth?.user?._id,
               gameId: param?.id,
               commentId,
            })
         );
      } else {
         toast.error('You need to login first');
      }
   };

   useEffect(() => {
      dispatch(
         getSingleGameComments({ gameId: param?.id, userId: auth?.user?._id })
      );
   }, []);

   return (
      <styled.div className="py-3 mt-2">
         {!!gameCommentsLoading ? <SpennerComponent /> : null}
         {!!gameCommentsError ? (
            <p className="text-sm error_cl">{gameCommentsError}</p>
         ) : null}
         {!!gameCommentsInfo &&
         gameCommentsInfo?.comments[0] &&
         gameCommentsInfo?.comments.length &&
         !!gameCommentsInfo?.comments[0]?.comments ? (
            <Fragment>
               {gameCommentsInfo?.comments[0]?.comments.map((el) => (
                  <div className="comment mb-3" key={el._id}>
                     <div className="user-banner">
                        <div className="user">
                           <div className="avatar">
                              <img src={el?.avatar} />
                           </div>
                           <h5 className="text-gray-400">{el?.userName}</h5>
                        </div>
                        <button className="btn dropdown">
                           <i className="ri-more-line"></i>
                        </button>
                     </div>
                     <div className="content">
                        <p className="text-gray-500 text-sm md:text-lg">
                           {el?.comment}
                        </p>
                     </div>
                     <div className="footer">
                        <button className="btn">
                           <i className="ri-emotion-line"></i>
                        </button>
                        <div className="flex items-center space-x-3">
                           <div
                              className="btn_options"
                              onClick={() => likeHandler(el?._id)}
                           >
                              <AiTwotoneLike
                                 className={
                                    !!el.likeComment && el?.likeComment.length
                                       ? 'text-red-400'
                                       : 'text-gray-500'
                                 }
                              />
                           </div>
                        </div>
                        {!!el?.totalLikes ? (
                           <div className="box_num rounded text-gray-400 text-sm bg-gray-800">
                              {el?.totalLikes}
                           </div>
                        ) : null}
                        <div className="divider bg-gray-500"></div>
                        <span className="is-mute">
                           {(function () {
                              const days = Math.abs(
                                 Math.ceil(
                                    new Date(el.createdAt) - new Date()
                                 ) /
                                    (1000 * 60 * 60 * 24)
                              ).toFixed();

                              return days === '0'
                                 ? 'Today'
                                 : `${days} days ago`;
                           })()}
                        </span>
                     </div>
                  </div>
               ))}
               {/* <div class="load">
            <span>
               <i class="ri-refresh-line"></i>Loading
            </span>
         </div> */}
            </Fragment>
         ) : null}
      </styled.div>
   );
}

export default UserCommentComponent;

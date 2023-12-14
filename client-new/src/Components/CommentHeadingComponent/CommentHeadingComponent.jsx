import React from 'react';
import * as styled from './CommentHeadingComponent.style';
import { gameCommentsInfoSelector } from './CommentHeading.Selector';
import { useSelector } from 'react-redux';

function CommentHeadingComponent() {
   const gameCommentsInfo = useSelector(gameCommentsInfoSelector);

   return (
      <styled.div>
         <div className="block-header">
            <div className="title">
               <h2 className="text-gray-100">Comments</h2>
               <div className="tag">
                  {gameCommentsInfo?.comments.length
                     ? gameCommentsInfo?.comments[0]._id?.totalComments
                     : 0}
               </div>
            </div>
         </div>
      </styled.div>
   );
}

export default CommentHeadingComponent;

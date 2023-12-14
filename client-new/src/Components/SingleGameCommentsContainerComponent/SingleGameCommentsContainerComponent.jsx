import React from 'react';
import * as styled from './SingleGameCommentsContainerComponent.style';
import CommentHeadingComponent from '../CommentHeadingComponent/CommentHeadingComponent';
import SendCommentComponent from '../SendCommentComponent/SendCommentComponent';
import UserCommentComponent from '../UserCommentComponent/UserCommentComponent';

function SingleGameCommentsContainerComponent() {
   return (
      <styled.div className="mt-4 shadow">
         <div className="block shadow p-4">
            <CommentHeadingComponent />
            <SendCommentComponent />
            <UserCommentComponent />
         </div>
      </styled.div>
   );
}

export default SingleGameCommentsContainerComponent;

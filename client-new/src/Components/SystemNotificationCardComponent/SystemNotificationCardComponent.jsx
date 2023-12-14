import React from 'react';
import * as styled from './SystemNotificationCard.Style';
import * as DOMPurify from 'dompurify';
import dayjs from 'dayjs';

function SystemNotificationCardComponent({ data }) {
   return (
      <styled.div className="bg-zinc-800 mt-3">
         <div className="head_div flex items-center justify-between">
            <h1 className="text-gray-200">{data?.heading}</h1>
            <p className="text-sm text-gray-400">
               {dayjs(data?.createdAt).format('DD MMM hh:mm A')}
            </p>
         </div>
         <div
            className="content_div"
            dangerouslySetInnerHTML={{
               __html: DOMPurify.sanitize(data?.description),
            }}
         ></div>
      </styled.div>
   );
}

export default SystemNotificationCardComponent;

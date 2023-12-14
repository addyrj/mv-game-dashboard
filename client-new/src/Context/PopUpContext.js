import { useState } from 'react';
import { createContainer } from 'react-tracked';

// store store.
const INITAL_STATE = {
   showEditPopUp: false,
   showEditAvatar: false,
   showOtherUserProfilePopUp: {},
   showFriendsRequests: false,
   showInboxFriendCm: false,
   showInboxMessageCm: false,
   showPrivateChat: false,
   showSmChats: false,
};

const useMyState = () => useState(INITAL_STATE);

// create a provider to the context.
// share the hook with context components.
export const { Provider: PopUpContext, useTracked: useSharedState } =
   createContainer(useMyState);

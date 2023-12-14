import { createSlice } from '@reduxjs/toolkit';
import { getChatGroups, getGroupChats } from './groupActions';

const INITAL_STATE = {
   groups: null,
   fetchGroupsLoading: false,
   fetchGroupsError: null,
   groupChats: null,
   groupChatsLoading: false,
   groupChatsFetchError: null,
};

const groupSlice = createSlice({
   name: 'group',
   initialState: INITAL_STATE,
   reducers: {
      updateSingleUserGroupInfo: (state, action) => {
         const groupChat = state.groupChats?.chats?.[0];

         if (
            groupChat &&
            groupChat?.groupMessages &&
            groupChat?.groupMessages?.length
         ) {
            state.groupChats = {
               ...state.groupChats,
               chats: [
                  {
                     ...groupChat,
                     groupMessages: groupChat?.groupMessages.map((el) =>
                        el?.userId === action?.payload?.userId
                           ? {
                                ...el,
                                ...action?.payload,
                             }
                           : el
                     ),
                  },
               ],
            };
         }
      },
      updateUserPrivacyHandler: (state, action) => {
         const groupChat = state.groupChats?.chats?.[0];

         if (groupChat?.groupMessages && groupChat?.groupMessages.length) {
            state.groupChats = {
               ...state.groupChats,
               chats: [
                  {
                     ...groupChat,
                     groupMessages: groupChat?.groupMessages.map((el) =>
                        el?.userId === action?.payload?.userId
                           ? {
                                ...el,
                                [action?.payload?.field]:
                                   action?.payload?.value,
                             }
                           : el
                     ),
                  },
               ],
            };
         }
      },
      newGroupMessage: (state, action) => {
         const groupChat = state.groupChats?.chats?.[0];

         state.groupChats = {
            ...state.groupChats,
            chats:
               state.groupChats?.chats && state.groupChats?.chats?.length
                  ? [
                       {
                          ...groupChat,
                          groupMessages: [
                             ...groupChat?.groupMessages,
                             action.payload,
                          ],
                       },
                    ]
                  : [
                       {
                          groupMessages: [action.payload],
                       },
                    ],
         };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getChatGroups.pending, (state) => {
            state.groups = null;
            state.fetchGroupsLoading = true;
            state.fetchGroupsError = null;
         })
         .addCase(getChatGroups.rejected, (state, action) => {
            state.groups = null;
            state.fetchGroupsLoading = false;
            state.fetchGroupsError = action.error.message;
         })
         .addCase(getChatGroups.fulfilled, (state, action) => {
            state.groups = action.payload.data;
            state.fetchGroupsLoading = false;
            state.fetchGroupsError = null;
         });

      builder
         .addCase(getGroupChats.pending, (state) => {
            // state.groupChats = null;
            state.groupChatsLoading = true;
            state.groupChatsFetchError = null;
         })
         .addCase(getGroupChats.rejected, (state, action) => {
            state.groupChats = null;
            state.groupChatsLoading = false;
            state.groupChatsFetchError = action.error.message;
         })
         .addCase(getGroupChats.fulfilled, (state, action) => {
            const chats = action.payload?.data?.chats?.[0];
            const page = Number(chats?._id?.page);

            if (!page) {
               state.groupChats = action.payload?.data;
            } else {
               const messages = chats?.groupMessages;
               const groupChat = state.groupChats?.chats?.[0];

               state.groupChats = {
                  ...state.groupChats,
                  chats: [
                     {
                        ...groupChat,
                        groupMessages: [
                           ...messages,
                           ...groupChat?.groupMessages,
                        ],
                     },
                  ],
               };
            }

            state.groupChatsLoading = false;
            state.groupChatsFetchError = null;
         });
   },
});

export const {
   updateSingleUserGroupInfo,
   newGroupMessage,
   updateUserPrivacyHandler,
} = groupSlice.actions;

export default groupSlice.reducer;

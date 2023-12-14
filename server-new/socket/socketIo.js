const { default: mongoose } = require('mongoose');
const authModel = require('../model/schema/authSchema');
const groupModel = require('../model/schema/groupSchema');
const messageModel = require('../model/schema/messageSchema');
const systemNotificationModel = require('../model/schema/systemNotificationSchema');
const userSocialNetworkSchema = require('../model/schema/userSocialNetworkSchema');

/** ************* keep track which users is online ************* */
let users = [];
/** ************* keep track which users is online ************* */

let socketEvent;

const socketIoConnection = function (io) {
   io.on('connection', (socket) => {
      // socket user connection
      console.log(`socket user connected ${socket.id}`);

      // store online user and login user id in array.
      socket.on('_online_user', (args) => {
         const { userId, userCrId } = args;

         // find the selected socket user.
         const findSockeUser = users.find((el) => el.userId === userId);

         if (!findSockeUser) {
            if (userId) {
               users.push({
                  userId: userId,
                  userCrId: userCrId,
                  socketId: socket.id,
               });
            }
         }

         socket.emit('__live_users', {
            socketUsers: users.length,
         });

         io.in('admin_dashboard_room').emit('__live_users', {
            socketUsers: users.length,
         });

         console.log(users);
      });

      // join a room
      socket.on('_join_group_room', (args) => {
         const { groupId } = args;
         socket.join(groupId);
         console.log(`user ${socket.id} join in ${groupId} room`);
      });

      // leave room
      socket.on('_leave_group', (args) => {
         socket.leave(args.groupId);
         console.log(`socket user ${socket.id} leave room ${args.groupId}`);
      });

      // send group messages
      socket.on('_send_group_message', async (args) => {
         /**
          * get all group message information.
          * send message only the selected group.
          * store the user message in the database.
          * also check user has amount the chat with anothers users.
          * genrate the unique id for every single messages
          */

         const { gifphy, onlyEmogi } = args;

         const _id = mongoose.Types.ObjectId();
         const now = new Date();
         const { groupId, userId } = args;

         const MessageObject = {
            _id,
            userId,
            message: args.message,
            onlyEmogi,
         };

         if (!!args?.provider) {
            MessageObject.provider = args?.provider;
         }

         if (!!gifphy && !!gifphy?.url && !!gifphy?.gifId) {
            MessageObject.giphy = gifphy;
         }

         // find group and insert messages
         const storeMessages = await groupModel.updateOne(
            { _id: groupId },
            {
               $push: {
                  groupMessages: MessageObject,
               },
            }
         );

         if (!!storeMessages.modifiedCount) {
            io.in(groupId).emit('_group_message_received', {
               data: {
                  _id,
                  createdAt: now,
                  ...args,
               },
            });
         }
      });

      /**
       * send friend reuquest
       * send back the notification to selected user.
       */
      socket.on('_friend_request', async (args) => {
         /**
          * get the friend request userid and the reuquested user id.
          * @checkUserAlreadyExistsInRequest first check user is already send the request or not.
          * if the user is not send request already then user can send new friend
          * request.
          */
         const { user: userId, friendRequestUser } = args;

         const checkUserAlreadyExistsInRequest =
            await userSocialNetworkSchema.findOne(
               {
                  userId: friendRequestUser,
                  friendRequests: { $elemMatch: { userId: userId } },
               },
               { 'friendRequests.$': 1 }
            );

         // create user unique _id;
         const uniqueId = mongoose.Types.ObjectId();

         // if the result if null then use is able to send request.
         if (!checkUserAlreadyExistsInRequest) {
            /**
             * find the requested user and then store the user id into the database.
             * @param userId sending request user id.
             * @param friendRequestUser request receviced user.
             */
            const findAndStoreRequest = await userSocialNetworkSchema.updateOne(
               { userId: friendRequestUser },
               { $push: { friendRequests: { userId, _id: uniqueId } } }
            );

            // also store the requested user id inside the database.
            await userSocialNetworkSchema.updateOne(
               { userId },
               {
                  $push: {
                     addFriendRequests: {
                        userId: friendRequestUser,
                     },
                  },
               }
            );

            // if all data is stored then send back the notification selected user.
            // and requested user.
            if (!!findAndStoreRequest?.modifiedCount) {
               // find the selected socket user.
               const findSockeUser = users.find(
                  (el) => el.userId === friendRequestUser
               );

               if (findSockeUser) {
                  // send back the notification to the selected socket user.
                  socket
                     .to(findSockeUser.socketId)
                     .emit('__friend_request_respose', {
                        ...args,
                        _id: uniqueId,
                        status: 'pending',
                        msg: `${args.name} send new friend request`,
                     });
               }

               /**
                * send back the response to the user.
                * if the user is online then send back the notification to that selected
                * use. elase do noting. some case user is not online.
                * when the user comes back the application user can see the notification.
                */
               socket.emit('__friend_request_send_respose', {
                  msg: 'Request send',
                  friendRequestUser,
                  userId,
                  success: true,
                  status: 'pending',
               });
            }
         } else {
            socket.emit('__friend_request_send_respose', {
               msg: 'Already request send',
               success: false,
            });
         }
      });

      /**
       * friend request respose.
       */
      socket.on('__friend_request_user_respose', async (args) => {
         /**
          * if the user accecpet the request then add the accecpeted user into the
          * friend.
          * if the user rejected the request then remove the friend request from the
          * database.
          */

         const { userId, fieldId, type, selectedUser } = args;

         // find the user is exists or not in database.
         const findUser = await authModel.findOne({ _id: userId });

         // find the selected socket user.
         const findSockeUser = users.find((el) => el.userId === selectedUser);

         if (type === 'Accepted') {
            // add user into the friend.
            const addUserInFriend = await userSocialNetworkSchema.updateOne(
               { userId },
               { $push: { friends: { userId: selectedUser } } }
            );

            // send back the accepted respose
            if (addUserInFriend.modifiedCount) {
               // store friend request inside the selected user collection.
               // remove requested user from add friend request array.
               await userSocialNetworkSchema.updateOne(
                  { userId: selectedUser },
                  {
                     $pull: { addFriendRequests: { userId: userId } },
                     $push: { friends: { userId: userId } },
                  }
               );

               // update the status field.
               await userSocialNetworkSchema.updateOne(
                  {
                     userId,
                     friendRequests: { $elemMatch: { userId: selectedUser } },
                  },
                  { 'friendRequests.$.status': 'accepted' }
               );

               // send back the remove respose
               socket
                  .to(findSockeUser?.socketId)
                  .emit('__friend_request_accepted_respose', {
                     user: userId,
                     selectedUser,
                     msg: `${findUser.name} is accepted your friend request`,
                  });

               // send the resposne back with main user.
               socket.emit('__friend_request_accepted', {
                  acceptedUserId: fieldId,
                  status: 'accepted',
               });
            }
         }

         if (type === 'Rejected') {
            // remove friend request
            const removeRequest = await userSocialNetworkSchema.updateOne(
               { userId },
               { $pull: { friendRequests: { _id: fieldId } } }
            );

            if (!!removeRequest.modifiedCount) {
               await authModel.updateOne(
                  { _id: selectedUser },
                  { $pull: { addFriendRequests: { userId: userId } } }
               );

               // send back the remove respose
               socket
                  .to(findSockeUser?.socketId)
                  .emit('__friend_request_rejectd_respose', {
                     user: userId,
                     msg: `${findUser.name} is rejected your friend request`,
                  });

               // send the resposne back with main user.
               socket.emit('__friend_request_reject', {
                  rejectedUserId: fieldId,
               });
            }
         }

         if (type === 'Blocked') {
            /**
             * if the user is blocked then first remove the user request from
             * request array. store the user id inside the user collection block array
             * also store the requested user id inside the bloack user collection.
             */

            // remove the requested user id inside the request array.
            const addToBlockUser = await userSocialNetworkSchema.updateOne(
               { userId },
               {
                  $push: { blockedUsers: { userId: selectedUser } },
                  $pull: { friendRequests: { _id: fieldId } },
               }
            );

            if (!!addToBlockUser.modifiedCount) {
               await userSocialNetworkSchema.updateOne(
                  { userId: selectedUser },
                  { $pull: { addFriendRequests: { userId: userId } } }
               );

               // send back the remove respose
               socket
                  .to(findSockeUser?.socketId)
                  .emit('__friend_request_blocked_respose', {
                     user: userId,
                     selectedUser,
                     msg: `${findUser.name} is blocked your friend request`,
                  });

               // send the resposne back with main user.
               socket.emit('__friend_request_blocked', {
                  blockedUserId: fieldId,
                  status: 'blocked',
               });
            }
         }
      });

      const sendSocketRespose = function (currentChatUserId, args, _id) {
         // find the selected socket user.
         const findSockeUser = users.find(
            (el) => el.userId === currentChatUserId
         );

         socket.to(findSockeUser?.socketId).emit('_receive_private_message', {
            ...args,
            _id,
         });

         socket.emit('_receive_sender_private_message', {
            ...args,
            _id,
         });
      };

      socket.on('_send_private_message', async (args) => {
         const { currentChatUserId, sender, message, onlyEmogi, giphy } = args;

         /**
          * grab all the data from the frountend.
          * check the user id and the currente chat user id collection is existes in
          * the database. if the document is not exits then create new document.
          * else save all the private message inside the selected user id and current
          * user id document.
          */

         // find the document first.
         const document = await messageModel.findOne({
            users: { $all: [sender, currentChatUserId] },
         });

         if (!!document) {
            const _id = mongoose.Types.ObjectId();
            // if the document is already exists then store all the chat inside the selected document.
            const saveMsgInExistsDoc = await messageModel.updateOne(
               {
                  users: { $all: [sender, currentChatUserId] },
               },
               {
                  $push: {
                     messages: {
                        message: message,
                        sender: sender,
                        giphy: giphy || null,
                        onlyEmogi,
                        _id,
                     },
                  },
               }
            );

            if (saveMsgInExistsDoc) {
               sendSocketRespose(currentChatUserId, args, _id);
            }
         } else {
            const _id = mongoose.Types.ObjectId();
            // create new document with private message array.
            const insertNewDoc = await messageModel({
               users: [sender, currentChatUserId],
               messages: [
                  {
                     message: message,
                     sender: sender,
                     giphy: giphy || null,
                     onlyEmogi,
                     _id,
                  },
               ],
            }).save();

            // send back the emit messages.
            if (insertNewDoc) {
               sendSocketRespose(currentChatUserId, args, _id);
            }
         }
      });

      socket.on('_system_notification', async (arg) => {
         const { id, type } = arg;

         if (!id || !type) {
            socket.emit('_system_notification_response', {
               success: false,
               message: 'Invalid types',
            });
         }

         if (type === 'pushNotification') {
            /**
             * update the database publish file. one database filed is updated then get all the
             * details about notification and then send the all connected client users.
             */
            const findNotificationInfo = await systemNotificationModel.findOne(
               { _id: id },
               { updatedAt: 0, __v: 0, publish: 0 }
            );

            if (!findNotificationInfo) {
               return socket.emit('_system_notification_response', {
                  success: false,
                  message: 'notification is not found',
               });
            }

            // update notification database field
            const isUpdated = await systemNotificationModel.updateOne(
               { _id: id },
               { $set: { publish: true } }
            );

            if (isUpdated.modifiedCount) {
               socket.broadcast.emit('_system_notification_response', {
                  type: type,
                  ...findNotificationInfo?._doc,
               });

               socket.emit('_system_notification_response', {
                  message: 'Notification published',
                  success: true,
               });
            }
         }

         if (type === 'pullNotification') {
            /**
             * update the publish key from the databse
             * also remove the notification from the client side.
             */
            const isUpdated = await systemNotificationModel.updateOne(
               { _id: id },
               { $set: { publish: false } }
            );

            if (isUpdated.modifiedCount) {
               socket.broadcast.emit('_system_notification_response', {
                  type: type,
                  notificationId: id,
               });
               socket.emit('_system_notification_response', {
                  message: 'Notification Unpublished',
                  success: true,
               });
            }
         }
      });

      // track the user update privacy setting.
      socket.on('__user_privacy_setting_update', async (args) => {
         // send user update info the all global users.
         socket.broadcast.emit('__user_privacy_update_respose', args);
         socket.emit('__user_privacy_update_respose', args);
      });

      socket.on('disconnect', (resion) => {
         const onlineUsers = users.filter((el) => el.socketId !== socket.id);
         users = onlineUsers;

         io.in('admin_dashboard_room').emit('__live_users', {
            socketUsers: users.length,
         });

         console.log(
            `socket user is disconnect ${resion} socket id ${socket.id}`
         );
         console.log(users);
      });
   });
};

const getConnectedUsers = function () {
   return users;
};

const getAllSocketEvents = function () {
   return socketEvent;
};

module.exports = {
   users,
   socketIoConnection,
   getAllSocketEvents,
   getConnectedUsers,
};

import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Features/Auth/authSlice';
import clientSlice from '../Features/Client/clientSlice';
import groupSlice from '../Features/Group/groupSlice';
import gameSlice from '../Features/Game/gameSlice';
import paymentSlice from '../Features/Payment/paymentSlice';
import notificationSlice from '../Features/Notifications/notificationSlice';
import LuckyDrawSlice from '../Features/LuckyDraw/LuckyDrawSlice';

const store = configureStore({
   reducer: {
      auth: authSlice,
      client: clientSlice,
      group: groupSlice,
      games: gameSlice,
      payment: paymentSlice,
      notification: notificationSlice,
      luckyDraw: LuckyDrawSlice,
   },
   middleware: (getDefaultMiddlewares) =>
      getDefaultMiddlewares({
         serializableCheck: {
            ignoreActions: ['auth/signin/fulfilled'],
         },
      }),
});

export default store;

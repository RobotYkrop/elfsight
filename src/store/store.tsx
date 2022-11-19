import { configureStore } from '@reduxjs/toolkit';

import rickAndMorti from './newSlice';

const store = configureStore({
  reducer: {
    rickAndMorti,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;

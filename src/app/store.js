import {configureStore} from '@reduxjs/toolkit';

import coordsReducer from '../screens/coordsSlice';
import statusReducer from '../screens/statusSlice';
import {apiSlice} from '../components/apiSlice';

export default configureStore({
  reducer: {
    coords: coordsReducer,
    status: statusReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

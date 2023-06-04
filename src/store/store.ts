import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { fitsApi } from '../slice/FitsApi.slice';
import tokenReducer from '../slice/token.slice';
import fitsReducer from '../slice/FitsSlice.store';

export const store = configureStore({
  reducer: {
    //token slicee
    token: tokenReducer,
    fitsStore: fitsReducer,
    // Add the generated reducer as a specific top-level slice
    [fitsApi.reducerPath]: fitsApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fitsApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

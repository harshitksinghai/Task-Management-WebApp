import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import taskSlice from '../slices/taskSlice';
import { apiSlice } from '../slices/apiSlice';
import addTaskStatesSlice from '../slices/addTaskStatesSlice';

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
        task: taskSlice,
        addTaskStates: addTaskStatesSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});
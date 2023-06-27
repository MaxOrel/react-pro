import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';

import { authReducer } from './slices/authSlice';

const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: !!process.env.NODE_ENV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { phonesApi } from './api/phoneApi';

const rootReducer = combineReducers({
	[phonesApi.reducerPath]: phonesApi.reducer, // раз
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([phonesApi.middleware]), // два
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { RootState } from '../index';

export const customBaseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken;

		// Если имеем в наличии Access token, то добавляем его в заголовки
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});

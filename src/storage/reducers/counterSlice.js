import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',
	initialState: 0,
	reducers: {
		incrementByValue: (state, action) => state + action.payload,
		derementByValue: (state, action) => state - action.payload,
	},
});

export const { incrementByValue, derementByValue } = counterSlice.actions;
export default counterSlice.reducer;

import { INCREMENT, DECREASE } from '../types/counterTypes';
const initialState = {
	value: 0,
};

function counterReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT:
			return { ...state, value: state.value + 1 };
		case DECREASE:
			return { ...state, value: state.value - 1 };
		default:
			return state;
	}
}

export default counterReducer;

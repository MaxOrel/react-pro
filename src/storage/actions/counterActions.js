import { INCREMENT, DECREASE } from '../types/counterTypes';

export function incrementAction() {
	return {
		type: INCREMENT,
	};
}
export function decreaseAction() {
	return {
		type: DECREASE,
	};
}

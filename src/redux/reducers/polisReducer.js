import { POLIS_ADD, POLIS_CREATE } from '../constants';
const initialState = [];
const polisReducer = (polis = initialState, action) => {
	switch (action.type) {
		case POLIS_CREATE:
			return action.payload
			break;
		case POLIS_ADD:
			return [
				...polis, action.payload
			];
			break;
		default:
			return polis
	}
}
export default polisReducer;
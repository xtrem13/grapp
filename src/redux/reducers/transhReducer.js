import { TRANSH_CREATE } from '../constants';
const initialState = [];
const transhReducer = (transhes = initialState, action) => {
	switch (action.type) {
        case TRANSH_CREATE:
            return [
                 ...action.payload
            ];
        default:
            return transhes
    }
}
export default transhReducer;
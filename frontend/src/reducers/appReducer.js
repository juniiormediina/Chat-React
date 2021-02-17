import { SAVEUSER, SAVEGIF } from '../types/actionTypes';
const INITIAL_STATE = {
	createdAt: '',
	exp: 0,
	firstName: '',
	iat: 0,
	id: 0,
	lastName: '',
	nickName: '',
	updatedAt: '',
	url_gif: '',
};
export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SAVEUSER:
			return {
				...state,
				...action.payload,
			};
		case SAVEGIF:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

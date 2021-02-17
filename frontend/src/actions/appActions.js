import { SAVEUSER, SAVEGIF } from '../types/actionTypes';

export const saveUser = (user) => async (dispatch) => {
	dispatch({ type: SAVEUSER, payload: user });
};
export const saveGif = (url) => async (dispatch) => {
	dispatch({ type: SAVEGIF, payload: { url_gif: url } });
};

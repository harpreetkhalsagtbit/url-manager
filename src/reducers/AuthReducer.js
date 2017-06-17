import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	isLoggedIn: false,
	isLoggedInStatusCheckedOnLoad:false
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case types.AUTH_FAILED:
			return {
				isLoggedIn: action.isLoggedIn
			}

		default:
			return state;
	}
}
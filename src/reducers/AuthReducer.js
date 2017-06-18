import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	isLoggedIn: false,
	isLoggedInStatusCheckedOnLoad:false
}

export default function authReducer(state = initialState, action) {
	// console.log(action.type)
	switch (action.type) {
		case types.AUTH_FAILED:
			return {
				isLoggedIn: action.isLoggedIn,
				response: action.response
			}

		case types.AUTH_SUCCESS:
			// console.log("action", action)
			return {
				isLoggedIn: action.isLoggedIn
			}

		default:
			return state;
	}
}
import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	isLoggedIn: false,
	signUpStatus: false
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
			return {
				isLoggedIn: action.isLoggedIn
			}

		case types.LOGOUT_SUCCESS:
			return {
				isLoggedIn: initialState.isLoggedIn
			}

		case types.SIGN_UP_SUCCESS:
			return {
				signUpStatus: action.signUpStatus
			}


		default:
			return state;
	}
}
import * as types from './actionTypes';

export function getAuthStatus() {
	var token = localStorage.getItem("token")
	var isLoggedIn = false;
	if(token) {
		isLoggedIn = true;
	}

	return {type:types.AUTH_FAILED, "isLoggedIn":isLoggedIn};
}

export function allowLogInAccess(status) {
	var isLoggedIn = status;
	return {type:types.AUTH_SUCCESS, "isLoggedIn":isLoggedIn};
}

// export function checkAuthStatus() {
	// return dispatch => {
	// 	return AuthorApi.getAllAuthors().then(authors => {
	// 		dispatch(loadAuthorsSuccess(authors));
	// 	}).catch(error => {
	// 		throw(error);
	// 	});
	// };
// }

export const checkAuthStatus = () => {
	return dispatch => {
		dispatch(getAuthStatus())
	}
}

export const forceLogIn = () => {
	console.log("here")
	return dispatch => {
		dispatch(allowLogInAccess(true))
	}
}

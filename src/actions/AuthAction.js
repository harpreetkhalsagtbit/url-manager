import * as types from './actionTypes';
import $ from 'jquery';

export function getAuthStatus() {
	var token = localStorage.getItem("token")
	var isLoggedIn = false;
	if (token) {
		isLoggedIn = true;
		return {
			type: types.AUTH_SUCCESS,
			"isLoggedIn": isLoggedIn
		};
	} else {
		return {
			type: types.AUTH_FAILED,
			"isLoggedIn": isLoggedIn
		};
	}

}

export function authFailed(response) {
	return {
		type: types.AUTH_FAILED,
		"isLoggedIn": false,
		"response": response
	};
}

export function allowLogInAccess(status) {
	var isLoggedIn = status;
	return {
		type: types.AUTH_SUCCESS,
		"isLoggedIn": isLoggedIn
	};
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
		var token = localStorage.getItem("token")
		var promise = new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				"async": true,
				"crossDomain": true,
				"url": "http://localhost:8080/api/verify-token",
				"method": "POST",
				"headers": {
					"content-type": "application/x-www-form-urlencoded",
					// "cache-control": "no-cache",
				},
				"data": {
					"token": token,
				},
				success: function (data, status, response) {
					console.log("token success", data, response)
					resolve({
						statusCode:response.status,
						message:response.statusText,
						token:data.token
					})
				},
				error: function (request, status, error) {
					console.log("error", request, error)
			        reject({
			        	errorCode:request.status,
			        	error:error
			        })
			    }
			})
		})

		promise.then(function(response) {
			if(response.statusCode === 200) {
				return dispatch(allowLogInAccess(true))
			}
		})
		.catch(function(response) {
			if(response.errorCode === 403) {
				return dispatch(authFailed(response))
			}
		})
	}
}

export const verifyLogIn = (logInDetails) => {
	return dispatch => {

		var promise = new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				"async": true,
				"crossDomain": true,
				"url": "http://localhost:8080/api/login",
				"method": "POST",
				"headers": {
					"content-type": "application/x-www-form-urlencoded",
					// "cache-control": "no-cache",
				},
				"data": {
					"email": logInDetails.username,
					"password": logInDetails.password
				},
				success: function (data, status, response) {
					resolve({
						statusCode:response.status,
						message:response.statusText,
						token:data.token
					})
				},
				error: function (request, status, error) {
			        reject({
			        	errorCode:request.status,
			        	error:error
			        })
			    }
			})
		})

		return promise.then(function(response) {
			if(response.statusCode === 200) {
				localStorage.setItem("token", response.token)
				return dispatch(allowLogInAccess(true))
			}
		})
		.catch(function(response) {
			if(response.errorCode === 400) {
				return dispatch(authFailed(response))
			}
		})
	}
}
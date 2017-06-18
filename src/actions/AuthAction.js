import * as types from './actionTypes';
import $ from 'jquery';

export function getAuthStatus() {
	var token = localStorage.getItem("token")
	var isLoggedIn = false;
	if (token) {
		isLoggedIn = true;
	}

	return {
		type: types.AUTH_FAILED,
		"isLoggedIn": isLoggedIn
	};
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
		return setTimeout(() => {
			console.log("here status after 3000")
			dispatch(getAuthStatus())
		}, 3000)
	}
}

export const verifyLogIn = () => {
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
					"email": "harpreet",
					"password": "password"
				},
				success: function (request, status, response) {
					console.log(arguments)
					resolve({
						statusCode:response.status,
						message:response.statusText
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
			console.log(arguments)
			if(response.statusCode === 200) {
				return dispatch(allowLogInAccess(true))
			}
		})
		.catch(function(response) {
			console.log("err catch promise", response)
			if(response.errorCode === 400) {
				return dispatch(authFailed(response))
			}
		})
	}
}